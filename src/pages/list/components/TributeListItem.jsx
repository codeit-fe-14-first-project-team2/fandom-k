import Button from "../../../components/button/Button";
import Icon from "../../../components/icon/Icon";
import {
  formatDonations,
  formatTimeBefore,
  getDonationProgress,
} from "../../../util/donation";
import { useSetModal } from "../../../contexts/GlobalContext";
import TributeModal from "../../../modal/TributeModal";
export default function TributeListItem(donation) {
  const { title, idol, receivedDonations, targetDonation, subtitle, deadline } =
    donation;
  const setModal = useSetModal();

  return (
    <li className="donation-item display-grid gap-12">
      <div className="img-wrapper radius-8">
        <div className="gradient" />
        <img src={idol?.profilePicture} alt={`${title} 대표 이미지`} />
        <Button
          size="extra-small"
          id="btn-donation"
          onClick={() => setModal(<TributeModal donationIdol={donation} />)}
        >
          후원하기
        </Button>
      </div>
      <div
        className="donation-item-info display-grid gap-24"
        style={{
          "--p": getDonationProgress(receivedDonations, targetDonation),
        }}
      >
        <div className="donation-item-title display-grid gap-8">
          <div className="text-16 text-gray">{subtitle}</div>
          <div className="text-18 text-medium">{title}</div>
        </div>
        <div className="donation-item-graph display-flex justify-sides align-upper">
          <div className="display-flex align-center gap-2 text-brand-orange">
            <Icon iconNm="credit" size={12} />
            {formatDonations(receivedDonations)}
          </div>
          <span>{formatTimeBefore(deadline)}</span>
        </div>
        <div className="graph-line" />
      </div>
    </li>
  );
}
