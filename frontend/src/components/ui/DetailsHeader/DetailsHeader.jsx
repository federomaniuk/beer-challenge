import "./DetailsHeader.scss";
import BackIcon from "../../icons/BackIcon";
import DotsIcon from "../../icons/DotsIcon";
import { useNavigate } from "react-router-dom";

const DetailsHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="list-header">
      <button className="list-header__menu-button" onClick={() => navigate(-1)}>
        <BackIcon />
      </button>
      <h2>Detail</h2>
      <button className="list-header__menu-button">
        <DotsIcon />
      </button>
    </div>
  );
};

export default DetailsHeader;
