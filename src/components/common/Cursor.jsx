import { useGSAP } from "@gsap/react";
import "./Cursor.scss";
import gsap from "gsap";
import { useEffect } from "react";
import { ReactComponent as Star } from "../../assets/images/star_purple.svg";

function Cursor({ x, y }) {
  useEffect(() => {
    gsap.to(["#subCursor", "#bgCursor"], {
      x,
      y,
      duration: 0.33,
    });
  }, [x, y]);

  useGSAP(() => {
    gsap.to(["#mainCursor path", "#subCursor div"], {
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
      <div id="bgCursor" className="cursor">
        <div />
      </div>
      <div id="mainCursor" className="cursor" style={{ left: x - 6.5, top: y - 7 }}>
        <Star />
      </div>
      <div id="subCursor" className="cursor">
        <div />
      </div>
    </>
  );
}

export default Cursor;
