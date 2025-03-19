import Header from "../../components/header/Header";
import { useCredit, useSetCredit, useSetModal } from "../../contexts/GlobalContext";
import ChartContainer from "./components/ChartContainer";
import MyCredit from "./components/MyCredit";
import TributeContainer from "./components/TributeContainer";

export default function ListPage() {
  const credit = useCredit();
  const setCredit = useSetCredit();
  const setModal = useSetModal();
  return (
    <>
      <Header />
      <main className="display-grid justify-stretch gap-50 my-50">
        <MyCredit {...{ credit, setModal }} />
        <TributeContainer />
        <ChartContainer />
      </main>
    </>
  );
}