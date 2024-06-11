import "./Section_01.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// 비눗방울 svg
import { ReactComponent as BubbleSingle1 } from "../../assets/images/bubble/bubble_single_1.svg";
import { ReactComponent as BubbleSingle2 } from "../../assets/images/bubble/bubble_single_2.svg";
import { ReactComponent as BubbleSingle3 } from "../../assets/images/bubble/bubble_single_3.svg";
import { ReactComponent as BubbleDouble1 } from "../../assets/images/bubble/bubble_double_1.svg";
import { ReactComponent as BubbleDouble2 } from "../../assets/images/bubble/bubble_double_2.svg";
import { ReactComponent as BubbleDouble3 } from "../../assets/images/bubble/bubble_double_3.svg";
import { ReactComponent as BubbleDouble4 } from "../../assets/images/bubble/bubble_double_4.svg";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const gsapOptions = {
  scrollTrigger: {
    trigger: ".section2",
    scrub: 1,
  },
  duration: 1,
};

function SECTION_01() {
  useGSAP(() => {
    gsap.to(".section-01 .title", {
      scale: 0.5,
      scrollTrigger: {
        trigger: ".section2",
        scrub: 1,
      },
    });

    gsap.to([".b1", ".b5", ".b11", ".b16"], {
      y: "10",
      repeat: -1,
      duration: 2,
      yoyoEase: "none",
      scrollTrigger: {
        trigger: ".section-01",
        toggleActions: "play reset play reset",
        end: "1 top",
      },
    });

    gsap.to([".b2", ".b6", ".b12", ".b17"], {
      y: "-10",
      repeat: -1,
      duration: 2.2,
      yoyoEase: "none",
      scrollTrigger: {
        trigger: ".section-01",
        toggleActions: "play reset play reset",
        end: "1 top",
      },
    });

    gsap.to([".b3", ".b7", ".b13", ".b18"], {
      y: "14",
      repeat: -1,
      duration: 2.5,
      yoyoEase: "none",
      scrollTrigger: {
        trigger: ".section-01",
        toggleActions: "play reset play reset",
        end: "1 top",
      },
    });

    gsap.to([".b4", ".b9", ".b14"], {
      y: "-8",
      repeat: -1,
      duration: 2.2,
      delay: 1,
      yoyoEase: "none",
      scrollTrigger: {
        trigger: ".section-01",
        toggleActions: "play reset play reset",
        end: "1 top",
      },
    });

    gsap.to([".b8", ".b15"], {
      y: "9",
      repeat: -1,
      duration: 2,
      delay: 1.5,
      yoyoEase: "none",
      scrollTrigger: {
        trigger: ".section-01",
        toggleActions: "play reset play reset",
        end: "1 top",
      },
    });

    gsap.to(".b1", {
      ...gsapOptions,
      x: "-200%",
      y: "-100%",
      filter: "blur(10px)",
    });

    gsap.to(".b2", {
      ...gsapOptions,
      x: "-150%",
      rotation: 50,
      scale: 0.5,
      filter: "blur(3px)",
    });

    gsap.to(".b3", {
      ...gsapOptions,
      x: "-200%",
      y: "-300%",
      filter: "blur(8px)",
    });

    gsap.to(".b4", {
      ...gsapOptions,
      x: "-100%",
      y: "300%",
      scale: 3,
      filter: "blur(10px)",
    });

    gsap.to(".b5", {
      ...gsapOptions,
      x: "-300%",
      y: "-500%",
      filter: "blur(2px)",
    });

    gsap.to(".b6", {
      ...gsapOptions,
      x: "-120%",
      y: "-300%",
      scale: 0.5,
      filter: "blur(3px)",
    });

    gsap.to(".b7", {
      ...gsapOptions,
      x: "200%",
      y: "-600%",
      rotation: 160,
      scale: 0,
      filter: "blur(20px)",
    });

    gsap.to(".b8", {
      ...gsapOptions,
      x: "50%",
      y: "-700%",
    });

    gsap.to(".b9", {
      ...gsapOptions,
      x: "-400%",
      y: "300%",
    });

    gsap.to(".b10", {
      ...gsapOptions,
      x: "300%",
      y: "-800%",
      scale: 0,
      filter: "blur(5px)",
    });

    gsap.to(".b11", {
      ...gsapOptions,
      x: "50%",
      y: "-850%",
      scale: 3,
      filter: "blur(5px)",
      rotation: 100,
    });

    gsap.to(".b12", {
      ...gsapOptions,
      x: "300%",
      y: "700%",
      scale: 0,
      filter: "blur(5px)",
    });

    gsap.to(".b13", {
      ...gsapOptions,
      x: "170%",
      y: "-20%",
      rotation: -100,
    });

    gsap.to(".b14", {
      ...gsapOptions,
      x: "170%",
      y: "-20%",
      filter: "blur(5px)",
    });

    gsap.to(".b15", {
      ...gsapOptions,
      x: "400%",
      y: "-600%",
      filter: "blur(3px)",
    });

    gsap.to(".b16", {
      ...gsapOptions,
      x: "400%",
      y: "-600%",
      scale: 0,
    });

    gsap.to(".b17", {
      ...gsapOptions,
      x: "800%",
      y: "-300%",
      scale: 0,
      filter: "blur(10px)",
    });

    gsap.to(".b18", {
      ...gsapOptions,
      x: "500%",
      y: "-100%",
    });
  });

  return (
    <section id="begin" className="section section-01">
      <BubbleSingle1 className="bubble b1" />
      <BubbleDouble3 className="bubble b2" />
      <BubbleSingle1 className="bubble b3" />
      <BubbleSingle2 className="bubble b4" />
      <BubbleSingle3 className="bubble b6" />
      <BubbleSingle1 className="bubble b5" />
      <BubbleDouble1 className="bubble b7" />
      <BubbleSingle2 className="bubble b8" />
      <BubbleDouble2 className="bubble b9" />
      <BubbleSingle1 className="bubble b10" />
      <BubbleSingle3 className="bubble b11" />
      <BubbleSingle1 className="bubble b12" />
      <BubbleDouble4 className="bubble b13" />
      <BubbleSingle2 className="bubble b14" />
      <BubbleSingle1 className="bubble b15" />
      <BubbleSingle2 className="bubble b16" />
      <BubbleSingle1 className="bubble b17" />
      <BubbleSingle2 className="bubble b18" />

      <div className="title">
        <h1>이진이</h1>
        <h1>프론트엔드 개발자</h1>
        <h1>PORTFOLIO</h1>
      </div>
    </section>
  );
}

export default SECTION_01;
