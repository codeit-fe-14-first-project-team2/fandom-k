import Header from "../../components/header/Header";
import { useCredit, useSetCredit } from "../../contexts/GlobalContext";
import ChartContainer from "./components/ChartContainer";
import MyCredit from "./components/MyCredit";
import TributeContainer from "./components/TributeContainer";

export default function ListPage() {
  const credit = useCredit();
  const setCredit = useSetCredit();
  return (
    <>
      <Header />
      <main className="display-grid justify-stretch gap-50 my-50">
        <MyCredit credit={credit} />
        <TributeContainer />
        <ChartContainer />
      </main>
    </>
  );
}
