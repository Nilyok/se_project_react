import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ clothingItems, onCardClick, onDelete }) {
  const visibleItems = clothingItems.slice(0, 5);

  return (
    <div className="clothes-section">
      <div className="clothes-section__grid">
        {visibleItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onCardClick={() => onCardClick(item)}
            onDelete={() => onDelete(item)}
          />
        ))}
      </div>
    </div>
  );
}

export default ClothesSection;
