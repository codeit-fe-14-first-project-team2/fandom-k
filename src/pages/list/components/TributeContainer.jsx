import { useEffect, useState } from "react";
import { getDonations } from "../../../api/donations";
import Icon from "../../../components/icon/Icon";
import Loader from "../../../components/loader/Loader";
import "./TributeContainer.scss";
import TributeListItem from "./TributeListItem";

export default function TributeContainer() {
  const [donations, setDonations] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

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
  }, []);

  // 후원 성공 시 목록 갱신
  const handleDonationSuccess = () => {
    fetchDonations();
  };

  const nextSlide = () => {
    if (currentIndex + itemsPerPage < donations.length) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const prevSlide = () => {
    if (currentIndex - itemsPerPage >= 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  // 터치 이벤트 핸들러
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStartX - touchEndX;
    if (swipeDistance > 50) {
      nextSlide();
    } else if (swipeDistance < -50) {
      prevSlide();
    }
  };

  return (
    <section
      className="display-grid justify-stretch gap-32"
      id="tribute-container"
    >
      <h2 className="text-24">후원을 기다리는 조공</h2>

      {isLoading ? (
        <div className="loading-container">
          <Loader />
        </div>
      ) : (
        <div
          className="display-flex justify-left align-center"
          id="tribute-list"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <button
            id="btn-left"
            onClick={prevSlide}
            disabled={currentIndex === 0}
          >
            <Icon iconNm="button-left" size={40} />
          </button>
          <ul className="display-flex justify-stretch gap-24" id="tribute-box">
            {donations
              .slice(currentIndex, currentIndex + itemsPerPage)
              .map((donation) => (
                <TributeListItem
                  key={donation.id}
                  {...donation}
                  onDonationSuccess={handleDonationSuccess}
                />
              ))}
          </ul>
          <button
            id="btn-right"
            onClick={nextSlide}
            disabled={currentIndex + itemsPerPage >= donations.length}
          >
            <Icon iconNm="button-right" size={40} />
          </button>
        </div>
      )}
    </section>
  );
}
