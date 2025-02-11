---
title: "SwiftyCorasick: GCD에서 Swift Concurrency로 성능을 30배 개선한 사례"
date: "2025-01-30"
description: "GCD 기반 비속어 필터링의 성능 한계를 극복하기 위해 Swift Concurrency를 적용해 성능을 극대화한 사례를 정리했습니다."
tag: ["Swift","Algorithm"]
---
### 개요 및 기술 선정 이유

기존 GCD 기반 비속어 필터링은 긴 텍스트 처리에서 심각한 성능 문제가 있었습니다.  
특히, 14,000자 이상의 텍스트를 처리하는 데 약 7초가 소요되며 사용자 경험에 부정적인 영향을 미칠 가능성이 컸습니다.

**문제 원인:**  
1. **GCD의 컨텍스트 전환 비용**: DispatchQueue의 스레드 전환이 잦아질수록 성능 저하가 발생.  
2. **효율적인 동시성 처리 부족**: GCD는 경량 스레드 기반이 아니며, 락 경합이 빈번하게 발생.

**해결책:**  
Swift Concurrency는 경량 스레드를 기반으로 한 **async/await** 모델을 제공하여 GCD의 한계를 극복할 수 있습니다.  
이를 통해 컨텍스트 전환 비용을 줄이고, 복잡한 락 경합 없이 동시성을 효과적으로 처리할 수 있습니다.

Swift Concurrency를 적용한 결과, 처리 시간이 **7초 → 0.2초**로 단축되었으며, 성능은 약 **30배 이상** 개선되었습니다.

### 기존 GCD 기반 비속어 필터링

기존 구현에서는 GCD(Grand Central Dispatch)를 활용하여 비속어 탐지를 비동기적으로 처리했다. 하지만, DispatchQueue를 사용하면서 불필요한 컨텍스트 전환이 발생했고, 성능이 최적화되지 않았다.

#### 기존 성능 테스트 결과
- **14000자 테스트**: 7.541초
- **7000자 테스트**: 2.073초

```swift
public func processTextAsync(_ text: String, completion: @Sendable @escaping (String) -> Void) {
    DispatchQueue.global(qos: .userInitiated).async { [weak self] in
        guard let self = self else { return }

        let detectedWords = self.ahoCorasick.search(in: text)
        var resultText = text

        DispatchQueue.main.async {
            for word in detectedWords {
                if let range = resultText.range(of: word) {
                    self.delegate?.didDetectProfanity(word, range: range)
                    let replacement = String(repeating: "*", count: word.count)
                    resultText.replaceSubrange(range, with: replacement)
                }
            }

            resultText = self.filterUsingRegex(text: resultText)
            completion(resultText)
        }
    }
}
```

### Swift Concurrency 적용 후 개선

Swift Concurrency는 경량 스레드 기반의 **async/await** 모델을 제공하여, GCD의 단점을 보완합니다.  
이를 적용한 결과, 긴 텍스트 처리 성능이 **30배 이상** 개선되었으며, 코드 가독성 또한 크게 향상되었습니다.

#### Swift Concurrency 방식의 장점
1. **경량 스레드 기반으로 컨텍스트 전환 비용 감소**
   - GCD보다 경량화된 동시성 모델로, 스레드 전환 비용을 최소화.
2. **락 경합 제거**  
   - 동시성 문제를 `Task` 단위로 분리해 락을 사용할 필요가 없어짐.
3. **자연스러운 비동기 처리**  
   - 콜백 대신 async/await로 처리 흐름이 간결하고 직관적임.

#### 개선 후 성능 테스트 결과
- **14000자 테스트:** 0.217초
- **7000자 테스트:** 0.089초

```swift
public func processTextAsync(_ text: String) async -> String {
    let detectedWords = await searchForProfanity(in: text)
    var resultText = text

    for word in detectedWords {
        if let range = resultText.range(of: word) {
            delegate?.didDetectProfanity(word, range: range)
            let replacement = String(repeating: "*", count: word.count)
            resultText.replaceSubrange(range, with: replacement)
        }
    }

    return await filterUsingRegex(text: resultText)
}

private func searchForProfanity(in text: String) async -> [String] {
    return await withCheckedContinuation { continuation in
        Task.detached(priority: .userInitiated) {
            let detectedWords = self.ahoCorasick.search(in: text)
            continuation.resume(returning: detectedWords)
        }
    }
}

private func filterUsingRegex(text: String) async -> String {
    return await withCheckedContinuation { continuation in
        Task.detached(priority: .userInitiated) {
            var filteredText = text
            for pattern in self.profanityRegexPatterns {
                do {
                    let regex = try NSRegularExpression(pattern: pattern, options: .caseInsensitive)
                    let matches = regex.matches(in: filteredText, options: [], range: NSRange(location: 0, length: filteredText.utf16.count))
                    
                    for match in matches.reversed() {
                        if let range = Range(match.range, in: filteredText) {
                            let word = String(filteredText[range])
                            let replacement = String(repeating: "*", count: word.count)
                            filteredText.replaceSubrange(range, with: replacement)
                        }
                    }
                } catch {
                    print("정규 표현식 오류: \(error)")
                }
            }
            continuation.resume(returning: filteredText)
        }
    }
}
```

### 결론

- 기존 GCD 방식에서 Swift Concurrency 방식으로 전환한 결과, 처리 속도가 **약 30배 이상 향상**되었습니다.
- 경량 스레드를 활용하여 동시성 처리의 효율을 극대화하고, 락 경합 문제를 제거했습니다.
- async/await으로 코드의 가독성과 유지보수성이 개선되었으며, 디버깅 또한 간편해졌습니다.

Swift Concurrency는 복잡한 비동기 작업에서 단순하고 강력한 동시성 처리를 제공하며, 실시간 성능이 중요한 애플리케이션에 적합한 선택임을 확인했습니다.