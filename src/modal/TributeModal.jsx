import React, { useState } from "react";
import Button from "../components/button/Button";
import Icon from "../components/icon/Icon";
import {
  useCredit,
  useSetCredit,
  useSetModal,
} from "../contexts/GlobalContext";
import "./modal.scss";
import "./TributeModal.scss";
import { contributeDonation } from "../api/donations";

const TributeModal = ({ donationIdol }) => {
  const setModal = useSetModal();
  const setCredit = useSetCredit();
  const credit = useCredit();

  const [inputValue, setInputValue] = useState("");
  const [creditMessage, setCreditMessage] = useState("");
  const [inputBorderColor, setInputBorderColor] = useState("white");
  const isButtonDisabled =
    isNaN(parseInt(inputValue)) || parseInt(inputValue) < 1;

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setCreditMessage("");
    setInputBorderColor("white");
  };

  const handleButtonClick = async () => {
    const inputCredit = parseInt(inputValue);

    if (isNaN(inputCredit) || inputCredit < 1) {
      setCreditMessage("1 이상의 숫자를 입력해주세요.");
      setInputBorderColor("red");
      return;
    }

    if (inputCredit > credit) {
      setCreditMessage("크레딧이 부족합니다.");
      setInputBorderColor("red");
      return;
    }

    console.log("보내는 후원 데이터:", {
      idolId: donationIdol.id,
      credit: inputCredit,
    });

    try {
      const updatedDonation = await contributeDonation(
        donationIdol.id,
        inputCredit
      );
      console.log("후원 완료:", updatedDonation);

      setCredit(credit - inputCredit);
      setCreditMessage("후원 완료!");
      setInputBorderColor("white");
      //setTimeout(() => setModal(null), 1500);
    } catch (error) {
      console.error("후원 실패:", error);
      setCreditMessage("후원에 실패했습니다. 다시 시도해주세요.");
      setInputBorderColor("red");
    }
  };
  return (
    <div className="modal-wrapper display-flex justify-center align-center">
      <section
        id="tribute-modal"
        className="display-grid jutify-stretch gap-20 surface-secondary radius-8 px-16 py-24"
      >
        <div className="display-flex justify-sides align-center">
          <h3 className="text-secondary text-18 text-medium">후원 하기</h3>
          <button onClick={() => setModal(null)}>
            <Icon iconNm="close" size={24} alt="모달 닫기 아이콘" />
          </button>
        </div>
        <div className="display-flex justify-center">
          <img
            src={donationIdol.idol.profilePicture}
            alt={donationIdol.title}
            style={{
              position: "relative",
              width: "200px",
              height: "200px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
        </div>

        <div
          className="display-flex justify-center my-10"
          style={{
            flexDirection: "column",
          }}
        >
          <div style={{ position: "relative", bottom: "15px", left: "20px" }}>
            <div className="text-14 text-gray">{donationIdol.subtitle}</div>
            <div>{donationIdol.title}</div>
          </div>
          <input
            type="number"
            placeholder="크레딧 입력"
            className="border rounded-md px-3 py-2 text-center text-sm w-full mt-2 text-gray-600 placeholder-gray-500 my-10 number-input"
            value={inputValue}
            onChange={handleInputChange}
            style={{
              "--border-color": inputBorderColor,
            }}
          />
          {creditMessage && (
            <div
              style={{
                color: creditMessage === "후원 완료!" ? "gray" : "red",
                textAlign: "center",
                marginTop: "5px",
              }}
            >
              {creditMessage}
            </div>
          )}
        </div>
        <Button
          size="free"
          disabled={isButtonDisabled}
          style={{ backgroundColor: isButtonDisabled ? "gray" : null }}
          onClick={handleButtonClick}
        >
          후원하기
        </Button>
      </section>
    </div>
  );
};

export default TributeModal;
