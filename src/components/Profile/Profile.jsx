import "./Profile.css";
import SideBar from "./SideBar";
import avatar from "../../images/User-Avartar-Header.png";
import addNewIcon from "../../images/Profile-AddNew.svg";
import ClothesSection from "./ClothesSection";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile({
  clothingItems,
  onAddClothesClick,
  onCardClick,
  onDelete,
  onLogout,
  onEditProfile  
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <section className="profile">
      <div className="profile__sidebar-visible">
        <SideBar onAddClothesClick={onAddClothesClick} />
      </div>

      {/* -------------------
          Main Profile Section (Left)
      ------------------- */}
      <div className="profile__user">
        <img
          src={currentUser?.avatar || avatar}
          alt="User Avatar"
          className="profile__avatar"
        />

        <div className="profile__info">
          <p className="profile__username">
            {currentUser ? currentUser.name : "Guest"}
          </p>
          <p
            className="profile__edit"
            onClick={onEditProfile}
          >
            Edit profile
          </p>
          <p
            className="profile__logout"
            onClick={onLogout}
          >
            Log out
          </p>
                  </div>
      </div>

      {/* -------------------
          Main Profile Section (Right)
      ------------------- */}
      <div className="profile__content">
        <div className="profile__header-row">
          <h2 className="profile__title">Your items</h2>
          <button
            className="profile__add-btn"
            onClick={onAddClothesClick}
            aria-label="Add new item"
          >
            <img src={addNewIcon} alt="Add New" className="profile__add-icon" />
          </button>
        </div>

        <ClothesSection
          clothingItems={clothingItems}
          onCardClick={onCardClick}
          onDelete={onDelete}
        />
      </div>
    </section>
  );
}

export default Profile;