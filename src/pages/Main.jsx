import "./Main.scss";
import SECTION_01 from "../components/sections/Section_01";
import Header from "../components/layout/Header";

function Main() {
  return (
    <div className="main-container">
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
