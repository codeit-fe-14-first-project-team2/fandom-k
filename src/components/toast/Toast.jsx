import { useEffect, useState } from "react";
import "./toast.scss";

export default function Toast({ message, onClose }) {
	const [close, setClose] = useState(false);
	useEffect(() => {
		const timeoutId1 = setTimeout(() => setClose(true), 2 * 1000);
		const timeoutId2 = setTimeout(() => onClose(), 2.5 * 1000);
		return () => {
			clearTimeout(timeoutId1);
			clearTimeout(timeoutId2);
		};
	}, []);
	return (
		<div className="toast-wrapper display-flex justify-center align-lower">
			<span className={`toast ${close ? "close" : ""} text-18 text-semibold`}>{message}</span>
		</div>
	);
}
