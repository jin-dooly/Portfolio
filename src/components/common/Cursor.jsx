import "./Cursor.scss";
import gsap from "gsap";
import { useEffect } from "react";

function Cursor({ x, y }) {
  useEffect(() => {
    gsap.to(["#subCursor", "#bgCursor"], {
      x,
      y,
      duration: 0.35,
    });
  }, [x, y]);

  return (
    <>
      <div id="bgCursor" className="cursor">
        <div />
      </div>
      <div id="mainCursor" className="cursor" style={{ left: x, top: y }}>
        <div />
      </div>
      <div id="subCursor" className="cursor">
        <div />
      </div>
    </>
  );
}

export default Cursor;
