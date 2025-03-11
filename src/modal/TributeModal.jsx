import React from "react";
import { useState } from "react";
import Button from "../components/button/Button";
import Icon from "../components/icon/Icon";
import {
  useCredit,
  useSetCredit,
  useSetModal,
} from "../contexts/CreditContext";
import ErrorModal from "./ErrorModal";
import "./modal.scss";

const TributeModal = ({ donationIdol }) => {
  const setModal = useSetModal();
  const setCredit = useSetCredit();
  const credit = useCredit();

  console.log(donationIdol.subtitle);

  return (
    <div className="modal-wrapper display-flex justify-center align-center">
      <section
        id="tribute-modal"
        className="display-grid gap-20 surface-secondary radius-8 px-16 py-24"
      >
        <div className="display-flex justify-sides align-center">
          <h3 className="text-secondary text-18 text-medium">후원 하기</h3>
          <button onClick={() => setModal(null)}>
            <Icon iconNm="close" size={24} alt="모달 닫기 아이콘" />
          </button>
        </div>
        <div>
          <img
            src={donationIdol.imageUrl}
            alt={donationIdol.title}
            style={{
              width: "200px",
              height: "200px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
        </div>
        <div>
          {/* 모달 내용 추가 */}
          <Button size="extra-small">{"후원하기"}</Button>
        </div>
      </section>
    </div>
  );
};

export default TributeModal;
