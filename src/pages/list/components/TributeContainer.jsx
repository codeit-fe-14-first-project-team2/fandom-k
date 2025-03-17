import { useEffect, useState } from "react";
import { getDonations } from "../../../api/donations";
import Icon from "../../../components/icon/Icon";
import Loading from "../../../util/Loading"; // 로딩 컴포넌트 추가
import "./TributeContainer.scss";
import TributeListItem from "./TributeListItem";

export default function TributeContainer() {
  const [donations, setDonations] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  const itemsPerPage = 4;

  async function fetchDonations() {
    setIsLoading(true); // 데이터 가져오기 전 로딩 시작
    try {
      const data = await getDonations();
      setDonations(data.list);
    } catch (err) {
      console.error("후원 목록 조회 중 오류 발생:", err);
    } finally {
      setIsLoading(false); // 데이터 가져온 후 로딩 종료
    }
  }

  useEffect(() => {
    fetchDonations();
  }, []);

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

  return (
    <section
      className="display-grid justify-stretch gap-32"
      id="tribute-container"
    >
      <h2 className="text-24">후원을 기다리는 조공</h2>

      {isLoading ? (
        // 로딩 중일 때는 로딩 컴포넌트를 표시
        <div className="loading-container">
          <Loading />
        </div>
      ) : (
        // 데이터가 로드되면 정상적인 리스트 표시
        <div
          className="display-flex justify-left align-center"
          id="tribute-list"
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
                <TributeListItem key={donation.id} {...donation} />
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
