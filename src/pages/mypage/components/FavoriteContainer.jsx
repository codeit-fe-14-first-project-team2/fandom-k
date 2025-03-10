export default function FavoriteContainer({ list = [] }) {
  return (
    <section id="favorite-container" className="display-grid gap-32">
      <h1 className="text-24">내가 관심있는 아이돌</h1>
      {!(list?.length > 0) && (
        <article className="display-flex justify-center align-center" id="favorite-empty">
          <div className="text-invert-60">관심있는 아이돌을 선택해 추가해보세요</div>
        </article>
      )}
    </section>
  );
}
