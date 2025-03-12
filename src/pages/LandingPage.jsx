import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/img/logo.svg";
import Home1 from "../assets/img/landing-page-web-01-home.png";
import Home2 from "../assets/img/landing-page-web-02-home.png";
import Home3 from "../assets/img/landing-page-web-03-home.png";
import Button from "../components/button/Button";
import { useSetCredit } from "../contexts/GlobalContext";
import "./landingpage.scss";

export default function LandingPage() {
  const navigate = useNavigate();
  const setCredit = useSetCredit();

  function handleBtnClick() {
    setCredit(); // localStorage 초기화
    navigate("/list");
  }

  return (
    <main className="display-grid justify-stretch" id="landing-page">
      <section id="hero" className="display-grid justify-stretch gap-20 py-140">
        <h1 className="text-26">
          내가 좋아하는 아이돌을
          <br />
          가장 <span className="text-brand-orange">쉽게</span> 덕질 하는 방법
        </h1>
        <div className="display-flex justify-sides align-center direction-column">
          <Link to="/list">
            <img src={Logo} alt="로고 이미지" id="logo" />
          </Link>
          <Button size="large" onClick={handleBtnClick}>
            시작하기
          </Button>
        </div>
      </section>
      <section id="feature-1" className="display-grid justify-center align-upper gap-60 py-160">
        <div className="display-grid gap-8">
          <h2 className="text-16 text-medium text-yellow">후원하기</h2>
          <p className="text-24 text-bold">
            좋아하는 아이돌에게
            <br />
            쉽게 조공해 보세요
          </p>
        </div>
        <img src={Home1} className="feature-img" alt="후원하기 기능 예시 이미지" />
      </section>
      <section id="feature-2" className="display-grid justify-center align-upper gap-60 py-160">
        <div className="display-grid gap-8">
          <h2 className="text-16 text-medium text-yellow">이달의 아티스트</h2>
          <p className="text-24 text-bold">
            내 아티스트에게 1등의
            <br />
            영예를 선물하세요
          </p>
        </div>
        <img src={Home2} className="feature-img" alt="이달의 아티스트 기능 예시 이미지" />
      </section>
      <section id="feature-3" className="display-grid justify-center align-upper gap-60 py-160">
        <div className="display-grid gap-8">
          <h2 className="text-16 text-medium text-yellow">나만의 아티스트</h2>
          <p className="text-24 text-bold">
            좋아하는 아티스트들의
            <br />
            소식을 모아보세요
          </p>
        </div>
        <img src={Home3} className="feature-img" alt="나만의 아티스트 기능 예시 이미지" />
      </section>
      <div className="gradient" />
    </main>
  );
}
