import "./Header.scss";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef, useState } from "react";

import { ReactComponent as BubbleSingle1 } from "../../assets/images/bubble/bubble_single_1.svg";

function Header({ scrollRef }) {
  const showAnim = useRef();
  const timer = useRef();
  const [open, setOpen] = useState(1);

  useGSAP(() => {
    showAnim.current = gsap
      .from("#mainHeader", {
        yPercent: -95,
        paused: true,
        duration: 0.2,
      })
      .progress(1);

    gsap.to("#mainHeader", {
      background: "linear-gradient(rgba(0, 0, 0, 0.8) , rgba(0, 0, 0, 0.5) 60%, rgba(0, 0, 0, 0))",
      scrollTrigger: {
        trigger: ".section-04",
        endTrigger: ".section-05",
        toggleActions: "play reverse play reverse",
      },
    });

    ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        if (self.direction === -1) {
          setOpen((cur) => cur + 1);
        } else {
          setOpen(0);
        }
      },
    });
  });

  const handleClick = (e) => {
    const linkIndex = e.currentTarget.dataset.link;
    switch (linkIndex) {
      case "1":
        scrollRef.current[1].scrollIntoView({ behavior: "smooth", block: "start" });
        break;
      case "2":
        window.scroll({ top: window.innerHeight * 2, behavior: "smooth" });
        break;
      case "3":
        scrollRef.current[3].scrollIntoView({ behavior: "smooth", block: "center" });
        break;
      case "4":
        scrollRef.current[4].scrollIntoView({ behavior: "smooth", block: "start" });
        break;
      default:
        window.scroll({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (open) {
      showAnim.current.play();
      clearTimeout(timer.current);

      if (window.scrollY === 0) return;
      timer.current = setTimeout(() => {
        setOpen(0);
        showAnim.current.reverse();
      }, 2000);
    } else {
      showAnim.current.reverse();
      clearTimeout(timer.current);
    }
  }, [open]);

  return (
    <header id="mainHeader" onMouseOver={() => setOpen((cur) => cur + 1)}>
      <div className="logo" data-link={0} onClick={handleClick}>
        <BubbleSingle1 />
        <p>
          2024 이진이
          <br />
          포트폴리오
        </p>
      </div>
      <div className="menu">
        <span className="item" data-link={1} onClick={handleClick}>
          소개
        </span>
        <span className="item" data-link={2} onClick={handleClick}>
          스택
        </span>
        <span className="item" data-link={3} onClick={handleClick}>
          프로젝트
        </span>
        <span className="item" data-link={4} onClick={handleClick}>
          연락처
        </span>
      </div>
    </header>
  );
}

export default Header;
