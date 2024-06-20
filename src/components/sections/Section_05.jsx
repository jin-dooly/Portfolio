import "./Section_05.scss";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { ReactComponent as Bubble } from "../../assets/images/bubble/bubble_single_1.svg";

gsap.registerPlugin(ScrollTrigger);

function SECTION_05({ setRef }) {
  useGSAP(() => {
    gsap.from("#contact .box", {
      top: "100%",
      scrollTrigger: {
        trigger: "#contact",
        toggleActions: "play reverse play reverse",
      },
    });
  });

  return (
    <section id="contact" ref={setRef} className="section section-05">
      <div className="box">
        <p>감사합니다!</p>
        <div>
          <div className="inner-box">
            <Bubble />
            <p>phone: 010-7744-0745</p>
          </div>
          <div className="inner-box">
            <Bubble />
            <p>email: jj074567@gmail.com</p>
          </div>
          <div className="inner-box">
            <Bubble />
            <p>
              github:{" "}
              <a href="https://github.com/jin-dooly" target="_blank" rel="noreferrer">
                https://github.com/jin-dooly
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SECTION_05;
