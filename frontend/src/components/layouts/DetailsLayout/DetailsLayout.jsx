import DetailsHeader from "../../ui/DetailsHeader/DetailsHeader";
import "./DetailsLayout.scss";
const DetailsLayout = ({ children }) => {
  return (
    <div className="details-layout">
      <DetailsHeader />
      {children}
    </div>
  );
};

export default DetailsLayout;
