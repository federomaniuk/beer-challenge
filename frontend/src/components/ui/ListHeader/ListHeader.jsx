import MenuIcon from "../../icons/MenuIcon";
import "./ListHeader.scss";

const ListHeader = () => {
  return (
    <div className="list-header">
      <button className="list-header__menu-button">
        <MenuIcon />
      </button>

      <div className="list-header__avatar">
        <img src="/avatar/avatar.jpg" alt="User Avatar" />
      </div>
    </div>
  );
};

export default ListHeader;
