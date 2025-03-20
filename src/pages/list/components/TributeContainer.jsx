import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDonations } from "../../../api/donations";
import Button from "../../../components/button/Button";
import Icon from "../../../components/icon/Icon";
import Loader from "../../../components/loader/Loader";
import "./TributeContainer.scss";
import TributeListItem from "./TributeListItem";
import UseSwipeSlider from "./UseSwipeSlider";

export default function TributeContainer() {
  const [donations, setDonations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const itemsPerPage = 4;

  async function fetchDonations() {
    setIsLoading(true);
    try {
      const data = await getDonations();
      setDonations(data.list);
    } catch (err) {
      console.error("후원 목록 조회 중 오류 발생:", err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchDonations();

    const refreshInterval = setInterval(async () => {
      try {
        const data = await getDonations();
        setDonations(data.list);
      } catch (err) {
        console.error("갱신 오류:", err);
      }
    }, 30000);

    return () => clearInterval(refreshInterval);
  }, []);

  // 후원 성공 시 목록 갱신 함수
  const handleDonationSuccess = () => {
    fetchDonations();
  };

  const { currentIndex, nextSlide, prevSlide, swipeHandlers, canGoNext, canGoPrev } =
    UseSwipeSlider({
      totalItems: donations.length,
      itemsPerPage,
    });

  return (
    <section className="display-grid justify-stretch gap-32" id="tribute-container">
      <div className="display-flex justify-sides align-lower" id="tribute-header">
        <h2 className="text-24">후원을 기다리는 조공</h2>
        <Link to="/add_tribute">
          <Button size="extra-small">조공 생성하기</Button>
        </Link>
        <div className="toast-message">원하는 아이돌의 조공이 없다면 직접 생성해보세요!</div>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <div
          className="display-flex justify-left align-center"
          id="tribute-list"
          {...swipeHandlers}
        >
          <button id="btn-left" onClick={prevSlide} disabled={!canGoPrev} type="button">
            <Icon iconNm="button-left" size={40} />
          </button>
          <ul className="display-flex justify-stretch gap-24" id="tribute-box">
            {donations.slice(currentIndex, currentIndex + itemsPerPage).map((donation) => (
              <TributeListItem
                key={donation.id}
                {...donation}
                onDonationSuccess={handleDonationSuccess}
              />
            ))}
          </ul>
          <button id="btn-right" onClick={nextSlide} disabled={!canGoNext} type="button">
            <Icon iconNm="button-right" size={40} />
          </button>
        </div>
      )}
    </section>
  );
}
