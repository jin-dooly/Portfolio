import { Children, useState } from "react";

function MichiContents({ handleButtonEnter, handleButtonLeave }) {
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
              로그인, 회원가입, 마이페이지, 알림
              <ul>
                <li>Recoil을 도입하여 빠르고 효율적인 전역 상태 관리 시스템 구축</li>
                <li>메시지 송수신 솔루션인 FCM(Firebase Cloud Messaging) 아키텍처 경험</li>
                <li>react-navigation, iamport-react-native 등 라이브러리를 사용하며 공식문서 활용 능력 증진</li>
              </ul>
            </li>
            <li>
              서비스 안정성 향상
              <ul>
                <li>정보보호 법을 준수하기 위해 react-native-permissions라이브러리를 활용하여 카메라와 갤러리 접근을 위한 권한을 사용자에게 고지</li>
                <li>loading screen, splash screen 등을 추가하여 사용자의 불필요한 기능 호출 최소화</li>
              </ul>
            </li>
          </ul>
        );

      case 1:
        return (
          <ul>
            <li>MSW(Mock Service Worker)를 활용한 API 모킹 전략을 세워 코드의 견고성을 높임과 동시에 프론트엔드와 백엔드의 통합 지연 문제 해결</li>
            <li>
              공통으로 사용되는 콘텐츠를 컴포넌트, 훅, utils 함수로 모듈화하여 반복 코드 최소화 및 디자인 일관성 유지. 또한 사용법을 문서로 정리하여 공유함으로써 팀의 개발 속도
              향상
            </li>
            <li>회원정보 조회 및 변경과 관련하여 API의 취약점을 발견하고 백엔드 개발자에게 안정적인 방법을 제시하여 보안 강화</li>
            <li>모바일 애플리케이션의 UI/UX 가이드를 조사하여 디자이너에게 제안함으로써 사용자 친화적인 애플리케이션을 제작하도록 기여</li>
          </ul>
        );

      case 2:
        return (
          <ul>
            <li>Github Actions를 활용하여 CI/CD(빌드 및 배포 자동화) 구축</li>
            <li>Firebase App Distribution을 통해 안드로이드 테스트 앱 배포</li>
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
          <li>활동명 : 티니박스 팀 사이드 프로젝트</li>
          <li>인원: 백엔드 2, 프론트엔드 3, 디자인 1</li>
          <li>기여도: 프론트엔드 50%</li>
          <li>
            사용 기술: <span className="code">React Native</span>, <span className="code">TypeScript</span>, <span className="code">Recoil</span>,{" "}
            <span className="code">Figma</span>, <span className="code">Android Studio</span>, <span className="code">Firebase</span>
          </li>
        </ul>
      </div>
      <div className="section service">
        <h2>💁🏻‍♀️ 서비스 내용</h2>
        <p>
          익명으로 모르는 사람과 랜덤 또는 선택하여 채팅할 수 있는 서비스입니다.
          <br />
          티니박스 프로젝트 중 부득이하게 진행이 더뎌 사이드 프로젝트를 진행하게 되었습니다.
          <br />
          핵심 기능은 두 가지 입니다.
          <ol>
            <li>실시간 사용자들과 랜덤 매칭하여 채팅방 제공</li>
            <li>피드에 올라온 글 또는 온라인 사용자 정보를 통해 선택적으로 채팅 걸기</li>
          </ol>
        </p>
      </div>
      <div className="section experience">
        <h2>✨ 성장 경험</h2>
        <h3>1. API 모킹 전략</h3>
        <p>
          서버 오픈 계획이 점점 미뤄지다 보니 목 데이터를 사용해서 컴포넌트에 연결해야 했습니다. 기존에는 JSON 파일을 사용하여 단순히 파일 내용을 불러 오는 방식으로 모킹을
          해봤습니다. 하지만 이번엔 로그인 및 회원가입 파트를 맡아 단순한 GET 방식 이외에 헤더나 바디에 데이터를 담아 요청을 보내는 API가 더 많았고, 다른 방법이 필요하다고 생각되어
          MSW(Mock Service Worker)를 사용한 모킹 전략을 세우게 되었습니다.
          <br />
          <br />
          기존에는 파일 안에서 직접 데이터를 바꿔가며 UI를 확인해야 했고, 때문에 Git에 더러운 코드가 올라가기도 했었습니다. 또한 성공, 실패, 로딩 등 다양한 상태에 따른 UI를 확인할
          수 없었습니다. 하지만 MSW를 사용하고 난 후 테스트를 위해 서비스 로직을 직접 건드리는 일이 없어 코드의 견고성을 높이게 되었고, 실제 서비스 화면에서 다양한 Interaction을
          확인함으로써 상태에 따른 UI를 구성하며 예외 처리를 꼼꼼히 하게 되었습니다.
          <br />
          <br /> 이 경험으로 오래 고민했었던 프론트엔드와 백엔드의 통합 지연 문제를 해결하였으며, 기존 개발 방식이 서비스의 견고성을 고려하지 않았다는 것에 반성하며 모킹 전략의
          중요성을 깨닫게 되었습니다.
        </p>
        <br />
        <br />
        <h3>2. 작업 내용 문서화 및 공유</h3>
        <p>
          "티니박스" 프로젝트를 진행하면서 공통 컴포넌트나 훅을 만들고 팀원들에게 공지하였으나, 시간이 지나면서 이미 만들어진 컴포넌트 또는 훅이 있다는 것을 까먹고 새롭게 코드를
          짜는 상황이 빈번했습니다. 이번 프로젝트에서는 해당 문제를 방지하기 위해 노션에 명세서를 만들게 되었습니다.
          <br /> 문서화 작업 이후 반복 코드가 최소화 되었으며, 디자일 인관성을 유지할 수 있었습니다. 또한 코드를 해석하여 사용할 필요 없이 사용법을 정리해 둠으로써 팀 전체의 개발
          속도를 향상시킬 수 있었습니다.
        </p>
      </div>
      <div className="section work">
        <h2>📑 작업 내용</h2>
        <div className="buttons flex-row">
          {Children.toArray(
            ["프론트엔드", "효율적 팀 리딩", "배포"].map((str, idx) => (
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

export default MichiContents;
