# Fandom-K

좋아하는 아이돌 후원, 투표, 차트 불러오기 기능을 구현하는 아이돌 팬덤 플랫폼 프로젝트입니다.

This is a React project created with Vite.

## Goals 💡

- API 탐색과 적용을 통해 원활한 기능 작동을 경험
- 재활용할 수 있는 UI를 구현함으로써 효율성 최대화<br />(후원하기 및 투표하기 버튼, 아이돌 이미지, 인기 투표 차트 등 공통 컴포넌트)
- 일관성 있는 UX를 통해 사용자 리텐션을 강화하여 사용자 경험을 고려한 실무 경험

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
src/app/

+-- assets/
|   +-- font/
|   +-- icon/ (.svg files for icon)
|   +-- image/

+-- styles/ (definitions of design attributes with className)
|   +-- global.scss
|   +-- _reset.scss
|   +-- _color.scss
|   +-- _layout.scss
|   +-- _typography.scss

+-- component/ (reusable UI Components having atoms combined)
|   +-- Button.jsx
|   +-- Header.jsx

+-- modal/
|   +-- ChargeModal.jsx
|   +-- SponsorModal.jsx
|   +-- VoteModal.jsx
|   +-- ErrorModal.jsx

+-- pages/
|   +-- list/
|   |   +-- components/
|   |   |   +-- TributeContainer.jsx
|   |   |   +-- ChartContainer.jsx
|   |   +-- ListPage.jsx
|   |   +-- listpage.scss
|   +-- mypage/
|   |   +-- components/
|   |   |   +-- FavoriteContainer.jsx
|   |   |   +-- IdolListContainer.jsx
|   |   +-- MyPage.jsx
|   |   +-- mypage.scss
|   +-- Home.jsx
|   +-- home.scss
.
.
.
```

## Convention

### 1) Naming Conventions 📝

- file, page, component name: PascalCase
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

- 페이지 별 스타일시트는 페이지 JSX 파일과 같은 폴더 안에 위치시킴.
- 페이지 별 컴포넌트는 페이지 JSX 파일의 하위 폴더 (components) 안에 위치시킴.
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

**Node.js 설치 필수**

1. Getting Start React Project with Vite

```
npm create vite@latest sprint-mission -- --template react
npm install react-router-dom
```

2. Styling with SCSS

```
npm install sass
```

3. send request with axios

```
npm install axios
```

## Quick Start 🚀

### 1. clone project & install modules

```
git clone https://github.com/codeit-fe-14-first-project-team2/fandom-k.git
npm install
```

### 2. run the development server

```
npm run dev
```
