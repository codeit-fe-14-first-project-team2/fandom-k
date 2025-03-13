import { useEffect, useState } from "react";
import { getDonations } from "../../../api/donations";
import Icon from "../../../components/icon/Icon";
import "./TributeContainer.scss";
import TributeListItem from "./TributeListItem";

export default function TributeContainer() {
  const [donations, setDonations] = useState([]);

  async function fetchDonations() {
    try {
      const data = await getDonations();
      setDonations(data.list);
    } catch (err) {
      console.error("후원 목록 조회 중 오류 발생:", err);
    }
  }

  useEffect(() => {
    fetchDonations();
  }, []);

  return (
    <section
      className="display-grid justify-stretch gap-32"
      id="tribute-container"
    >
      <h2 className="text-24">후원을 기다리는 조공</h2>
      <div className="display-flex justify-left align-center" id="tribute-list">
        <button id="btn-left">
          <Icon iconNm="button-left" size={40} />
        </button>
        <ul className="display-flex justify-stretch gap-24" id="tribute-box">
          {donations.map((donation) => (
            <TributeListItem key={donation.id} {...donation} />
          ))}
        </ul>
        <button id="btn-right">
          <Icon iconNm="button-right" size={40} />
        </button>
      </div>
    </section>
  );
}
