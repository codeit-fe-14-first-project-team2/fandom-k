import { useEffect, useState, useRef } from "react";
import Button from "../components/button/Button";
import Icon from "../components/icon/Icon";
import { useCredit, useSetCredit, useSetModal } from "../contexts/GlobalContext";
import { createVote } from "../api/votes";
import { getChart } from "../api/charts";
import ErrorModal from "./ErrorModal";
import ChartItem from "../pages/list/components/ChartItem";
import "./modal.scss";

export default function VoteModal({ selectedTab, onVoteSuccess }) {
  const currentCredit = useCredit();
  const setCredit = useSetCredit();
  const setModal = useSetModal();
  const [selectedId, setSelectedId] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [idolData, setIdolData] = useState([]);
  const [cursor, setCursor] = useState(0);
  const isFirstRender = useRef(true);
  const observerRef = useRef(null);
  const lastItemRef = useRef(null);

  async function handleLoad(options) {
    try {
      const { idols, nextCursor } = await getChart(options);
      setIdolData((prevData) => {
        const updatedData = [...prevData, ...idols];
        const sortedData = updatedData.map((idol, index) => ({ ...idol, rank: index + 1 }));
        return sortedData;
      });
      setCursor(nextCursor);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleVote() {
    if (currentCredit < 1000) {
      setErrorMessage("");
      return;
    }
    try {
      const response = await createVote({ idolId: selectedId });
      if (response) {
        setCredit((prev) => prev - 1000);
        onVoteSuccess([0]);
        setModal();
      }
    } catch (error) {
      console.error("투표 처리 중 오류가 발생했습니다.", error.message);
    }
  }

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    handleLoad({ selectedTab, cursor: 0, pageSize: 6 });
  }, []);

  useEffect(() => {
    if (!lastItemRef.current) return;
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && cursor) {
          handleLoad({ selectedTab, cursor, pageSize: 10 });
        }
      },
      {
        root: document.querySelector("#vote-modal .list-wrapper"),
        threshold: 0,
        rootMargin: "350px",
      }
    );
    observerRef.current.observe(lastItemRef.current);
    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [cursor]);

  return (
    <div className="modal-wrapper display-flex justify-center align-center">
      <section
        id="vote-modal"
        className="display-grid gap-20 surface-secondary radius-8 px-16 py-24"
      >
        <div className="display-flex justify-sides align-center">
          <h3 className="text-secondary text-18 text-medium">
            {selectedTab === "female" ? "이달의 여자 아이돌" : "이달의 남자 아이돌"}
          </h3>
          <button onClick={() => setModal()}>
            <Icon iconNm="close" size={24} alt="크레딧 충전하기 모달 닫기 아이콘" />
          </button>
        </div>
        <div className="display-grid justify-stretch list-wrapper">
          {idolData.map((idol, index) => {
            const isLastItem = index === idolData.length - 1;
            return (
              <ChartItem
                key={idol.id}
                id={idol.id}
                rank={idol.rank}
                group={idol.group}
                name={idol.name}
                totalVotes={idol.totalVotes}
                profilePicture={idol.profilePicture}
                lastItemRef={isLastItem ? lastItemRef : null}
                selectedId={selectedId}
                onSelect={setSelectedId}
                type="vote"
              />
            );
          })}
        </div>
        <Button size="large" onClick={handleVote} disabled={!selectedId}>
          <Icon iconNm="credit-white" size={13} aria-label="투표하기 버튼 아이콘" />
          투표하기
        </Button>
        <div className="display-flex justify-center text-medium text-12 line-height-26">
          투표하는데<span className="text-brand-orange ml-2">1000 크레딧</span>이 소모됩니다.
        </div>
      </section>
      {errorMessage !== null && <ErrorModal message={errorMessage} />}
    </div>
  );
}
