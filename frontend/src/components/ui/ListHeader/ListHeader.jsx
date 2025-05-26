import MenuIcon from "../../icons/MenuIcon";
import "./ListHeader.scss";
import { useUser } from "../../../contexts/UserContext";

const ListHeader = () => {
  const { user } = useUser();

  return (
    <div className="list-header">
      <button className="list-header__menu-button">
        <MenuIcon />
      </button>

      <div className="list-header__avatar">
        <img src={user.avatar} alt="User Avatar" />
      </div>
    </div>
  );
};

export default ListHeader;
