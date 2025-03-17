export default function IdolListContainer({ list: favoriteList = [] }) {
  return (
    <section id="idol-list-container" className="display-grid justify-stretch align-center gap-32">
      <h1 className="text-24">관심 있는 아이돌을 추가해보세요.</h1>
      <div id="idol-list" className="display-grid"></div>
    </section>
  );
}
