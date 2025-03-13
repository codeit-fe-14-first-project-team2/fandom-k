import Button from "../../../components/button/Button";
import Icon from "../../../components/icon/Icon";
//import { getDonations } from "../../../api/donations";
import { useEffect, useState } from "react";
import TributeMockData from "./TributeMockData.json";
import { useSetModal } from "../../../contexts/CreditContext";
import TributeModal from "../../../modal/TributeModal";
import "./TributeContainer.scss";
import {
  getDonations,
  contributeDonation,
  createDonation,
  updateDonation,
  deleteIdol,
} from "../../../api/donations";

export default function TributeContainer() {
  const [donations, setDonations] = useState([]);
  const setModal = useSetModal();

  useEffect(() => {
    async function fetchDonations() {
      try {
        const data = await getDonations();
        setDonations(data.list); // 수정된 부분
      } catch (error) {
        console.error("후원 목록을 가져오는 중 오류 발생:", error);
      }
    }

    fetchDonations();
  }, []);

  useEffect(() => {
    console.dir(donations);
  }, [donations]);

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
                    src={donation.idol.profilePicture}
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
