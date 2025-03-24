---
title: "iOS 모듈화와 QA 자동화를 위한 Tuist 도입기"
date: "2025-03-24"
description: "복잡해진 Xcode 프로젝트 구조와 비효율적인 QA 환경을 개선하기 위해 Tuist를 도입했습니다. 선언형 프로젝트 구성, 모듈화 전략, 테스트 환경 분리까지의 실전 적용 사례를 정리했습니다"
tag: ["Swift","Tuist"]
---
## 들어가며

처음에는 단일 앱 구조로도 충분했다. 모듈이 많지 않았고, 프로젝트 설정도 손이 많이 가지 않았다.  
하지만 기능이 늘고 뷰의 깊이가 깊어지면서 점점 관리가 어려워졌다. 특히 테스트를 빠르게 반복하고, 특정 화면만 따로 QA할 수 있는 환경이 필요해지면서 기존 방식에 한계를 느꼈다.

Xcode의 수작업 프로젝트 설정은 비효율적이었고, 모듈을 만들 때마다 반복되는 작업도 불편했다. 이 과정에서 `Tuist`를 도입하게 되었고, 선언형 구성과 자동화된 프로젝트 생성이 가져다주는 생산성 향상을 체감할 수 있었다.

이 글은 Tuist를 도입하게 된 계기와 적용 과정, 그리고 느낀 점을 기록한 경험 공유 글이다.


---

## 왜 Tuist를 도입했는가?

### 1. 수작업으로 Xcode 프로젝트 관리의 한계
- 새 모듈 추가할 때마다 `File → New → Target` → 설정 수정 → 종속성 연결 과정을 반복해야 했다.
- 타겟 간 설정이 일관되지 않아 **빌드 에러 발생**이 빈번했다.
- 팀은 아니지만, 개인적으로 **모노레포 구조에서 모듈화를 적극적으로 활용하고 싶었다.**

### 2. 테스트 및 QA 환경에서의 비효율
- 프로젝트가 커지면서 뷰 계층(View hierarchy, depth)이 깊어졌고,
- 특정 기능만 빠르게 테스트하거나 QA가 필요한 경우에도 **전체 앱을 빌드하고 로그인 과정을 거쳐야 하는 구조**가 비효율적이었다.
- 단위 테스트뿐 아니라 **모듈 단독 실행 및 독립적인 QA가 가능한 구조가 필요**했다.

### 3. 스크립트 기반 프로젝트 생성을 원했다
- 수작업 없이 선언적으로 정의하고 싶었다.
- 모듈이 많아질수록 자동화의 필요성이 절실했다.

---

## Tuist가 무엇인가?

- `Tuist`는 **Xcode 프로젝트를 코드 기반으로 생성/관리할 수 있게 도와주는 도구**다.
- `Project.swift`와 같은 Swift DSL을 사용해 프로젝트를 선언적으로 정의할 수 있다.
- `.xcodeproj` 파일을 직접 관리할 필요가 없다. → `tuist generate` 명령어로 생성.

---

## 도입 과정

### 1. 설치 및 초기화

```bash
curl -Ls https://install.tuist.io | bash
tuist init --platform ios
```

- 기본적인 구조는 `Project.swift`, `Targets`, `Sources`, `Tests` 디렉토리로 구성됨.
- 프로젝트를 Git으로 관리할 때 `.xcodeproj`는 포함하지 않음.

### 2. 모듈 구조 정의

- 각 기능별로 **Feature, Core, Shared, DesignSystem** 등의 모듈을 구성.
- 각 모듈마다 `Project.swift`를 정의하고, 종속성도 선언적으로 연결.

```swift
Target(
  name: "FeatureHome",
  platform: .iOS,
  product: .staticFramework,
  dependencies: [
    .project(target: "CoreNetwork", path: "../Core")
  ]
)
```

### 3. Workspace 구성

- `Workspace.swift`를 통해 여러 모듈을 묶고, Xcode workspace로 생성.

```swift
Workspace(
  name: "MyApp",
  projects: ["App", "Features/**", "Core/**"]
)
```

### 4. CI/CD 및 빌드 캐시 통합 준비

- Tuist는 **빌드 캐시, 테스트 병렬화, 플러그인** 등 확장성이 강력하다.
- 향후 `tuist cloud`를 통한 캐싱 최적화도 고려 중이다.

---

## 도입 후 변화

### 장점
- 모듈 추가가 쉬워짐 (`tuist scaffold` 등도 활용 가능)
- 빌드 구성의 일관성 확보
- git conflict에서 Xcode 프로젝트 파일 충돌 없음
- 프로젝트 생성 속도 개선
- QA 시 특정 기능만 선택적으로 실행 가능

### 단점 (혹은 고려사항)
- 진입장벽이 있음: Swift DSL에 대한 학습 필요
- Apple 공식 도구는 아님 → 생태계 의존성 고려 필요
- 일부 서드파티(예: CocoaPods)와 함께 쓸 때 설정 충돌 주의

---

## 마치며

Tuist는 특히 **모노레포 구조, 모듈화, 자동화**를 목표로 하는 개발자에게 매우 유용한 도구다.  
나는 개인 프로젝트이지만 **앱 규모가 커지고, 다수의 공통 모듈과 기능 모듈을 관리하게 되면서 Tuist의 효과를 체감했다.**

향후에는 `Tuist Cloud`를 통해 캐시 기반 빌드 최적화도 시도해볼 계획이다.  
또한, `Plugin`, `Template`, `Scaffold` 기능을 더 적극적으로 활용해 나만의 프로젝트 생성 자동화 도구를 만들고자 한다.

---

## 부록: 참고 리소스
- [Tuist 공식 문서](https://tuist.io/)
- [Tuist GitHub](https://github.com/tuist/tuist)
