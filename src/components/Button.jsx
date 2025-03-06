/**
 * @param {{
 *  btnStyle: "primary" | "outlined" | "outlined-bottom" | "invert",
 *  size: "free" | "large" | "semi-large" | "middle" | "small" | "extra-small",
 *  isRound: boolean
 * }} params
 */
export default function Button({
  btnStyle = "primary",
  size = "middle",
  isRound = false,
  onClick,
  children,
  ...props
}) {
  return (
    <button
      className={[btnStyle, size, isRound ? "round" : ""].join(" ")}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
