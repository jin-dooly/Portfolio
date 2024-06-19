import { useGSAP } from "@gsap/react";
import { Children, useEffect, useRef } from "react";
import gsap from "gsap";
import "./ModalContents.scss";

import LogoMichi from "../../assets/images/logo/Logo-Michi.png";
import LogoDok from "../../assets/images/logo/Logo-Dok.png";
import LogoTeenybox from "../../assets/images/logo/Logo-Teenybox.png";
import LogoCasaverde from "../../assets/images/logo/Logo-Casaverde.png";
import MichiContents from "./MichiContents";
import DokContents from "./DokContents";
import TeenyboxContents from "./TeenyboxContents";
import CasaverdeContents from "./CasaverdeContents";

const headerData = {
  michi: {
    title: "Michi - 랜덤 채팅 앱",
    logo: LogoMichi,
    date: "2024년 4월 24일 ~ 현재",
    tags: ["팀", "모바일", "사이드"],
  },
  dok: {
    title: "Dok - 강아지 산책 매칭 사이트",
    logo: LogoDok,
    date: "2023년 11월 13일 ~ 2023년 12월 02일",
    tags: ["팀", "기획", "엘리스"],
  },
  teenybox: {
    title: "Teeny Box - 연극 정보 사이트",
    logo: LogoTeenybox,
    date: "2023년 10월 23일 ~ 현재",
    tags: ["팀", "장기", "반응형"],
  },
  casaverde: {
    title: "Casa Verde - 식물 쇼핑몰",
    logo: LogoCasaverde,
    date: "2023년 10월 02일 ~ 2023년 10월 14일",
    tags: ["팀", "백엔드", "엘리스"],
  },
};

function ModalContents({ selected }) {
  const cursorAniRef = useRef();

  useGSAP(() => {
    const cursorAni = gsap.timeline({ paused: true });
    cursorAni.set("#cursorStar", {
      opacity: 0,
    });
    cursorAni.to("#mainCursor svg", {
      rotateY: 360,
      repeat: -1,
      duration: 1,
    });
    cursorAniRef.current = cursorAni;
  });

  const handleButtonEnter = () => {
    cursorAniRef.current.play();
  };

  const handleButtonLeave = () => {
    cursorAniRef.current.reverse();
    cursorAniRef.current.progress(0);
  };

  const getBody = () => {
    return selected === "michi" ? (
      <MichiContents handleButtonEnter={handleButtonEnter} handleButtonLeave={handleButtonLeave} />
    ) : selected === "dok" ? (
      <DokContents handleButtonEnter={handleButtonEnter} handleButtonLeave={handleButtonLeave} />
    ) : selected === "teenybox" ? (
      <TeenyboxContents handleButtonEnter={handleButtonEnter} handleButtonLeave={handleButtonLeave} />
    ) : selected === "casaverde" ? (
      <CasaverdeContents handleButtonEnter={handleButtonEnter} handleButtonLeave={handleButtonLeave} />
    ) : (
      <></>
    );
  };

  useEffect(() => {
    document.querySelector(".modal").scroll({ top: 0 });
  }, [selected]);

  return (
    <div className="modal-contents">
      <header>
        <div className="back">
          <img src={headerData[selected].logo} alt="사이트 로고" />
        </div>
        <div className="front flex-col">
          <div className="title flex-row">
            <img className="logo" src={headerData[selected].logo} alt="사이트 로고" />
            <h2>{headerData[selected].title}</h2>
          </div>
          <span>{headerData[selected].date}</span>
          <div className="tags flex-row">{Children.toArray(headerData[selected].tags.map((tag) => <div>{tag}</div>))}</div>
        </div>
      </header>
      <div className="body flex-col">{getBody()}</div>
    </div>
  );
}

export default ModalContents;
