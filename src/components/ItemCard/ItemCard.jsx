import "./ItemCard.css";
import notFoundImage from "../../images/Image-NotFound.svg";


function ItemCard({ item, onCardClick }) {
  return (
    <div className="item-card" onClick={() => onCardClick(item)}>
      <img
        src={item.imageUrl || notFoundImage}
        alt={item.name || "Clothing item"}
        className="item-card__image"
        onError={(e) => (e.target.src = notFoundImage)}
      />
      <div className="item-card__label">{item.name}</div>
    </div>
  );
}

export default ItemCard;