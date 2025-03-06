import { formatCredit } from "../../../util/credit";
import IconCredit from "../../../assets/img/credit.svg";
import { useSetModal } from "../../../contexts/CreditContext";
import ChargeModal from "../../../modal/ChargeModal";

export default function MyCredit({ credit = 0 }) {
  const setModal = useSetModal();
  return (
    <div className="display-flex justify-sides align-center border-default radius-8 px-64 py-36">
      <div className="display-grid gap-14">
        <span className="text-invert-60">내 크레딧</span>
        <div className="display-left align-center gap-4">
          <img src={IconCredit} alt="크레딧 아이콘 이미지" />
          <span className="text-bold text-24">{formatCredit(credit)}</span>
        </div>
      </div>
      <button className="text-brand-orange" onClick={() => setModal(<ChargeModal />)}>
        충전하기
      </button>
    </div>
  );
}
