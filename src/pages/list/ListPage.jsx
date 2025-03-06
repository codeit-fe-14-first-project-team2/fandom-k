import Header from "../../components/Header";
import { useCredit, useSetCredit } from "../../contexts/CreditContext";
import ChartContainer from "./components/ChartContainer";
import MyCredit from "./components/MyCredit";
import TributeContainer from "./components/TributeContainer";

export default function ListPage() {
  const credit = useCredit();
  const setCredit = useSetCredit();
  return (
    <>
      <Header />
      <main className="display-grid justify-stretch my-50">
        <MyCredit credit={credit} />
        <TributeContainer />
        <ChartContainer />
      </main>
    </>
  );
}
