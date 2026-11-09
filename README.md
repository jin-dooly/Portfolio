# 이진이 포트폴리오

빌드 없는 정적 페이지(HTML, CSS, JS)예요. `index.html`을 브라우저로 바로 열어서 확인할 수 있어요.

## 파일

| 파일 | 내용 |
| --- | --- |
| `index.html` | 모든 글. 점선 마젠타 상자(`class="todo"`)가 직접 채울 자리 |
| `style.css` | 디자인 (항공 지도 톤, 다크 모드 포함) |
| `main.js` | 첫 화면 반경 지도, 항로 단계 표시, 적재 목록 탭, 보간 데모 |
| `assets/` | 스크린샷, GIF를 넣는 곳 |
| `.nojekyll` | GitHub Pages가 파일을 그대로 쓰게 하는 빈 파일 (지우지 마세요) |

## 채워야 할 곳

`index.html`에서 `todo`를 검색하세요.

- 내 머리 위 비행기: 1번(계기, 기존 서비스와 차이), 2번(가장 아까웠던 기능), 3번(AI 제안을 바꾼 순간), **4번 전체(실제 사용자 반응)**, 대표 GIF
- UMF, 키오스크, Memble: 각 2번(우선순위 기준), 키오스크 4번, 이미지

이미지는 `assets/`에 넣고 `<div class="todo todo-media">...</div>`를 `<img src="assets/파일명" alt="설명" />`로 바꾸면 돼요. 경로는 꼭 `assets/...`처럼 상대 경로로 쓰세요(`/assets/...`는 하위 경로 배포에서 깨져요).

첫 화면 비행기의 편명, 이름, 궤도는 `main.js` 위쪽 `flights` 배열에서 바꿀 수 있어요.

## 배포 (https://jin-dooly.github.io/portfolio/)

```bash
git init
git add .
git commit -m "chore: 포트폴리오 구성"
git branch -M main
git remote add origin https://github.com/jin-dooly/portfolio.git
git push -u origin main
```

GitHub 저장소 Settings → Pages → Source: `Deploy from a branch`, Branch: `main` / `/ (root)` 저장. 1~2분 뒤 주소로 열려요.
