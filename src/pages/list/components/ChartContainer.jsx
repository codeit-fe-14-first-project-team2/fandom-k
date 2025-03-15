import { useEffect, useState } from "react";
import Button from "../../../components/button/Button";
import Chart from "../../../assets/icon/ic_chart.svg";
import { getChart } from "../../../api/charts";
import VoteModal from "../../../modal/VoteModal";
import { useSetModal } from "../../../contexts/GlobalContext";
import useViewPortSize from "../../../hooks/useViewportSize";
import useAsync from "../../../hooks/useAsync";
import ChartItem from "./ChartItem";
import "./ChartContainer.scss";

export default function ChartContainer() {
  const [selectedTab, setSelectedTab] = useState("female");
  const setModal = useSetModal();
  const { viewportSize } = useViewPortSize();
  const [pageSize, setPageSize] = useState(viewportSize === "desktop" ? 10 : 5);
  const [cursor, setCursor] = useState([0]);
  const { loading, value: chart } = useAsync(
    () => getChart({ selectedTab, cursor: 0, pageSize: pageSize * cursor?.length }),
    [selectedTab, cursor]
  );

  useEffect(() => {
    if (viewportSize === "desktop") {
      setPageSize(10);
      setCursor([0]);
    } else {
      setPageSize(5);
      setCursor([0]);
    }
  }, [viewportSize]);

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
              setModal(<VoteModal selectedTab={selectedTab} onVoteSuccess={setCursor} />)
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
            onClick={() => {
              setSelectedTab("female");
              setCursor([0]);
            }}
          >
            이달의 여자 아이돌
          </button>
          <button
            className={`${
              selectedTab === "male" ? "active" : ""
            } text-regular line-height-18 letter-spacing-small`}
            onClick={() => {
              setSelectedTab("male");
              setCursor([0]);
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
          <div id="chart-wrapper" className="display-flex">
            {chart?.idols.map((idol) => (
              <ChartItem
                key={idol.id}
                id={idol.id}
                rank={idol.rank}
                group={idol.group}
                name={idol.name}
                totalVotes={idol.totalVotes}
                profilePicture={idol.profilePicture}
                type="chart"
              />
            ))}
          </div>
        )}
      </div>
      {!loading && (
        <div className="display-flex justify-center mt-50">
          <Button
            disabled={!cursor}
            btnStyle="outlined"
            size="semi-large"
            onClick={() => setCursor([chart.nextCursor, ...cursor])}
          >
            더 보기
          </Button>
        </div>
      )}
    </div>
  );
}
