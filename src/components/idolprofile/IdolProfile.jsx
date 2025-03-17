import Icon from "../icon/Icon";
import "./idolprofile.scss";

/**
 * @param {{
	profilePicture: string,
	name: string,
	id: number,
  size: "large" | "medium" | "small",
	selected: boolean,
	type: "profile" | "chart" | "vote" | "mypage",
	onSelect?: (id) => void,
}} params
 */
export default function IdolProfile({
  profilePicture,
  name = "",
  id,
  size = "medium",
  selected = false,
  type = "profile",
  className = "",
  onSelect,
  ...props
}) {
  function handleProfileClick() {
    onSelect && onSelect(id);
  }
  return (
    <div
      className={`idol-profile-wrapper ${type} ${size} ${className}`}
      onClick={handleProfileClick}
      {...props}
    >
      <div className="img-wrapper radius-circle">
        {selected && (
          <div className="selected-icon-wrapper display-flex justify-center align-center">
            <Icon iconNm="check" size={40} alt="아이돌 프로필 선택 아이콘" />
          </div>
        )}
        <img src={profilePicture} alt={`${name} 프로필 사진`} />
      </div>
    </div>
  );
}
