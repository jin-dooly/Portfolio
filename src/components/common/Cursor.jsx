import { useGSAP } from "@gsap/react";
import "./Cursor.scss";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { ReactComponent as Star } from "../../assets/images/star_purple.svg";

function Cursor({ x, y }) {
  const mainCursorRef = useRef(null);
  const subCursorRef = useRef(null);
  const starRef = useRef(null);

  useEffect(() => {
    let animationFrameId;

    const animateCursor = () => {
      gsap.to(subCursorRef.current, {
        x,
        y,
        duration: 0.33,
      });

      animationFrameId = requestAnimationFrame(animateCursor);
    };

    animateCursor();

    gsap.to("#cursorStar svg:nth-child(1)", {
      x,
      y,
      ease: "power2.out",
      delay: 0.001,
      duration: 0.2,
    });
    gsap.to("#cursorStar svg:nth-child(2)", {
      x,
      y,
      ease: "power2.out",
      delay: 0.004,
      duration: 0.4,
    });
    gsap.to("#cursorStar svg:nth-child(3)", {
      x,
      y,
      ease: "power2.out",
      delay: 0.02,
      duration: 0.6,
    });
    gsap.to("#cursorStar svg:nth-child(4)", {
      x,
      y,
      ease: "power2.out",
      delay: 0.06,
      duration: 0.8,
    });
    gsap.to("#cursorStar svg:nth-child(5)", {
      x,
      y,
      ease: "power2.out",
      delay: 0.1,
      duration: 1,
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [x, y]);

  useGSAP(() => {
    const star = gsap.utils.toArray("#cursorStar path");
    gsap.to([mainCursorRef.current.querySelector("path"), subCursorRef.current.querySelector("div"), star], {
      scrollTrigger: {
        trigger: ".section-04",
        scrub: 1,
      },
      fill: "#000",
      borderColor: "#000",
    });
  });

  return (
    <>
      <div ref={starRef} id="cursorStar" className="cursor star">
        <Star />
        <Star />
        <Star />
        <Star />
        <Star />
      </div>
      <div ref={mainCursorRef} id="mainCursor" className="cursor" style={{ left: x - 6.5, top: y - 7 }}>
        <Star />
      </div>
      <div ref={subCursorRef} id="subCursor" className="cursor">
        <div />
      </div>
    </>
  );
}

export default Cursor;
