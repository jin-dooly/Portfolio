import "./Main.scss";
import { useState } from "react";
import Cursor from "../components/common/Cursor";
import SECTION_01 from "../components/sections/Section_01";
import Header from "../components/layout/Header";
import SECTION_02 from "../components/sections/Section_02";
import SECTION_03 from "../components/sections/Section_03";
import SECTION_04 from "../components/sections/Section_04";
import SECTION_05 from "../components/sections/Section_05";

function Main() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="main-container" onMouseMove={handleMouseMove}>
      <Header />
      <SECTION_01 />
      <SECTION_02 />
      <SECTION_03 />
      <SECTION_04 />
      <SECTION_05 />
      <Cursor x={position.x} y={position.y} />
    </div>
  );
}

export default Main;
