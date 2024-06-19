import { Children, useState } from "react";

function CasaverdeContents({ handleButtonEnter, handleButtonLeave }) {
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
            <li>쇼핑몰 상품 및 카테고리 파트 담당</li>
            <li>JOI API를 활용하여 직관적이고 가독성 뛰어난 스키마를 정의, 정규 표현식을 이용하여 강력한 유효성 검사를 하도록 구현</li>
            <li>passport-google-oauth20를 사용하여 구글 로그인 전략 구현</li>
            <li>multer 라이브러리를 사용하여 이미지 저장 로직 구현</li>
            <li>postman을 이용하여 가독성 좋고 테스트에 용이한 API 명세서 생성</li>
          </ul>
        );

      case 1:
        return (
          <ul>
            <li>VM으로 nginx에 express 앱 배포</li>
            <li>pm2 모듈을 활용하여 무중단 서비스 적용</li>
          </ul>
        );

      case 2:
        return (
          <ul>
            <li>중도 하차 팀원을 대신하여 관리자 페이지의 프론트엔드 작업 수행</li>
            <li>
              애자일 방법론(스크럼)을 적용하여 2주 안에 성공적으로 프로젝트 완성
              <ul>
                <li>데일리 스크럼 회의를 통해 빠르게 진행 상황을 파악하고, 팀원들의 작업량 적절히 분배</li>
                <li>스프린트 백로그를 작성하고 체계적으로 진행하여 백엔드 마감일 2일 단축</li>
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
          <li>기여도: 백엔드 40%, 프론트엔드 10%</li>
          <li>
            사용 기술: <span className="code">HTML</span>, <span className="code">CSS</span>, <span className="code">JavaScript</span>, <span className="code">Node.js</span>,{" "}
            <span className="code">Express.js</span>, <span className="code">Mongoose</span>, <span className="code">Postman</span>
          </li>
        </ul>
      </div>
      <div className="section service">
        <h2>💁🏻‍♀️ 서비스 내용</h2>
        <p>
          반려 식물 및 가드닝 도구를 판매하는 온라인 쇼핑몰 서비스입니다. 사용자, 상품, 장바구니, 주문, 관리자 관련 기능이 있습니다.
          <br /> <small>엘리스(부트캠프)에서 제공한 기능을 구현하였습니다.</small>
        </p>
      </div>
      <div className="section experience">
        <h2>✨ 성장 경험</h2>
        <h3>1. 팀 리드</h3>
        <p>
          팀의 일정과 상황에 맞춰 개발 일정을 조율하고 소통을 위해 노력했습니다. 오전에 전체 데일리 스크럼을 통해 각자 진행 상황을 빠르게 공유하고 하루의 목표를 설정한 뒤,
          백/프론트 파트 별 스크럼을 진행하여 자세한 이슈와 피드백을 공유하였습니다. 매주 월요일 오전에는 위클리 스프린트를 노션에 정리하여 개발 순서를 중요도 순으로
          정리하였습니다.
          <br />
          특히 프로젝트가 비대면으로 진행됨에 따라 디스코드를 적극 활용하여 개발 진행 중에는 음성 채팅 채널에 상주하도록 하였습니다. 데일리 스크럼 이후에도 계속 채널을 떠나지 않고
          개발하여 진행 중 문제가 생기거나 계획이 변경되었을 때 곧바로 소통함으로써 매우 빠르게 프로젝트를 진행할 수 있었습니다.
        </p>
        <br />
        <br />
        <h3>2. Git 협업</h3>
        <p>
          형상 관리 툴을 사용하여 협업하기 위해 브랜치명, 커밋 메시지 등을 일관성있게 통일하는 법을 배우고 함께 코드를 관리하는 법을 배우게 되었습니다. 충돌 및 해결 과정을 경험하며
          push, pull을 통해 코드를 자주 업데이트하고 관리하기 위해 노력하였습니다.
        </p>
      </div>
      <div className="section work">
        <h2>📑 작업 내용</h2>
        <div className="buttons flex-row">
          {Children.toArray(
            ["백엔드", "배포", "효율적 팀 리딩"].map((str, idx) => (
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

export default CasaverdeContents;
