import "./Section_02.scss";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { ReactComponent as Star } from "../../assets/images/star_purple.svg";
import profile from "../../assets/images/profile.png";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

function SECTION_02({ setRef }) {
  const starRef = useRef();

  useGSAP(() => {
    gsap.from("#introduction > .contents", {
      scale: 1.3,
      scrollTrigger: {
        trigger: ".section-02",
        scrub: 1,
      },
    });
    gsap.to("#introduction .image-box", {
      rotation: 8,
      scrollTrigger: {
        trigger: ".section-02",
        scrub: 1,
      },
    });

    gsap.from(".stars svg", {
      opacity: 0,
      scale: 0,
      scrollTrigger: { trigger: "#introduction", scrub: 1, end: "50% 50%" },
    });
  });

  const createStar = () => {
    const arr = new Array(100).fill(0);
    const stars = arr.map(() => {
      const randomTop = Math.random() * 51;
      const randomLeft = Math.random() * 100;
      const randomOpacity = (Math.random() * 0.5).toFixed(2);
      const randomScale = (Math.random() * 1 + 0.5).toFixed(2);
      const randomblur = (Math.random() * 5).toFixed(0);
      return <Star style={{ top: `${randomTop}%`, left: `${randomLeft}%`, opacity: randomOpacity, scale: randomScale, filter: `blur(${randomblur}px)` }} />;
    });
    return stars;
  };

  useEffect(() => {
    starRef.current = createStar();
  }, []);

  return (
    <section id="introduction" ref={setRef} className="section section-02">
      <div className="stars">{starRef.current}</div>
      <div className="contents">
        <h1>
          이진이 | <span className="point">몰입하는 개발자</span>
        </h1>
        <div className="detail">
          <p>
            새로운 프로젝트에 참여할 때마다 저는 항상 <span className="point">열정적</span>으로 몰입합니다.
            <br />
            그저 프론트엔드 코드만 짜는 것이 아닌 기획, 디자인 등 다양한 분야에서 접근하며
            <br />
            <span className="point">사용자 경험 향상</span>을 위해 노력하는 “Developer”입니다.
          </p>
          <p>팀원들과의 협업에서도 같은 열정을 유지하며, 의견을 주고받고 함께 고민하며 문제를 해결하기 위해 끊임없이 노력합니다.</p>
          <p>
            팀 내에서 <span className="point">리딩</span> 역할을 맡아 <span className="point">효율성</span>을 높이고, 다른 역할을 담당한 팀원들과 적극적으로 협업하여 최종
            프로젝트의 퀄리티를 높이는 데 기여합니다.
          </p>
        </div>
        <div>
          <span className="tag">#열정</span> <span className="tag">#책임감</span> <span className="tag">#리더쉽</span>
        </div>
      </div>
      <div className="image-box">
        <img src={profile} alt="프로필 사진" />
      </div>
    </section>
  );
}

export default SECTION_02;
