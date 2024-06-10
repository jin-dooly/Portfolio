import "./Main.scss";
import { useState } from "react";
import Cursor from "../components/common/Cursor";
import SECTION_01 from "../components/sections/Section_01";
import Header from "../components/layout/Header";

function Main() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="main-container" onMouseMove={handleMouseMove}>
      <Cursor x={position.x} y={position.y} />
      <Header />
      <SECTION_01 />
      <section id="intro" className="section section2">
        <div>
          <h1 className="title">이진이</h1>
          <h1 className="title">FRONT-END ENGINER</h1>
          <h1 className="title">PORTFOLIO</h1>
        </div>
      </section>
    </div>
  );
}

export default Main;
