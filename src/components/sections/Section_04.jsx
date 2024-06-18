import "./Section_04.scss";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { ReactComponent as Rectangle1 } from "../../assets/images/Rectangle_1.svg";
import { ReactComponent as RectangleMichi } from "../../assets/images/Rectangle_Michi.svg";
import { ReactComponent as RectangleDok } from "../../assets/images/Rectangle_Dok.svg";
import { ReactComponent as RectangleTeenybox } from "../../assets/images/Rectangle_Teenybox.svg";
import { ReactComponent as RectangleCasaverde } from "../../assets/images/Rectangle_Casaverde.svg";

import { ReactComponent as TitleMichi } from "../../assets/images/title/MICHI.svg";
import { ReactComponent as TitleMichiHover } from "../../assets/images/title/MICHI_hover.svg";
import { ReactComponent as TitleDok } from "../../assets/images/title/DOK.svg";
import { ReactComponent as TitleDokHover } from "../../assets/images/title/DOK_hover.svg";
import { ReactComponent as TitleTeenybox } from "../../assets/images/title/TEENYBOX.svg";
import { ReactComponent as TitleTeenyboxHover } from "../../assets/images/title/TEENYBOX_hover.svg";
import { ReactComponent as TitleCasaverde } from "../../assets/images/title/CASAVERDE.svg";
import { ReactComponent as TitleCasaverdeHover } from "../../assets/images/title/CASAVERDE_hover.svg";

import { ReactComponent as CloseIcon } from "../../assets/images/close.svg";

import LogoMichi from "../../assets/images/logo/Logo-Michi.png";
import LogoDok from "../../assets/images/logo/Logo-Dok.png";
import LogoTeenybox from "../../assets/images/logo/Logo-Teenybox.png";
import LogoCasaverde from "../../assets/images/logo/Logo-Casaverde.png";

gsap.registerPlugin(ScrollTrigger);

