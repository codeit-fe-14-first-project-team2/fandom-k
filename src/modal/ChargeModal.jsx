import { useState } from "react";
import Button from "../components/Button";
import Icon from "../components/Icon";
import { useCredit, useSetCredit, useSetModal } from "../contexts/CreditContext";
import "./modal.scss";

export default function ChargeModal() {
  const currentCredit = useCredit();
  const setCredit = useSetCredit();
  const setModal = useSetModal();
  const [selected, setSelected] = useState(100);
  const CREDIT_LIST = [100, 500, 1000];

  function handleCharge() {
    setCredit(currentCredit + selected);
    setModal();
  }

  function CreditItem({ credit }) {
    const isChecked = credit === selected;
    return (
      <div
        className={`${
          isChecked ? "border-brand-orange" : "border-default"
        } display-flex justify-sides align-center radius-8 px-20 py-18`}
      >
        <div className="display-flex gap-4 text-20 text-bold">
          <Icon iconNm="credit" size={24} alt="크레딧 아이콘" />
          <span>{credit}</span>
        </div>
        <input
          type="radio"
          name="charge-credit"
          checked={isChecked}
          onChange={() => setSelected(credit)}
        />
      </div>
    );
  }

  return (
    <div className="modal-wrapper display-flex justify-center align-center">
      <section
        id="charge-modal"
        className="display-grid gap-24 surface-secondary radius-8 px-16 py-24"
      >
        <div className="display-flex justify-sides align-center">
          <h3 className="text-secondary text-18 text-semibold">크레딧 충전하기</h3>
          <button onClick={() => setModal()}>
            <Icon iconNm="close" size={24} alt="크레딧 충전하기 모달 닫기 아이콘" />
          </button>
        </div>
        <div className="display-grid justify-stretch gap-8">
          {CREDIT_LIST.map((credit) => (
            <CreditItem key={`credit-charge-${credit}`} credit={credit} />
          ))}
        </div>
        <Button onClick={handleCharge}>
          <Icon iconNm="credit-white" size={21} alt="충전하기 버튼 아이콘" />
          충전하기
        </Button>
      </section>
    </div>
  );
}
