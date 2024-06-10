import { Link } from "react-router-dom";
import "./Header.scss";

function Header() {
  return (
    <header className="header">
      <div className="logo">main title</div>
      <div className="menu">
        <Link className="item" to="">
          소개
        </Link>
        <Link className="item" to="">
          스택
        </Link>
        <Link className="item" to="">
          프로젝트
        </Link>
        <Link className="item" to="">
          교육
        </Link>
      </div>
    </header>
  );
}

export default Header;
