import { useEffect, useState } from "react";
import Button from "../../../components/button/Button";
import Icon from "../../../components/icon/Icon";
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
    <section id="chart-container" className="display-grid justify-stretch mt-30 mb-100">
      <div className="display-flex justify-sides align-center">
        <h2 id="chart-title">이달의 차트</h2>
        <Button
          size="extra-small"
          onClick={() =>
            setModal(<VoteModal selectedTab={selectedTab} onVoteSuccess={setCursor} />)
          }
        >
          <Icon iconNm="chart" size={24} />
          차트 투표하기
        </Button>
      </div>
      <article id="chart-box" className="display-grid">
        <div className="display-grid direction-column">
          <Button
            size="free"
            btnStyle={selectedTab === "female" ? "outlined-bottom" : "invert"}
            onClick={() => {
              setSelectedTab("female");
              setCursor([0]);
            }}
            className="text-regular line-height-18 letter-spacing-small"
          >
            이달의 여자 아이돌
          </Button>
          <Button
            size="free"
            btnStyle={selectedTab === "male" ? "outlined-bottom" : "invert"}
            onClick={() => {
              setSelectedTab("male");
              setCursor([0]);
            }}
            className="text-regular line-height-18 letter-spacing-small"
          >
            이달의 남자 아이돌
          </Button>
        </div>

        {!(chart?.idols?.length > 0) ? (
          <div id="loading-container" className="display-flex justify-center align-center">
            <div id="spinner"></div>
          </div>
        ) : (
          <div id="chart-list" className="display-grid">
            {chart?.idols?.map((idol) => (
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

        {!loading && (
          <div className="display-flex justify-center mt-28">
            <Button
              disabled={chart?.nextCursor === null}
              btnStyle="outlined"
              size="semi-large"
              onClick={() => setCursor([chart.nextCursor, ...cursor])}
            >
              더 보기
            </Button>
          </div>
        )}
      </article>
    </section>
  );
}
