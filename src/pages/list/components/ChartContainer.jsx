import { useEffect, useState } from "react";
import Button from "../../../components/button/Button";
import Icon from "../../../components/icon/Icon";
import { getChart } from "../../../api/charts";
import VoteModal from "../../../modal/VoteModal";
import { useSetModal } from "../../../contexts/GlobalContext";
import { useSetLoading } from "../../../contexts/GlobalContext";
import useViewPortSize from "../../../hooks/useViewportSize";
import useAsync from "../../../hooks/useAsync";
import ChartTab from "./ChartTab";
import ChartItem from "./ChartItem";
import "./ChartContainer.scss";

export default function ChartContainer() {
  const setModal = useSetModal();
  const setLoading = useSetLoading();
  const { viewportSize } = useViewPortSize();
  const [pageSize, setPageSize] = useState(viewportSize === "desktop" ? 10 : 5);
  const [selectedTab, setSelectedTab] = useState("female");
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

  useEffect(() => {
    if (loading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [chart]);

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
        <ChartTab selectedTab={selectedTab} setSelectedTab={setSelectedTab} setCursor={setCursor} />
        <div id="chart-list" className="display-grid">
          {chart?.idols?.map((idol) => (
            <ChartItem key={idol.id} type="chart" {...idol} />
          ))}
        </div>

        {chart?.idols.length > 0 && (
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
