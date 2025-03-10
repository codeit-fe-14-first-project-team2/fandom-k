# Fandom-K

좋아하는 아이돌 후원, 투표, 차트 불러오기 기능을 구현하는 아이돌 팬덤 플랫폼 프로젝트입니다.

This is a React project created with Vite.

## Skills

<div style='display: flex; gap: 8px'>
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white" />
<img src="https://img.shields.io/badge/Scss-CC6699?style=for-the-badge&logo=sass&logoColor=white" />
<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
</div>

## Patterns

- Custom Hook Pattern (ex. [useAsync](./src/hooks/useAsync.js), [useViewportSize](./src/hooks/useViewportSize.js))
- Extensible Styles Pattern (ex. [Button](./src/components/button/Button.jsx))

## Goals 💡

### Codeit

- 모바일 웹에 적합한 HTML/CSS 설계 능력
- 재활용 가능한 컴포넌트 설계 능력
- React 상태 관리
- REST API 사용해보는 경험
- 발생할 수 있는 예외 처리 능력

### [주제 선정 가이드](https://codeit.notion.site/_-1a46fd228e8d81b3bda8e073f5b5876e)

- API 탐색과 적용을 통해 원활한 기능 작동을 경험
- 재활용할 수 있는 UI를 구현함으로써 효율성 최대화<br />(후원하기 및 투표하기 버튼, 아이돌 이미지, 인기 투표 차트 등 공통 컴포넌트)
- 일관성 있는 UX를 통해 사용자 리텐션을 강화하여 사용자 경험을 고려한 실무 경험

### 추가 개발 사항 (선택사항)

#### 고도화

- [ ] 예외 처리
- [x] 에러 팝업
- [ ] 스켈레톤 UI

#### 기능

- [ ] 아이돌 생성
- [ ] 후원하기 생성
- [ ] 투표 생성

## Updates 📝

- 250305 프로젝트 생성
- 250306 1차 개발 시작 ([체크리스트](./checklist.md) 참고)
  - 공통 스타일 정의
  - 랜딩 페이지
  - 목록 페이지
  - 마이 페이지
-

## Folder Structure 📁

```
src/

+-- assets/
|   +-- font/
|   +-- icon/ (.svg files for icon)
|   +-- img/

+-- styles/ (definitions of design attributes with className)
|   +-- global.scss
|   +-- _reset.scss
|   +-- _color.scss
|   +-- _layout.scss
|   +-- _typography.scss
|   +-- _button.scss

+-- component/ (reusable UI Components having atoms combined)
|   +-- button/
|   +-- header/
|   +-- idolprofile/
|   +-- ...

+-- modal/
|   +-- ChargeModal.jsx
|   +-- SponsorModal.jsx
|   +-- VoteModal.jsx
|   +-- ErrorModal.jsx
|   +-- modal.scss

+-- pages/
|   +-- list/
|   |   +-- components/
|   |   |   +-- TributeContainer.jsx
|   |   |   +-- tribute.scss
|   |   |   +-- ChartContainer.jsx
|   |   |   +-- chart.scss
|   |   +-- ListPage.jsx
|   |   +-- listpage.scss
|   +-- mypage/
|   |   +-- components/
|   |   |   +-- FavoriteContainer.jsx
|   |   |   +-- IdolListContainer.jsx
|   |   +-- MyPage.jsx
|   |   +-- mypage.scss
|   +-- LandingPage.jsx
|   +-- landingpage.scss
.
.
.
```

## Convention

### 1) Naming Conventions 📝

- JSX file (page, component) name: PascalCase
- folder name, route path: nocase
- variable, function: camelCase
- constant variable: SCREAMING_SNAKE_CASE
- html tag properties (ex. className, id etc.): skewer-case

#### 📚 참고

[**Airbnb JavaScript Style Guide**](https://github.com/airbnb/javascript)

```
1. Avoid single letter names. Be descriptive with your naming.
  1-1. Also, Avoid Mental Mapping.

2. Use camelCase when naming objects, functions, and instances.

3. Use PascalCase only when naming constructors or classes. (also file name)

...
```

#### ❗️주의

- 페이지 별 컴포넌트는 페이지 JSX 파일의 하위 폴더 (components) 안에 위치시킴.
- 페이지 혹은 컴포넌트 별 스타일시트는 JSX 파일과 같은 폴더 안에 위치시킴. <br />(스타일시트 파일명은 **소문자**로 작명 권장)
- 화면 파일명이 길어지는 경우 최대 35자, 영단어 5개까지로 제한.
- 목록 컴포넌트는 List, 목록 요소(행, 열 등)은 ListItem으로 끝나는 이름으로 사용.
- (기타) 상세조회 화면 파일은 Detail, 신규등록/수정 화면 파일은 Form으로 끝나는 이름으로 사용.

### 2) Commit Messages 💬

| 태그         | 설명                                                                         |
| ------------ | ---------------------------------------------------------------------------- |
| `feat: `     | 기능 추가                                                                    |
| `fix: `      | 버그를 고친 경우 🛠                                                           |
| `refactor: ` | 프로덕션 코드 리팩토링                                                       |
| `comment: `  | 필요한 주석 추가 및 변경 💬                                                  |
| `chore: `    | 빌드 태스트 업데이트, 패키지 매니저를 설정하는 경우(프로덕션 코드 변경 X) ⚙️ |
| `docs: `     | 문서를 수정한 경우 📝                                                        |
| `style: `    | CSS 등 사용자 UI 디자인 변경 🎨                                              |
| `rename: `   | 파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우 ✍️                        |
| `remove: `   | 파일을 삭제하는 작업만 수행한 경우 🗑️                                        |

## Getting Started 🚀

1. Getting Start React Project with Vite

```
npm create vite@latest sprint-mission -- --template react
npm install react-router-dom
```

2. Styling with SCSS

```
npm install sass
```

3. Send request with axios

```
npm install axios
```

## Quick Start 🚀

### 1. 설치 및 세팅

#### 설치

- Node.js (최신 LTS 버전) https://nodejs.org/en
- VScode https://code.visualstudio.com/download
- extentions in VScode
  - ESLint : 문법 검사
  - snippets: 코드 자동완성 <br /> (JavaScript(ES6) code snippets, ES7 React snippets 등 ES6 이상의 스니펫이면 모두 가능)
  - Prettier: 코드 포맷터

#### VScode 세팅 (File > Prefrerences > Settings)

- Editor: Default Formatter => `Prettier - Code Formatter`
- Editor: Tab Size => `2`
- Prettier: Tab Width => `2`
- Prettier: Print Width => `100`

### 2. clone project & install modules

```
git clone https://github.com/codeit-fe-14-first-project-team2/fandom-k.git
npm install
```

### 3. run the development server

```
npm run dev
```
