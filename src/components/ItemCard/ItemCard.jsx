import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  return (
    <div className="item-card" onClick={() => onCardClick(item)}>
      <img src={item.link} alt={item.name} className="item-card__image" />
      <p className="item-card__name">{item.name}</p>
    </div>
  );
}

export default ItemCard;
