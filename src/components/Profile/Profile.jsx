import "./Profile.css";
import avatar from "../../images/User-Avartar-Header.png";
import addNewIcon from "../../images/Profile-AddNew.svg";
import ClothesSection from "./ClothesSection";

function Profile({ clothingItems, onAddClothesClick }) {
  return (
    <section className="profile">
      {/* Left user column */}
      <div className="profile__user">
        <img src={avatar} alt="User Avatar" className="profile__avatar" />
        <p className="profile__username">Terrence Tegegne</p>
      </div>

      {/* Right item section */}
      <div className="profile__content">
        <div className="profile__header-row">
          <h2 className="profile__title">Your items</h2>
          <button
            className="profile__add-btn"
            onClick={onAddClothesClick}
            aria-label="Add new item"
          >
            <img
              src={addNewIcon}
              alt="Add New"
              className="profile__add-icon"
            />
          </button>
        </div>

        <ClothesSection clothingItems={clothingItems} />
      </div>
    </section>
  );
}

export default Profile;
