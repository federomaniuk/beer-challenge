import "./UserInfo.scss";
import { useUser } from "../../../contexts/UserContext";

const UserInfo = () => {
  const { user } = useUser();

  return (
    <div className="user-info">
      <h4>Hi Mr. {user.name},</h4>
      <p>Welcome Back!</p>
    </div>
  );
};

export default UserInfo;
