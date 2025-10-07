import "./SideBar.css";
import avatar from "../../images/User-Avartar-Header.png";
import addNewIcon from "../../images/Profile-AddNew.svg";

function SideBar({ onAddClothesClick }) {
  return (
    <div className="sidebar">
      <div className="sidebar__row">
        <img
          src={avatar}
          alt="User Avatar"
          className="sidebar__avatar"
        />
        <p className="sidebar__username">Terrence Tegegne</p>
        <p className="sidebar__title">Your items</p>
        <button
          className="sidebar__add-button"
          onClick={onAddClothesClick}
        >
          <img
            src={addNewIcon}
            alt="Add New"
            className="sidebar__add-icon"
          />
        </button>
      </div>
    </div>
  );
}

export default SideBar;
