import { Children, useState } from "react";

function TeenyboxContents({ handleButtonEnter, handleButtonLeave }) {
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
              홍보 게시판, 자유 게시판(커뮤니티), 마이페이지
              <ul>
                <li>게시판, 댓글 CRUD 구현</li>
                <li>응답 및 네트워크 상태별 UI 제작</li>
                <li>Presigned URL을 활용한 이미지 저장 로직을 채택하여 보안적으로 안전한 객체 업로드 구현 및 서버 부담 감소</li>
              </ul>
            </li>
            <li>
              코드 퀄리티 향상
              <ul>
                <li>코드 리뷰를 통해 잠재적 결함을 찾아내고, 피드백을 통해 코드 개선</li>
                <li>dayjs를 추가하여 날짜 포멧 코드의 일관성 향상</li>
                <li>공통 컴포넌트를 제작하여 코드의 반복을 줄이고 props를 통해 일관된 디자인 사용</li>
                <li>SCSS의 Variable, @mixin 기능을 사용하여 반응형 개발을 위한 기준을 정의 및 코드 간략화</li>
              </ul>
            </li>
            <li>
              UI/UX 개선
              <ul>
                <li>TOAST UI Editor 플러그인을 활용하여 사용자가 다양한 형식의 글을 작성할 수 있도록 지원</li>
                <li>최근 본 글, 인기 글 등의 위젯을 배치하여 사용자 편의성 증가 및 공백 보완</li>
                <li>웹 디자이너 팀원과 협업하여 반응형 디자인 추가</li>
              </ul>
            </li>
          </ul>
        );

      case 1:
        return (
          <ul>
            <li>와이어프레임 및 디자인 목업 제작</li>
            <li>
              기획 개선
              <ul>
                <li>게시판에 배너 기능을 추가하여 홍보 효과 극대화</li>
                <li>공지사항 등 분류를 추가하여 용도에 따라 데이터 분리 및 활용</li>
              </ul>
            </li>
          </ul>
        );

      case 2:
        return (
          <ul>
            <li>실제 서비스 사이트와 개발 사이트를 함께 운영하며 서비스 관리</li>
            <li>Git Flow 전략을 통한 버전 관리, 실행 환경에 따라 환경 변수(.env 파일)를 분리하여 사용</li>
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
          <li>활동명 : 엘리스 SW 6기 2차 자율 스터디 프로젝트</li>
          <li>인원: 백엔드 3, 프론트엔드 3, 디자인 1</li>
          <li>기여도: 프론트엔드 40%</li>
          <li>
            사용 기술: <span className="code">HTML</span>, <span className="code">CSS</span>, <span className="code">JavaScript</span>, <span className="code">React</span>,{" "}
            <span className="code">SCSS</span>, <span className="code">Figma</span>, <span className="code">MUI</span>
          </li>
        </ul>
      </div>
      <div className="section service">
        <h2>💁🏻‍♀️ 서비스 내용</h2>
        <p>
          연극인들을 위한 활발한 커뮤니티를 만들자는 목적으로 제작되었으며, 연극을 찾고 홍보할 수 있는 연극 정보 사이트입니다.
          <br />
          핵심 기능은 세 가지 입니다.
          <ol>
            <li>현재 대한민국 연극 상영 정보 제공</li>
            <li>소규모 연극을 홍보할 수 있는 게시판</li>
            <li>연극인들끼리 소통할 수 있는 커뮤니티</li>
          </ol>
        </p>
      </div>
      <div className="section experience">
        <h2>✨ 성장 경험</h2>
        <h3>서비스 운영</h3>
        <p>
          실제 도메인을 배포하여 서비스를 운영해보기로 계획한 후 안정적인 서비스 운영을 위해 버전 관리, 실행 환경에 따른 환경 변수 제어 등 다양한 노력을 했습니다. 또 사용자들이
          원하는 기능, 다른 사이트와의 차별성, 홍보 전략 등을 고민하며 다양한 도전을 하게 되었습니다. 결론적으로 사용자를 유치하지는 못했지만, 서비스의 개선을 위해 노력하며
          고민하는 경험이 되었습니다.
        </p>
      </div>
      <div className="section work">
        <h2>📑 작업 내용</h2>
        <div className="buttons flex-row">
          {Children.toArray(
            ["프론트엔드", "기획 및 디자인", "안정적인 서비스 운영"].map((str, idx) => (
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

export default TeenyboxContents;
