import "./button.scss";
/**
 * @param {{
 *  btnStyle: "primary" | "outlined" | "outlined-bottom" | "invert",
 *  size: "free" | "extra-large" | "large" | "semi-large" | "medium" | "small" | "extra-small",
 *  height: undefined | 48 | 42 | 40 | 32
 *  isRound: boolean
 * }} params
 */
export default function Button({
	btnStyle = "primary",
	size = "medium",
	height,
	isRound = false,
	onClick,
	className,
	children,
	...props
}) {
	return (
		<button
			className={[
				btnStyle,
				size,
				isRound ? "round" : "",
				height ? `height-${height}` : "",
				className || "",
			].join(" ")}
			onClick={onClick}
			{...props}>
			{children}
		</button>
	);
}
