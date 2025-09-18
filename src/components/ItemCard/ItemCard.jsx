import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  /* -------------------
     Render
  ------------------- */
  return (
    <div className="item-card" onClick={() => onCardClick(item)}>
      <img
        src={item.link || item.imageUrl}
        alt={item.name}
        className="item-card__image"
      />
      <div className="item-card__label">{item.name}</div>
    </div>
  );
}

export default ItemCard;
