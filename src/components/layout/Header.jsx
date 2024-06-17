import { Link } from "react-router-dom";
import "./Header.scss";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

function Header() {
  const showAnim = useRef();

  useGSAP(() => {
    showAnim.current = gsap
      .from(".header", {
        yPercent: -100,
        paused: true,
        duration: 0.2,
      })
      .progress(1);

    gsap.to(".header", {
      background: "linear-gradient(rgba(92, 74, 142, 1) 30%, rgba(92, 74, 142, 0.6) 70%, rgba(92, 74, 142, 0))",
      scrollTrigger: {
        trigger: ".section-04",
        scrub: 1,
      },
    });

    ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        self.direction === -1 ? showAnim.current.play() : showAnim.current.reverse();
      },
    });
  });

  return (
    <div className="header">
      <div className="logo">main title</div>
      <div className="menu">
        <Link className="item" to="">
          소개
        </Link>
        <Link className="item" to="">
          스택
        </Link>
        <Link className="item" to="">
          프로젝트
        </Link>
        <Link className="item" to="">
          교육
        </Link>
      </div>
    </div>
  );
}

export default Header;
