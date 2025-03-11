import { useEffect, useState } from "react";
import Button from "../../../components/button/Button";
import Chart from "../../../assets/icon/ic_chart.svg";
import IdolListItem from "./IdolListItem";
import { getChart } from "../../../api/charts";
import VoteModal from "../../../modal/VoteModal";
import { useSetModal } from "../../../contexts/CreditContext";

import "./ChartContainer.scss";

export default function ChartContainer() {
  const setModal = useSetModal();
  const [selectedTab, setSelectedTab] = useState("female");
  const [idolData, setIdolData] = useState([]);
  const [cursor, setCursor] = useState(0);

  async function handleLoad(options, reset = false) {
    try {
      const { idols, nextCursor } = await getChart(options);
      setIdolData((prevData) => {
        const updatedData = reset ? idols : [...prevData, ...idols];
        const sortedData = updatedData
          .sort((a, b) => b.totalVotes - a.totalVotes || a.group.localeCompare(b.name))
          .map((idol, index) => ({ ...idol, rank: index + 1 }));
        return sortedData;
      });
      setCursor(nextCursor);
    } catch (err) {
      console.log(err);
    }
  }

  function handleLoadMore() {
    handleLoad({ selectedTab, cursor, pageSize: 10 }, false);
  }

  useEffect(() => {
    setIdolData([]);
    setCursor(0);
    handleLoad({ selectedTab, cursor: 0, pageSize: 10 }, true);
  }, [selectedTab]);

  return (
    <div className="display-grid justify-stretch mt-30">
      <div id="chart-container" className="display-grid justify-stretch gap-24">
        <div className="display-flex justify-sides">
          <div id="chart-title" className="text-bold">
            이달의 차트
          </div>
          <Button
            size="extra-small"
            onClick={() =>
              setModal(
                <VoteModal
                  idolData={idolData}
                  selectedTab={selectedTab}
                  onVoteSuccess={handleLoad}
                />
              )
            }
          >
            <img src={Chart} alt="차트 이미지"></img>
            <span>차트 투표</span>
          </Button>
        </div>
        <div id="chart-tab" className="display-flex">
          <button
            className={`${
              selectedTab === "female" ? "active" : ""
            } text-regular line-height-18 letter-spacing-small`}
            onClick={() => setSelectedTab("female")}
          >
            이달의 여자 아이돌
          </button>
          <button
            className={`${
              selectedTab === "male" ? "active" : ""
            } text-regular line-height-18 letter-spacing-small`}
            onClick={() => {
              setSelectedTab("male");
            }}
          >
            이달의 남자 아이돌
          </button>
        </div>
        <ul className="display-flex">
          {idolData.map((idol) => (
            <IdolListItem
              key={idol.id}
              id={idol.id}
              rank={idol.rank}
              group={idol.group}
              name={idol.name}
              totalVotes={idol.totalVotes}
              profilePicture={idol.profilePicture}
            />
          ))}
        </ul>
      </div>
      {cursor !== null && (
        <div className="display-flex justify-center mt-50">
          <Button btnStyle="outlined" size="semi-large" onClick={handleLoadMore}>
            더 보기
          </Button>
        </div>
      )}
    </div>
  );
}
