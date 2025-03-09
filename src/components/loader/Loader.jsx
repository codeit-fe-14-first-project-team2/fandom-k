import Icon from "../icon/Icon";
import "./loader.scss";

export default function Loader() {
	return (
		<div className="loader-wrapper display-flex justify-center align-center">
			<Icon iconNm="credit" size={45} className="loader" alt="로딩 이미지 1" />
			<Icon iconNm="credit" size={45} className="loader" alt="로딩 이미지 2" />
			<Icon iconNm="credit" size={45} className="loader" alt="로딩 이미지 3" />
			<Icon iconNm="credit" size={45} className="loader" alt="로딩 이미지 4" />
			<Icon iconNm="credit" size={45} className="loader" alt="로딩 이미지 5" />
		</div>
	);
}
