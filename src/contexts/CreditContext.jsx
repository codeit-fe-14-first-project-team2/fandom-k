import { createContext, useContext, useEffect, useState } from "react";
import Loader from "../components/Loader";

/**
 * 크레딧, 크레딧 관련 모달 및 로더를 제어하는 Context API입니다.
 */
export const CreditContext = createContext();

export default function CreditContextProvider({ children }) {
  const [credit, setCredit] = useState(0);
  const [modal, setModal] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("credit");
    if (data) setCredit(Number(data));
    else {
      console.log("크레딧 정보를 불러올 수 없습니다. 새로 세팅합니다.");
      localStorage.setItem("credit", 0);
      setCredit(0);
    }
  }, []);

  return (
    <CreditContext.Provider value={{ credit, setCredit, setModal, setLoading }}>
      {children}
      {loading && <Loader />}
      {modal}
    </CreditContext.Provider>
  );
}

export function useCredit() {
  const { credit } = useContext(CreditContext);
  return credit;
}

export function useSetCredit() {
  const { setCredit } = useContext(CreditContext);
  function handleChangeCredit(value = 0) {
    setCredit(value);
    localStorage.setItem("credit", value);
  }
  return handleChangeCredit;
}

export function useSetModal() {
  const { setModal } = useContext(CreditContext);
  return setModal;
}
