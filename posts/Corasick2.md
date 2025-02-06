---
title: "Swift 욕설 필터링: N-gram + Aho-Corasick 구현 실패와 개선 과정 (욕설주의)"
date: "2025-02-26"
description: "Aho-Corasick 단독으로 실패한 이유와 N-gram을 추가하게 된 과정을 정리했습니다."
---
## 목표
Swift에서 **욕설 필터링 시스템**을 구현하면서 겪은 **실패 사례**와 **해결 과정**을 기록합니다.  
**Aho-Corasick 단독으로 실패한 이유**와 **N-gram을 추가하게 된 과정**을 정리했습니다.

---

## Aho-Corasick 단독으로 욕설 필터링 시도 (실패)

### Aho-Corasick이란?
- **빠른 문자열 검색 알고리즘 (`O(n)`)**
- **사전(욕설 리스트)을 Trie(트라이) 자료구조로 변환 후 탐색**
- **즉, 미리 등록된 욕설이 포함된 문자열을 빠르게 찾아낼 수 있음**

### Aho-Corasick 단독 필터링 코드 (실패)
```swift
public func searchForProfanity(in text: String) async -> [String] {
    return await withCheckedContinuation { continuation in
        DispatchQueue.global(qos: .userInitiated).async {
            let detectedWords = self.ahoCorasick.search(in: text)
            continuation.resume(returning: detectedWords)
        }
    }
}
```

### Aho-Corasick 단독 사용의 실패 원인
| 문제점 | 원인 | 결과 |
|------|------|------|
| **띄어쓰기가 있는 욕설 탐지 실패** | `"개 새끼"` → `"개"`는 남고 `"새끼"`만 필터링 | 부분 필터링 발생 |
| **변형된 욕설 탐지 불가** | `"씨@발"`, `"개#새끼"` 같은 변형된 단어 인식 못함 | 탐지 실패 |
| **특수 문자 포함 욕설 처리 어려움** | `"병$신"`, `"좆같네!"` 등 특수문자가 섞인 경우 탐지 어려움 | 탐지 실패 |

### Aho-Corasick 단독 사용이 실패한 이유
1. **욕설의 변형된 형태 탐지 불가**: 사용자가 `"씨@발"`, `"개#새끼"`처럼 특수문자를 섞어 변형하면, Aho-Corasick은 이를 기존 욕설 단어와 다르게 인식하여 탐지하지 못함.
2. **띄어쓰기 포함 욕설 필터링 불가능**: `"개 새끼"`처럼 띄어쓰기가 포함된 경우, `"개"`와 `"새끼"`가 따로 인식되기 때문에, 부분 필터링 문제가 발생함.
3. **욕설 앞뒤에 문자가 추가된 경우 처리 불가능**: `"병신같네"`, `"씨발놈"` 같은 경우, 기본 등록된 `"병신"`, `"씨발"`만 찾을 수 있고 추가된 부분을 인식하지 못함.
4. **정확한 단어 매칭 필요**: `"좆같네!"`처럼 끝에 감탄부호가 포함되면 탐지를 못 하는 경우가 발생함.

🚀 **Aho-Corasick은 기본 욕설은 탐색 가능했지만, 띄어쓰기와 변형된 욕설 처리에 한계를 가짐**  
➡ **즉, "씨@발" 같은 변형 욕설이 감지되지 않음**  

---

## N-gram을 추가로 도입하게 된 이유

Aho-Corasick 단독으로는 변형된 욕설을 탐지할 수 없었기 때문에 **N-gram을 추가**  
**N-gram을 이용하면 욕설이 변형되어도 탐지 가능!**

### N-gram이란?
- **연속된 `n`개의 문자 조합을 생성하여 필터링에 활용**
- **예: `"씨@발"` → 2-gram: `["씨@", "@발"]` → `씨발`과 유사한 형태 탐지 가능**
- **띄어쓰기 포함된 욕설(`"개 새끼"`)도 하나의 단어로 처리 가능**

### N-gram 적용 코드
```swift
private func generateNGrams(text: String, n: ClosedRange<Int>, includeSpaces: Bool = false) -> [String] {
    var nGrams: Set<String> = []
    let words = includeSpaces ? [text] : text.split(separator: " ").map { String($0) } // 띄어쓰기 포함 가능

    for word in words {
        let cleanedWord = word.replacingOccurrences(of: "[^가-힣a-zA-Z0-9\\s]", with: "", options: .regularExpression)

        for size in n {
            guard cleanedWord.count >= size else { continue }

            for i in 0...(cleanedWord.count - size) {
                let start = cleanedWord.index(cleanedWord.startIndex, offsetBy: i)
                let end = cleanedWord.index(start, offsetBy: size)
                let gram = String(cleanedWord[start..<end])
                nGrams.insert(gram)
            }
        }
    }
    return Array(nGrams)
}
```

### N-gram 방식의 실패 원인
1. **너무 많은 조합이 생성됨**: `n=2~4` 범위를 설정했음에도 불필요한 문자 조합이 과도하게 생성됨.
2. **욕설을 정확히 매칭하지 못함**: `"개 새끼"` → `["개", "개 새", "새끼"]`처럼 조합이 생성되면서 욕설을 정확히 감지하지 못하는 문제가 발생.
3. **실시간 성능 저하**: 모든 텍스트에 대해 `n-gram`을 적용하는 과정에서 성능 저하가 발생함.

---

## Swift Natural Language API 도입 계획
N-gram 방식도 변형된 욕설을 탐지하는 데 한계가 있어, **Apple의 Natural Language API**를 활용한 개선 방안을 고려 중입니다.

### ✅ 기대하는 개선점
- **`NLTokenizer`** 를 활용하여 띄어쓰기 포함된 욕설을 정확히 분리 가능.
- **`NLTagger`** 를 활용하여 품사 기반 욕설 필터링 가능.
- **`NLModel`** 을 활용한 머신러닝 기반 욕설 감지 도입 가능.

**Swift의 Natural Language API를 활용하여 욕설 탐지 성능을 향상시키는 것을 목표로 진행 예정**

