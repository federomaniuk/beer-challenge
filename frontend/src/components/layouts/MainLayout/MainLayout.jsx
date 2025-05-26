import ListHeader from "../../ui/ListHeader/ListHeader";
import "./MainLayout.scss";
const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <ListHeader />
      {children}
    </div>
  );
};

export default MainLayout;
