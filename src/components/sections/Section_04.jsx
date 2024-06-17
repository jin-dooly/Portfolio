import "./Section_04.scss";
import { useRef, useState } from "react";
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

gsap.registerPlugin(ScrollTrigger);

function SECTION_04() {
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
        start: "center top",
        end: "bottom bottom",
        toggleActions: "play reverse play reverse",
      },
    });

    gsap.from("#project > h1", {
      xPercent: 100,
      ease: "circ.inOut",
      scrollTrigger: {
        trigger: ".section-04",
        start: "center top",
        end: "bottom bottom",
        toggleActions: "play reverse none none",
      },
    });

    gsap.to("#project .contents", {
      opacity: 1,
      scrollTrigger: {
        trigger: ".section-04",
        start: "center-=1px top",
        end: "bottom bottom",
        toggleActions: "play reverse play reverse",
      },
    });

    openModalRef.current = gsap.from("#project .detail-modal", {
      xPercent: 100,
      yPercent: 100,
      ease: "circ.inOut",
      duration: 0.5,
      scrollTrigger: {
        trigger: ".section-04",
        start: "center top",
        end: "bottom bottom",
        markers: 1,
        toggleActions: "none reverse none reverse",
      },
      onReverseComplete: () => {
        setSelected("");
      },
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
      openModalRef.current.play();
    }
    setSelected(e.currentTarget.dataset.title);
  };

  const handleClose = () => {
    openModalRef.current.reverse();
  };

  return (
    <section id="project" className="section section-04">
      <h1>PROJECT</h1>

      <Rectangle1 className="rectangle default" />
      <RectangleMichi className={`rectangle ${curItem === "michi"}`} />
      <RectangleDok className={`rectangle ${curItem === "dok"}`} />
      <RectangleTeenybox className={`rectangle ${curItem === "teenybox"}`} />
      <RectangleCasaverde className={`rectangle ${curItem === "casaverde"}`} />

      <div className="contents">
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

      <div className="detail-modal">
        {selected}
        <CloseIcon className="close" onClick={handleClose} />
      </div>
    </section>
  );
}

export default SECTION_04;
