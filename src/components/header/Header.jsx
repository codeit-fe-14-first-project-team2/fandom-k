import { Link } from "react-router-dom";
import Logo from "../../assets/img/logo.svg";
import Profile from "../../assets/img/profile_temp.svg";
import "./header.scss";

export default function Header() {
	return (
		<header className="display-flex justify-sides align-center">
			<div />
			<a href="/list" id="logo">
				<img src={Logo} alt="상단 로고 이미지" />
			</a>
			<Link to="/mypage" id="profile">
				<div className="img-wrapper radius-circle">
					<img src={Profile} alt="상단 프로필 이미지" />
				</div>
			</Link>
		</header>
	);
}
