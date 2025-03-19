import Button from "../../../components/button/Button";
import Icon from "../../../components/icon/Icon";
//import { getDonations } from "../../../api/donations";
import { useEffect, useState } from "react";
import TributeMockData from "./TributeMockData.json";
import { useSetModal } from "../../../contexts/GlobalContext";
import TributeModal from "../../../modal/TributeModal";
import "./TributeContainer.scss";

export default function TributeContainer() {
  const [donations, setDonations] = useState([]);
  const setModal = useSetModal();
  //async function fetchDonations() {
  //try {
  //const data = await getDonations();
  //setDonations(data.list); // 받아온 데이터를 상태에 저장
  //} catch (err) {
  // console.error("후원 목록 조회 중 오류 발생:", err);
  //}
  //}

  // 컴포넌트 마운트 시 실행
  useEffect(() => {
    setDonations(TributeMockData);
  }, []);

  return (
    <div className="my-50">
      <div className="display-grid justify-stretch my-100 text-24">
        후원을 기다리는 조공
      </div>
      <div className="display-flex justify-center">
        {
          <div>
            <Button size="extra-small" className="invert my-100 " id="btn-left">
              <div>
                <Icon iconNm="chevron" />
              </div>
            </Button>
          </div>
        }
        <div>
          <ul className="display-flex justify-center" id="tribute-box">
            {donations.map((donation) => (
              <div id="tribute-list">
                <li key={donation.id} className="donation-item">
                  <img
                    src={donation.imageUrl}
                    alt={donation.title}
                    id="tribute-idol-image"
                  />

                  <Button
                    size="extra-small"
                    id="btn-donation"
                    onClick={() =>
                      setModal(<TributeModal donationIdol={donation} />)
                    }
                  >
                    {"후원하기"}
                  </Button>

                  <div className="my-20">
                    <div className="text-14 text-gray">{donation.title}</div>
                    <div id="donation-subtitle">{donation.subtitle}</div>
                  </div>
                </li>
              </div>
            ))}
          </ul>
        </div>
        {
          <div>
            <Button
              size="extra-small"
              className="invert my-100 mx-50"
              id="btn-right"
            >
              <div>
                <Icon iconNm="chevron" className="icon-rotate-180" />
              </div>
            </Button>
          </div>
        }
      </div>
    </div>
  );
}
