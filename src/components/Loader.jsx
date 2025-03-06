import Credit from "../assets/img/credit.svg";
import "./loader.scss";

export default function Loader() {
  return (
    <div className="loader-wrapper display-flex justify-center align-center">
      <img src={Credit} className="loader" alt="로딩 이미지 1" />
      <img src={Credit} className="loader" alt="로딩 이미지 2" />
      <img src={Credit} className="loader" alt="로딩 이미지 3" />
      <img src={Credit} className="loader" alt="로딩 이미지 4" />
      <img src={Credit} className="loader" alt="로딩 이미지 5" />
    </div>
  );
}
