import "./Main.scss";
import { useRef, useState } from "react";
import Cursor from "../components/common/Cursor";
import SECTION_01 from "../components/sections/Section_01";
import Header from "../components/layout/Header";
import SECTION_02 from "../components/sections/Section_02";
import SECTION_03 from "../components/sections/Section_03";
import SECTION_04 from "../components/sections/Section_04";
import SECTION_05 from "../components/sections/Section_05";

function Main() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const scrollRef = useRef([]);

  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="main-container" onMouseMove={handleMouseMove}>
      <Header scrollRef={scrollRef} />
      <SECTION_01 setRef={(e) => (scrollRef.current[0] = e)} />
      <SECTION_02 setRef={(e) => (scrollRef.current[1] = e)} />
      <SECTION_03 setRef={(e) => (scrollRef.current[2] = e)} />
      <SECTION_04 setRef={(e) => (scrollRef.current[3] = e)} />
      <SECTION_05 setRef={(e) => (scrollRef.current[4] = e)} />
      <Cursor x={position.x} y={position.y} />
    </div>
  );
}

export default Main;
