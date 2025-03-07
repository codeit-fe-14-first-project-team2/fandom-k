import IdolProfile from "../../../components/IdolProfile";

export default function IdolListItem({ id, rank, group, name, totalVotes, profilePicture }) {
  return (
    <li className="display-flex justify-sides align-center">
      <div className="display-flex justify-sides align-center gap-12">
        <IdolProfile profilePicture={profilePicture} name={name} id={id} size="small" />
        <span className="text-regular text-16 text-brand-orange">{rank}</span>
        <span className="text-medium text-16">
          {group} {name}
        </span>
      </div>

      <span className="text-regular text-16 text-invert-60">{totalVotes.toLocaleString()}표</span>
    </li>
  );
}
