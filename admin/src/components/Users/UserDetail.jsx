import { useParams } from "react-router-dom";
import { useUsers } from "../../hooks";

const UserDetail = () => {
  const { userId } = useParams();

  const { users } = useUsers();

  const user = users.find((user) => user._id === userId);
  const { createdAt, email, phoneNumber, username } = user;
  return (
    <div className="user-detail-container">
      <p>
        Email: <span>{email}</span>
      </p>
      <p>
        Phone Number: <span> {phoneNumber}</span>
      </p>
      <p>
        Username: <span>{username}</span>
      </p>
      <p>
        Registered Date:{" "}
        <span>
          {new Date(createdAt).toLocaleDateString()},{" "}
          {new Date(createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </p>
    </div>
  );
};

export default UserDetail;
