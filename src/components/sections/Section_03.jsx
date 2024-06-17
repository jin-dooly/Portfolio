import "./Section_03.scss";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// 구름 svg
import { ReactComponent as CloudSingle1 } from "../../assets/images/cloud/cloud_single_1.svg";
import { ReactComponent as CloudSingle3 } from "../../assets/images/cloud/cloud_single_3.svg";
import { ReactComponent as CloudDouble1 } from "../../assets/images/cloud/cloud_double_1.svg";
import { ReactComponent as CloudDouble2 } from "../../assets/images/cloud/cloud_double_2.svg";

gsap.registerPlugin(ScrollTrigger);

function SECTION_03() {
  useGSAP(() => {
    let screen = gsap.utils.toArray("#stack .screen");

    gsap.to(screen, {
      xPercent: -100 * (screen.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: ".section-03",
        pin: ".section-03",
        scrub: 1,
        start: "top top",
        end: "bottom top",
        pinSpacing: 2,
      },
      zIndex: "auto",
    });

    gsap.from(["#stack .title"], {
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: ".section-03",
        scrub: 1,
        start: "top center",
        end: "top top",
      },
    });

    gsap.to("#stack .cloud-02", {
      xPercent: -90 * screen.length,
      duration: 1,
      scrollTrigger: {
        trigger: ".section-03",
        scrub: 1,
        start: "top top",
      },
    });

    gsap.to("#stack .cloud-03", {
      xPercent: -110 * screen.length,
      duration: 1,
      scrollTrigger: {
        trigger: ".section-03",
        scrub: 1,
        start: "top top",
      },
    });

    gsap.to("#stack .cloud-04", {
      xPercent: -112 * (screen.length + 2),
      duration: 1,
      scrollTrigger: {
        trigger: ".section-03",
        scrub: 1,
        start: "top top",
        endTrigger: ".section-04",
      },
    });

    gsap.to("#stack .app", {
      xPercent: -100,
      duration: 1,
      scrollTrigger: {
        trigger: "#stack .s2",
        scrub: 1,
        start: "10 top",
      },
    });
  });

  return (
    <section id="stack" className="section section-03">
      <CloudDouble1 className="cloud-01" />
      <CloudDouble2 className="cloud-02" />
      <CloudSingle1 className="cloud-03" />
      <CloudSingle3 className="cloud-04" />

      <h1 className="title">
        <span className="light">USED</span> STACK
      </h1>

      <div className="screen temp"></div>
      <div className="screen s1">
        <div className="box">
          <h2>FRONT END</h2>
          <ul className="items">
            <li className="item">
              <p className="stack">HTML/CSS</p>
              <p className="desc">웹 표준에 맞게 HTML 문법을 사용하고, CSS로 자유롭게 웹페이지를 스타일링 할 수 있습니다.</p>
            </li>
            <li className="item">
              <p className="stack">Javascript</p>
              <p className="desc">자바스크립트의 작동 원리를 이해하고 활용하여 ES6 문법을 사용할 수 있습니다.</p>
            </li>
            <li className="item">
              <p className="stack">React</p>
              <p className="desc">
                리액트를 이용하여 웹 프로젝트를 완성할 수 있으며,
                <br />
                다양한 라이브러리를 리액트 프로젝트에 적용할 수 있습니다.
              </p>
            </li>
            <li className="item">
              <p className="stack">Styled Component, SCSS, MUI</p>
              <p className="desc">Styled component, Scss, MUI를 리액트에 적용하여 스타일링 및 CSS 관리를 해봤습니다.</p>
            </li>
            <li className="item">
              <p className="stack">Recoil, Redux Toolkit</p>
              <p className="desc">리액트에서 전역 상태관리를 위해 라이브러리를 사용했습니다.</p>
            </li>
          </ul>
        </div>
      </div>
      <div className="screen s2">
        <div className="box backend">
          <h2>BACK END</h2>
          <ul className="items">
            <li className="item">
              <p className="stack">Node.js(Express)</p>
              <p className="desc">Express를 활용하여 백엔드 코드를 작성하고 REST API를 구축해본 경험이 있습니다.</p>
            </li>
            <li className="item">
              <p className="stack">Mongoose</p>
              <p className="desc">Express로 백엔드를 구축하면서 DB에 연동하기 위해 사용하였습니다.</p>
            </li>
          </ul>
        </div>
        <div className="box app">
          <h2>APP</h2>
          <ul className="items">
            <li className="item">
              <p className="stack">React Native</p>
              <p className="desc">웹 표준에 맞게 HTML 문법을 사용하고, CSS로 자유롭게 웹페이지를 스타일링 할 수 있습니다.</p>
            </li>
          </ul>
        </div>
      </div>
      <div className="screen s3">
        <div className="box etc">
          <h2>ETC.</h2>
          <ul className="items">
            <li className="item">
              <p className="stack">Git</p>
              <p className="desc">형상 관리 툴인 GitHub, GitLab을 사용하여 협업할 수 있습니다.</p>
            </li>
            <li className="item">
              <p className="stack">Figma</p>
              <p className="desc">피그마로 와이어프레임 및 목업을 작성하고 디자이너와 협업할 수 있습니다.</p>
            </li>
            <li className="item">
              <p className="stack">Notion</p>
              <p className="desc">협업을 위해 노션으로 문서 작업을 하고, 스프린트를 만들어 일정을 관리하였습니다.</p>
            </li>
          </ul>
        </div>
      </div>
      <div className="screen temp"></div>
    </section>
  );
}

export default SECTION_03;
