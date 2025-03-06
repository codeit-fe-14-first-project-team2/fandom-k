import { useNavigate } from "react-router-dom";
import Logo from "../assets/img/logo.svg";
import Button from "../components/Button";
import { useSetCredit } from "../contexts/CreditContext";
import "./landingpage.scss";

export default function LandingPage() {
  const navigate = useNavigate();
  const setCredit = useSetCredit();

  function handleBtnClick() {
    setCredit(0);
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
          <img src={Logo} alt="로고 이미지" />
          <Button size="large" onClick={handleBtnClick}>
            시작하기
          </Button>
        </div>
      </section>
      <section id="feature-1"></section>
      <section id="feature-2"></section>
      <section id="feature-3"></section>
    </main>
  );
}
