import "./Section_05.scss";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function SECTION_05() {
  useGSAP(() => {});

  return (
    <section id="contect" className="section section-05">
      <div className="contents">
        <div className="item">
          <p className="title">MICHI</p>
          <div className="tags">
            <span className="tag"></span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SECTION_05;
