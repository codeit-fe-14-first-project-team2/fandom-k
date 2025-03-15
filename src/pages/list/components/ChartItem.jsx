import IdolProfile from "../../../components/idolprofile/IdolProfile";
import "./ChartItem.scss";

export default function ChartItem({
  id,
  rank,
  group,
  name,
  totalVotes,
  profilePicture,
  type,
  lastItemRef,
  onSelect,
  selectedId,
}) {
  const isSelectable = type === "vote";
  function handleItemClick() {
    onSelect && onSelect(id);
  }
  return (
    <div
      id={type}
      className="display-flex justify-sides align-center item-wrapper"
      ref={lastItemRef}
    >
      <div className="display-flex justify-sides align-center gap-12">
        <IdolProfile
          profilePicture={profilePicture}
          name={name}
          id={id}
          size={isSelectable ? "medium" : "small"}
          selected={id === selectedId}
          type={type}
        />
        <span className={`text-regular ${isSelectable ? "text-14" : "text-16"} text-brand-orange`}>
          {rank}
        </span>
        <div className="display-flex direction-column">
          <span className={`text-medium ${isSelectable ? "text-14" : "text-16"}`}>
            {group} {name}
          </span>
          {isSelectable ? (
            <span className="text-regular text-14 text-invert-60">
              {totalVotes.toLocaleString()}표
            </span>
          ) : null}
        </div>
      </div>
      {!isSelectable && (
        <span className="text-regular text-16 text-invert-60">{totalVotes.toLocaleString()}표</span>
      )}
      {isSelectable && (
        <input
          type="radio"
          checked={selectedId === id}
          onChange={(e) => {
            e.stopPropagation();
            handleItemClick();
          }}
        />
      )}
    </div>
  );
}
