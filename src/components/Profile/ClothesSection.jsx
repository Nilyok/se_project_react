import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

/* -------------------
   Clothes Section
------------------- */
function ClothesSection({ clothingItems }) {
  // show only the first 4 cards
  const visibleItems = clothingItems.slice(0, 4);

  return (
    <div className="clothes-section">
      <div className="clothes-section__grid">
        {visibleItems.map((item) => (
          <ItemCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default ClothesSection;