function SECTION_04({ setRef }) {
  const [curItem, setCurItem] = useState("");
  const [selected, setSelected] = useState("");
  const openModalRef = useRef();

  useGSAP(() => {
    let rectangle = gsap.utils.toArray("#project .rectangle");

    gsap.from(rectangle, {
      xPercent: -100,
      ease: "circ.inOut",
      scrollTrigger: {
        trigger: ".section-04",
        start: "center-=1px center",
        end: "bottom bottom",
        toggleActions: "play reverse play reverse",
      },
    });

    gsap.to("#project .contents", {
      opacity: 1,
      scrollTrigger: {
        trigger: ".section-04",
        start: "center-=2px center",
        end: "bottom bottom",
        toggleActions: "play reverse play reverse",
      },
    });

    openModalRef.current = gsap.timeline(); //{ paused: true }
    openModalRef.current.from("#project .detail-modal", {
      yPercent: 300,
      ease: "circ.inOut",
      duration: 0.5,
      onReverseComplete: () => {
        setSelected("");
      },
    });
    openModalRef.current.set("#project .close", {
      opacity: 1,
    });
    openModalRef.current.from("#project .close", {
      xPercent: -300,
      duration: 0.3,
    });
  });

  const handleMouseEnter = (e) => {
    setCurItem(e.currentTarget.dataset.title);
  };

  const handleMouseLeave = () => {
    setCurItem("");
  };

  const handleClick = (e) => {
    if (!selected) {
      setCurItem("");
      openModalRef.current.play();
    }
    setSelected(e.currentTarget.dataset.title);
  };

  const handleClose = (e) => {
    selected && openModalRef.current.reverse();
    e.stopPropagation();
  };

  useEffect(() => {
    if (selected) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selected]);

  return (
    <section id="project" ref={setRef} className="section section-04" onClick={handleClose}>
      <Rectangle1 className="rectangle default" />
      <RectangleMichi className={`rectangle ${curItem === "michi"}`} />
      <RectangleDok className={`rectangle ${curItem === "dok"}`} />
      <RectangleTeenybox className={`rectangle ${curItem === "teenybox"}`} />
      <RectangleCasaverde className={`rectangle ${curItem === "casaverde"}`} />

      <div className="contents" onClick={(e) => e.stopPropagation()}>
        <div className="item michi">
          <div className="title" data-title="michi" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleClick}>
            {curItem === "michi" ? <TitleMichiHover /> : <TitleMichi />}
          </div>
          <div className="tags">
            <span className="tag">Android Studio</span>
            <span className="tag">React Native</span>
            <span className="tag">Recoil</span>
          </div>
        </div>
        <div className="item">
          <div className="title" data-title="dok" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleClick}>
            {curItem === "dok" ? <TitleDokHover /> : <TitleDok />}
          </div>
          <div className="tags">
            <span className="tag">React</span>
            <span className="tag">TypeScript</span>
            <span className="tag">Redux Toolkit</span>
            <span className="tag">Styled Components</span>
            <span className="tag">MUI</span>
          </div>
        </div>
        <div className="item">
          <div className="title" data-title="teenybox" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleClick}>
            {curItem === "teenybox" ? <TitleTeenyboxHover /> : <TitleTeenybox />}
          </div>
          <div className="tags">
            <span className="tag">React</span>
            <span className="tag">SCSS</span>
            <span className="tag">MUI</span>
          </div>
        </div>
        <div className="item">
          <div className="title" data-title="casaverde" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleClick}>
            {curItem === "casaverde" ? <TitleCasaverdeHover /> : <TitleCasaverde />}
          </div>
          <div className="tags">
            <span className="tag">Backend</span>
            <span className="tag">Express.js</span>
            <span className="tag">Mongoose</span>
          </div>
        </div>
      </div>

      <div className="detail-modal" onMouseOver={() => setCurItem("")} onClick={(e) => e.stopPropagation()}>
        <header>
          <div className="back">
            <img src={LogoMichi} alt="사이트 로고" />
          </div>
          <div className="front flex-col">
            <div className="title flex-row">
              <img className="logo" src={LogoMichi} alt="사이트 로고" />
              <h2>{selected} - 랜덤 채팅 앱</h2>
            </div>
            <span>2024년 4월 24일 ~ 현재</span>
            <div className="tags flex-row">
              <div>팀</div>
              <div>모바일</div>
              <div>사이드</div>
            </div>
          </div>
        </header>
        <div className="body flex-col">
          <div className="section infomation">
            <h2>➕ 추가 정보</h2>
            <ul>
              <li>활동명 : 티니박스 팀 사이드 프로젝트</li>
              <li>인원: 백엔드 2, 프론트엔드 3, 디자인 1</li>
              <li>기여도: 프론트엔드 50%</li>
              <li>사용 기술: React Native, TypeScript, Recoil, Figma, Android Studio, Firebase</li>
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
            </p>
            <ol>
              <li>실시간 사용자들과 랜덤 매칭하여 채팅방 제공</li>
              <li>피드에 올라온 글 또는 온라인 사용자 정보를 통해 선택적으로 채팅 걸기</li>
            </ol>
          </div>
          <div className="section experience">
            <h2>✨ 성장 경험</h2>
            <h3>1. API 모킹 전략</h3>
            <p>
              서버 오픈 계획이 점점 미뤄지다 보니 목 데이터를 사용해서 컴포넌트에 연결해야 했습니다. 기존에는 JSON 파일을 사용하여 단순히 파일 내용을 불러 오는 방식으로 모킹을
              해봤습니다. 하지만 이번엔 로그인 및 회원가입 파트를 맡아 단순한 GET 방식 이외에 헤더나 바디에 데이터를 담아 요청을 보내는 API가 더 많았고, 다른 방법이 필요하다고
              생각되어 MSW(Mock Service Worker)를 사용한 모킹 전략을 세우게 되었습니다.
              <br />
              <br />
              라우터를
            </p>
          </div>
        </div>
      </div>
      <CloseIcon className="close" onClick={handleClose} />
      {/* </div> */}
    </section>
  );
}

export default SECTION_04;
