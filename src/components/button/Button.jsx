import "./button.scss";
/**
 * @param {{
*  btnStyle: "primary" | "outlined" | "outlined-bottom" | "invert" | "toggle",
*  size: "free" | "extra-large" | "large" | "semi-large" | "medium" | "small" | "extra-small",
*  height: undefined | 48 | 42 | 40 | 32,
*  isRound: boolean,
*  selected: boolean
* } & HTMLButtonElement} params
*/

export default function Button({
 btnStyle = "primary",
 size = "medium",
 height,
 isRound = false,
 selected = false,
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
       btnStyle === "toggle" ? (selected ? "selected" : "") : "",
       className || "",
     ].join(" ")}
     onClick={onClick}
     {...props}>
     {children}
   </button>
 );
}
