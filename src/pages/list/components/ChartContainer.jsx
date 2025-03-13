import { useEffect, useState } from "react";
import Button from "../../../components/button/Button";
import Chart from "../../../assets/icon/ic_chart.svg";
import { getChart } from "../../../api/charts";
import IdolProfile from "../../../components/idolprofile/IdolProfile";
import VoteModal from "../../../modal/VoteModal";
import { useSetModal } from "../../../contexts/GlobalContext";
import useViewPortSize from "../../../hooks/useViewportSize";

import "./ChartContainer.scss";

export default function ChartContainer() {
  const setModal = useSetModal();
  const { viewportSize } = useViewPortSize();
  const [selectedTab, setSelectedTab] = useState("female");
  const [idolData, setIdolData] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(viewportSize === "desktop" ? 10 : 5);

  function IdolListItem({ id, rank, group, name, totalVotes, profilePicture }) {
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
  async function handleLoad(options, reset = false) {
    setLoading(true);
    try {
      const { idols, nextCursor } = await getChart(options);
      setIdolData((prevData) => {
        const updatedData = reset ? idols : [...prevData, ...idols];
        const sortedData = updatedData.map((idol, index) => ({ ...idol, rank: index + 1 }));
        return sortedData;
      });
      setCursor(nextCursor);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  function handleLoadMore() {
    handleLoad({ selectedTab, cursor, pageSize }, false);
  }

  useEffect(() => {
    if (viewportSize === "desktop") {
      setPageSize(10);
    } else {
      setPageSize(5);
    }
  }, [viewportSize]);

  useEffect(() => {
    setIdolData([]);
    setCursor(0);
    handleLoad({ selectedTab, cursor: 0, pageSize }, true);
  }, [selectedTab, viewportSize, pageSize]);

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
              setModal(<VoteModal selectedTab={selectedTab} onVoteSuccess={handleLoad} />)
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
        {loading ? (
          <div id="loading-container" className="display-flex justify-center align-center">
            <div id="spinner"></div>
          </div>
        ) : (
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
        )}
      </div>
      {!loading && (
        <div className="display-flex justify-center mt-50">
          <Button disabled={!cursor} btnStyle="outlined" size="semi-large" onClick={handleLoadMore}>
            더 보기
          </Button>
        </div>
      )}
    </div>
  );
}
