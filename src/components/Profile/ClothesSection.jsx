import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";


function ClothesSection({ clothingItems, onCardClick, onDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const visibleItems = clothingItems.filter(
  (item) => item.owner === currentUser?._id
);

  return (
    <div className="clothes-section">
      <div className="clothes-section__grid">
        {visibleItems.length > 0 ? (
          visibleItems.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={() => onCardClick(item)}
              onDelete={() => onDelete(item)}
            />
          ))
        ) : (
          <p className="clothes-section__empty">No items yet — add one!</p>
        )}
      </div>
    </div>
  );
}

export default ClothesSection;