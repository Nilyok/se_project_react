import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./ItemCard.css";
import notFoundImage from "../../images/Image-NotFound.svg";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const isLiked = item.likes?.some(
    (id) => id === currentUser?._id
  );

  const handleLikeClick = (e) => {
    e.stopPropagation();
    onCardLike(item);
  };

  return (
    <div className="item-card" onClick={() => onCardClick(item)}>
      <img
        src={item.imageUrl || notFoundImage}
        alt={item.name || "Clothing item"}
        className="item-card__image"
        onError={(e) => (e.target.src = notFoundImage)}
      />

      <div className="item-card__label-row">
        <span className="item-card__label">{item.name}</span>

        {currentUser && (
          <button
            className={`item-card__like-btn ${
              isLiked ? "item-card__like-btn_active" : ""
            }`}
            onClick={handleLikeClick}
          >
            ♥
          </button>
        )}
      </div>
    </div>
  );
}

export default ItemCard;
