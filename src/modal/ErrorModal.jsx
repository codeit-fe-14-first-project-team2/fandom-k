import Button from "../components/button/Button";
import Icon from "../components/icon/Icon";
import { useSetModal } from "../contexts/GlobalContext";
import "./modal.scss";

export default function ErrorModal({ message }) {
  const setModal = useSetModal();
  return (
    <div className="modal-wrapper display-flex justify-center align-center">
      <section
        id="error-modal"
        className="display-grid gap-8 surface-secondary radius-8 pt-24 pr-20 pb-32 pl-20"
      >
        <div className="display-flex justify-right">
          <button onClick={() => setModal()}>
            <Icon iconNm="close" size={24} alt="크레딧 충전하기 모달 닫기 아이콘" />
          </button>
        </div>
        <div className="display-grid justify-center gap-32">
          {message ? (
            <>
              <div id="error-image" />
              <div className="text-16 text-medium">
                <p>
                  {message}
                  <br />
                  잠시 후 다시 시도해주세요.
                </p>
              </div>
            </>
          ) : (
            <>
              <div id="error-image" className="credit" />
              <div className="text-16 text-medium">
                앗! 투표하기 위한 <span className="text-brand-orange">크레딧</span>이 부족해요
              </div>
            </>
          )}
          <Button onClick={() => setModal()}>확인</Button>
        </div>
      </section>
    </div>
  );
}
