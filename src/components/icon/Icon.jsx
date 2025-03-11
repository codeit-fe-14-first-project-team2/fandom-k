
import Close from "../../assets/btn/btn_delete_24px.svg";
import ButtonLeft from "../../assets/btn/btn_pagination_arrow_left.svg";
import ButtonRight from "../../assets/btn/btn_pagination_arrow_right.svg";
import Chevron from "../../assets/icon/ic_arrow_left.svg";
import Chart from "../../assets/icon/ic_chart.svg";
import Check from "../../assets/icon/ic_check.svg";
import Delete from "../../assets/icon/ic_delete.svg";
import Plus from "../../assets/icon/ic_plus_24px.svg";
import "./icon.scss";

/**
 * @param {{
 *  iconNm: "button-left" | "button-right" | "chart" | "check" | "chevron" | "close" | "credit" | "credit-white" | "delete" | "plus",
 *  size: number,
 *  rotate: 0 | 90 | 180 | 270,
 * }} param
 */
export default function Icon({
  iconNm = "close",
  size = 16,
  rotate = 0,
  className = "",
  ...props
}) {
  const ICONS = {
    "button-left": ButtonLeft,
    "button-right": ButtonRight,
    chart: Chart,
    check: Check,
    chevron: Chevron,
    close: Close,
    delete: Delete,
    plus: Plus,
  };

  return iconNm.startsWith("credit") ? (
    <div className={`icon-${iconNm} icon-${size} icon-rotate-${rotate} ${className}`} {...props} />
  ) : (
    <img
      src={ICONS[iconNm]}
      className={`icon-${iconNm} icon-${size} icon-rotate-${rotate} ${className}`}
      alt="아이콘 이미지"
      {...props}
    />
  );
}
