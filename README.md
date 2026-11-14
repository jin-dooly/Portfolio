# 이진이 포트폴리오

현장을 관찰하는 프론트엔드 개발자 이진이의 포트폴리오입니다.

- 주소: https://jin-dooly.github.io/Portfolio/
- 빌드 없는 정적 페이지(HTML, CSS, JS)라 `index.html`을 브라우저로 바로 열어 볼 수 있습니다.

## 담긴 내용

- **내 머리 위 비행기**: 지도 위 실시간 비행기 위치 서비스 (React, MQTT, Leaflet)
- **이큐비알홀딩스**: UMF 블록체인 입장권, Memble React Native 앱, 광주과학고 AI 키오스크 외
- **AI와 함께한 1인 개발**: I HATE YOU, dear-mind, 오목, 내 머리 위 비행기

## 파일

| 파일         | 내용                                                           |
| ------------ | -------------------------------------------------------------- |
| `index.html` | 페이지 내용                                                    |
| `style.css`  | 디자인 (다크 모드 포함)                                        |
| `main.js`    | 첫 화면 돋보기, 상단 바, 단계 표시, 보간 비교 데모, 타임라인   |
| `assets/`    | 휴대폰 화면, 프로젝트 이미지, 링크 미리보기 이미지, 이력서 PDF |
| `.nojekyll`  | GitHub Pages가 파일을 그대로 쓰게 하는 빈 파일                 |

## 회사별 버전 (브랜치)

| 브랜치 | 주소 |
| --- | --- |
| `main` | https://jin-dooly.github.io/Portfolio/ (기본 버전, 회사 이름 없음) |
| `site/clabil` | https://jin-dooly.github.io/Portfolio/clabil/ |
| `site/weflow` | https://jin-dooly.github.io/Portfolio/weflow/ |

- 새 회사 버전: `main`에서 `site/<회사>` 브랜치를 만들고 푸시하면 `/<회사>/` 주소로 배포됩니다.
- 모든 버전에 들어가야 하는 수정(오타, 디자인)은 `main`에서 고친 뒤 각 브랜치에 `git merge main`으로 가져옵니다.
- 회사 버전에서는 `index.html` 위쪽 `og:url`을 그 버전 주소로 바꿔 둡니다.
- 지원할 때 낸 그대로를 남기고 싶으면 태그를 찍습니다. 예: `git tag clabil-2026-11-09 site/clabil`

## 배포

`.github/workflows/deploy.yml`이 `main`이나 `site/*` 브랜치에 푸시될 때마다 모든 브랜치를 모아 GitHub Pages에 배포합니다.
처음 한 번, GitHub 저장소 Settings → Pages → Source를 **GitHub Actions**로 바꿔야 합니다.

> `src/`, `public/`, `package.json`은 2024년에 만든 이전 React 포트폴리오 파일입니다. 배포에는 포함되지 않습니다.
