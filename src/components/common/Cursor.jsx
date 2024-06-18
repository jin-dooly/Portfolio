import { useGSAP } from "@gsap/react";
import "./Cursor.scss";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { ReactComponent as Star } from "../../assets/images/star_purple.svg";

function Cursor({ x, y }) {
  const bgCursorRef = useRef(null);
  const mainCursorRef = useRef(null);
  const subCursorRef = useRef(null);

  useEffect(() => {
    let animationFrameId;

    const animateCursor = () => {
      gsap.to([bgCursorRef.current, subCursorRef.current], {
        x,
        y,
        duration: 0.33,
      });

      animationFrameId = requestAnimationFrame(animateCursor);
    };

    animateCursor();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [x, y]);

  useGSAP(() => {
    gsap.to([mainCursorRef.current.querySelector("path"), subCursorRef.current.querySelector("div")], {
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
      <div ref={bgCursorRef} id="bgCursor" className="cursor">
        <div />
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
