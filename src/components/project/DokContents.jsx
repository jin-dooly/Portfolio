import { Children, useState } from "react";

function DokContents({ handleButtonEnter, handleButtonLeave }) {
  const [buttonSelected, setButtonSelected] = useState(0);

  const handleButtonClick = (e) => {
    const idx = Number(e.currentTarget.dataset.index);
    setButtonSelected(idx);
  };

  const getWorkContents = () => {
    switch (buttonSelected) {
      case 0:
        return (
          <ul>
            <li>
              메인, 인증, 매칭 페이지
              <ul>
                <li>카카오 맵 API로 위치 선택 기능을 구현하여 사용자에게 편리한 UI(지도) 제공</li>
                <li>React에서 Form 요소의 상태를 관리하는 방법인 Controlled와 Uncontrolled 방식을 구분하여 사용</li>
                <li>사용자 친화적인 Form을 구성하기 위해 스스로 고민하여 직관적인 UI로 변경</li>
              </ul>
            </li>
            <li>
              효율적인 코드 관리
              <ul>
                <li>Redux Toolkit을 사용하여 전역 상태를 관리함으로써 상태 변경 성능 최적화, 명시적으로 상태 변경 관리</li>
                <li>라이브러리의 meta 정보를 비교하고 선택하여 번들 사이즈를 최대 95% 감소시켰으며, 프로젝트에 적절한 라이브러리를 선택하는 기준 터득</li>
                <li>리팩토링을 통해 안정적이고 일관된 코드 스타일을 적용하고 클린 코드 작성</li>
              </ul>
            </li>
          </ul>
        );

      case 1:
        return (
          <ul>
            <li>기획을 총괄하며 서비스의 목표를 기술적으로 녹여내는 방법 고심</li>
            <li>피그마 목업 단계부터 실제 크기와 위치를 고려하여 신중하고 계획적으로 작업하였고, 첫 디자인의 90%가 최종까지 유지되어 CSS 작업 시간 절약</li>
          </ul>
        );

      case 2:
        return (
          <ul>
            <li>
              기술적 리딩
              <ul>
                <li>프론트엔드에서 JWT 토큰과 쿠키로 인증하여 전역 상태에 저장 후 사용하기까지 흐름을 정리하고 설명하여 로그인 로직 구현을 도움</li>
                <li>multer 사용 경험을 토대로 백엔드 팀원들이 3시간째 헤매던 이미지 저장 프로세스를 설명하여 30분 만에 로직을 구축하도록 도움</li>
              </ul>
            </li>
            <li>
              트러블슈팅
              <ul>
                <li>프로젝트 기획 당시 결정이 나지 않아 진행이 막혔을 때, 짝을 지어 파트 별로 각각 기획하자는 의견을 내어 문제 해결</li>
                <li>기획 단계에서 서로 의견이 다르다는 것을 인지하고, 각자 프로젝트에 대한 목표를 얘기하는 시간을 가짐으로써 의견을 조율하고 팀워크를 다짐</li>
              </ul>
            </li>
          </ul>
        );

      default:
        return <></>;
    }
  };

  return (
    <>
      <div className="section infomation">
        <h2>➕ 추가 정보</h2>
        <ul>
          <li>활동명 : 엘리스 SW 6기 2차 프로젝트</li>
          <li>인원: 백엔드 3, 프론트엔드 3</li>
          <li>기여도: 기획 90%, 프론트엔드 50%, 디자인 70%</li>
          <li>
            사용 기술: <span className="code">HTML/CSS/JS</span>, <span className="code">React</span>, <span className="code">TypeScript</span>,{" "}
            <span className="code">Redux Toolkit</span>, <span className="code">Styled-components</span>, <span className="code">Figma</span>, <span className="code">MUI</span>,{" "}
            <span className="code">Vite</span>
          </li>
        </ul>
      </div>
      <div className="section service">
        <h2>💁🏻‍♀️ 서비스 내용</h2>
        <p>
          바쁜 현대 사회에서 강아지를 산책시킬 시간이 부족한 견주가 자신을 대신할 사람을 구할 수 있는 플랫폼이 있으면 좋겠다고 생각하여 기획하게 되었습니다.
          <br />
          핵심 기능은 두 가지 입니다.
          <ol>
            <li>
              강아지 산책 매칭
              <br />
              <small>
                - 견주는 강아지 정보와 산책을 원하는 시간, 장소 등 작성하여 글을 등록할 수 있고, 핸들러(강아지를 산책 시키는 사람)는 올라온 글을 보고 지원할 수 있습니다.
                <br />- 글 작성자(견주)는 지원자들 중에 선택할 수 있으며, 댓글로 소통하여 추가 정보를 얻을 수 있습니다.
              </small>
            </li>
            <li>산책 후 인증 글 등록</li>
          </ol>
        </p>
      </div>
      <div className="section experience">
        <h2>✨ 성장 경험</h2>
        <h3>1. 기획</h3>
        <p>
          주제 선정 중 제 아이템이 선정되어 전반적으로 기획을 맡게 되었습니다. '당근마켓'을 벤치마킹 하여 시작했지만, 기술적으로 녹여내기 어려운 부분이 많아 적정선을 찾기가
          어려웠습니다. 하지만 페르소나를 선정하여 사용자가 원하는 서비스에 대해 끊임 없이 고민하고, 팀원들과 깊은 대화를 나누며 기획을 잘 마무리 할 수 있었습니다.
          <br />이 과정에서 기술적 측면에서만 문제를 관리하는 "코더"가 아닌, 기획이나 기능 등 다양한 관점에서 방안을 찾고 개발 프로세스 전체를 포괄적으로 아우를 수 있는 "개발자"로
          성장할 수 있었습니다.
        </p>
        <br />
        <br />
        <h3>2. 팀원으로서의 팀 리딩</h3>
        <p>
          프로젝트 초반 회의 때 의견 충돌에 관한 팀 리더의 결정이 타당하지 못하다고 생각했었습니다. 리더는 팀원 모두의 생각을 듣지 않고 그저 자신의 입장에서 바라본대로 진행 상황을
          결정하였고, 이는 이제 막 처음 만나 서로에 대해 잘 모르는 상황에서의 결정 방식으로는 옳지 않다고 생각하였습니다. 때문에 용기를 내어 직접 간담회를 열고 각자 이 프로젝트를
          어떻게 생각하고 어떤 목표로 임하는지 이야기하는 시간을 가졌습니다. 이 과정 덕분에 서로의 상황을 이해하게 되어 팀워크를 다질 수 있었고, 함께 결정한 기준에 따라 의견 충돌을
          적절히 해결할 수 있었습니다.
          <br />이 일을 계기로 팀의 방향을 올바르게 이끄는 것은 팀 리더만의 일이 아닌 팀원 모두의 도움이 필요하다는 것을 깨달았으며, 좋은 팀워크에 대해 고민하게 되었습니다.
        </p>
      </div>
      <div className="section work">
        <h2>📑 개발 내용</h2>
        <div className="buttons flex-row">
          {Children.toArray(
            ["프론트엔드", "기획 및 디자인", "적극적 팀 리딩"].map((str, idx) => (
              <div
                className={`button ${buttonSelected === idx ? "selected" : ""}`}
                data-index={idx}
                onMouseEnter={handleButtonEnter}
                onMouseLeave={handleButtonLeave}
                onClick={handleButtonClick}
              >
                {str}
              </div>
            ))
          )}
        </div>
        {getWorkContents()}
      </div>
    </>
  );
}

export default DokContents;
