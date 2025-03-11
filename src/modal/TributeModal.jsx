import React, { useState } from "react";
import Button from "../components/button/Button";
import Icon from "../components/icon/Icon";
import { useCredit, useSetCredit, useSetModal } from "../contexts/CreditContext";
import "./modal.scss";
import "./TributeModal.scss";

const TributeModal = ({ donationIdol }) => {
  const setModal = useSetModal();
  const setCredit = useSetCredit();
  const credit = useCredit();

  const [inputValue, setInputValue] = useState("");
  const [creditMessage, setCreditMessage] = useState("");
  const [inputBorderColor, setInputBorderColor] = useState("white"); // 입력 필드 테두리 색상 상태 추가
  const isButtonDisabled = isNaN(parseInt(inputValue)) || parseInt(inputValue) < 1;

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setCreditMessage("");
    setInputBorderColor("white"); // 입력 값이 변경되면 테두리 색상 초기화
  };

  const handleButtonClick = () => {
    const inputCredit = parseInt(inputValue);
    if (isNaN(inputCredit) || inputCredit < 1) {
      setCreditMessage("1 이상의 숫자를 입력해주세요.");
      setInputBorderColor("red"); // 입력 값이 유효하지 않으면 테두리 색상 변경
      return;
    }

    if (inputCredit > credit) {
      setCreditMessage("크레딧이 부족합니다.");
      setInputBorderColor("red"); // 크레딧 부족 시 테두리 색상 변경
      return;
    }

    // 크레딧 충분하면 후원 로직 처리
    setCredit(credit - inputCredit); // 크레딧 차감
    setCreditMessage("후원 완료!"); // 후원 완료 메시지 표시
    setInputBorderColor("white"); // 후원 완료 시 테두리 색상 초기화
    //setTimeout(() => setModal(null), 1500); // 1.5초 후 모달 닫기
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
            src={donationIdol.imageUrl}
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
