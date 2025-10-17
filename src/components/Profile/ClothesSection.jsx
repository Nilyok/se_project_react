import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ clothingItems, onCardClick, onDelete }) {
  const visibleItems = clothingItems.slice(0, 6);

  return (
    <div className="clothes-section">
      <div className="clothes-section__grid">
        {visibleItems.length > 0 ? (
          visibleItems.map((item) => (
            <ItemCard
              key={item.id}
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
