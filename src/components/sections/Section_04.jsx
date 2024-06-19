import "./Section_04.scss";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ModalContents from "../project/ModalContents";

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
import { ReactComponent as GithubIcon } from "../../assets/images/github.svg";
import { ReactComponent as UrlIcon } from "../../assets/images/URL.svg";

gsap.registerPlugin(ScrollTrigger);

const gitLink = {
  michi: "https://github.com/teeny-box/michi-frontend",
  dok: "https://github.com/jin-dooly/DOK_frontend",
  teenybox: "https://github.com/teeny-box/teenybox-frontend",
  casaverde: "https://github.com/SW-6-Casa-Verde/Backend",
};

function SECTION_04({ setRef }) {
  const [curItem, setCurItem] = useState("");
  const [selected, setSelected] = useState("");
  const openModalRef = useRef();

  useGSAP(() => {
    let rectangle = gsap.utils.toArray("#project .rectangle");

    const showContents = gsap.set("#project .contents", {
      display: "flex",
      paused: true,
    });

    gsap.from(rectangle, {
      xPercent: -100,
      ease: "circ.inOut",
      scrollTrigger: {
        trigger: ".section-04",
        start: "center-=1px center",
        // end: "bottom-=100px bottom",
        endTrigger: ".section-05",
        toggleActions: "play reverse play reverse",
      },
      onStart: () => {
        showContents.play();
      },
      onReverseComplete: () => {
        showContents.reverse();
      },
    });

    openModalRef.current = gsap.timeline({ paused: true }); //{ paused: true }
    openModalRef.current.from("#project .modal", {
      yPercent: 300,
      ease: "circ.inOut",
      duration: 0.5,
      onReverseComplete: () => {
        setSelected("");
      },
    });
    openModalRef.current.set("#project .button-box", {
      opacity: 1,
    });
    openModalRef.current.from("#project .button-box .button", {
      xPercent: -300,
      duration: 0.3,
      stagger: 0.1,
    });
  });

  const handleMouseEnter = (e) => {
    setCurItem(e.currentTarget.dataset.title);
  };

  const handleMouseLeave = () => {
    setCurItem(selected);
  };

  const handleClick = (e) => {
    if (!selected) {
      openModalRef.current.play();
    }
    setSelected(e.currentTarget.dataset.title);
  };

  const handleClose = (e) => {
    setCurItem("");
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

      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {selected && <ModalContents selected={selected} />}
      </div>
      <div className="button-box" onClick={(e) => e.stopPropagation()}>
        <CloseIcon className="button close" onClick={handleClose} />
        <a href={gitLink[selected]} target="_blank" rel="noreferrer" className="button github">
          <GithubIcon />
        </a>

        <a href="https://dailytopia2.shop" target="_blank" rel="noreferrer" className="button url">
          {selected === "teenybox" && <UrlIcon />}
        </a>
      </div>
    </section>
  );
}

export default SECTION_04;
