import Header from "../../components/Header";
import ChartContainer from "./components/ChartContainer";
import MyCredit from "./components/MyCredit";
import TributeContainer from "./components/TributeContainer";

export default function ListPage() {
  return (
    <>
      <Header />
      <main className="display-grid justify-stretch my-50">
        <MyCredit />
        <TributeContainer />
        <ChartContainer />
      </main>
    </>
  );
}
