---
title: "SwiftyCorasick의 성능 개선 (Swift Concurrency)"
date: "2025-01-30"
description: "GCD 기반 비속어 필터링의 성능 한계를 극복하기 위해 Swift Concurrency를 적용해 성능을 극대화한 사례를 정리했습니다."
---

# Swift Concurrency를 활용한 비속어 필터링 성능 개선

### 개요 및 기술 선정 이유

기존 GCD 기반의 비속어 필터링은 실행 시간이 길어 실사용에 부담이 컸다. 특히 14,000자 이상의 긴 텍스트를 처리할 때 7초 이상 소요되면서 사용자 경험에 문제가 발생할 것으로 판단했다.

GCD는 스레드 간 컨텍스트 전환 비용이 크고, DispatchQueue를 통한 비동기 처리가 많아질수록 오히려 성능이 저하될 가능성이 있었다. 반면, Swift Concurrency는 경량 스레드 기반의 async/await을 활용해 컨텍스트 전환 비용을 최소화하고, 락 경합 없이 안정적인 동시성 처리가 가능하다. 또한, Apple이 Swift Concurrency를 공식적인 비동기 모델로 채택한 만큼, 유지보수성과 확장성 측면에서도 유리했다.

이러한 이유로 Swift Concurrency를 적용했고, 결과적으로 처리 시간이 30배 이상 단축되며 실사용이 가능한 성능을 확보할 수 있었다.

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

Swift Concurrency의 async/await를 적용하여 불필요한 GCD 호출을 제거하고 최적화했다. 

#### 개선 후 성능 테스트 결과
- **14000자 테스트**: 0.217초
- **7000자 테스트**: 0.089초

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
- 기존 GCD 방식에서 Swift Concurrency 방식으로 개선 후 성능이 **약 30배 이상 향상**됨
- 불필요한 DispatchQueue 호출 제거로 코드 가독성과 유지보수성이 향상됨
- async/await을 적용하여 더 자연스럽고 직관적인 비동기 처리가 가능해짐

