import { createContext, useContext, useEffect, useState } from "react";

export const CreditContext = createContext();

export default function CreditContextProvider({ children }) {
	const [credit, setCredit] = useState(0);

	useEffect(() => {
		const data = localStorage.getItem("credit");
		if (data) {
			try {
				setCredit(Number(data));
			} catch (e) {
				setCredit();
				console.log("크레딧 정보를 불러올 수 없습니다.", e);
				localStorage.clear();
			}
		}
	}, []);

	return <CreditContext.Provider value={{ credit, setCredit }}>{children}</CreditContext.Provider>;
}

export function useCredit() {
	const { credit } = useContext(CreditContext);
	return credit;
}

export function useSetCredit() {
	const { setCredit } = useContext(CreditContext);
	function handleChangeCredit(value) {
		setCredit(value);
		localStorage.setItem("credit", value);
	}
	return handleChangeCredit;
}
