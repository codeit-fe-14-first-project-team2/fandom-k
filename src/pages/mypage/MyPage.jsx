import Header from "../../components/header/Header";
import IdolContextProvider, { useIdols, useSetIdols } from "../../contexts/IdolContext";
import FavoriteContainer from "./components/FavoriteContainer";
import IdolListContainer from "./components/IdolListContainer";
import "./mypage.scss";

function MyPageContainer() {
  const myIdolList = useIdols();
  const setIdolList = useSetIdols();
  return (
    <>
      <Header />
      <main className="display-grid justify-stretch gap-40 my-76 mx-auto" id="my-page">
        <FavoriteContainer list={myIdolList} />
        <hr />
        <IdolListContainer list={myIdolList} />
      </main>
    </>
  );
}
export default function MyPage() {
  return (
    <IdolContextProvider>
      <MyPageContainer />
    </IdolContextProvider>
  );
}
