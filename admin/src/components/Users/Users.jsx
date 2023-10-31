import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-hot-toast";

import "./Users.css";
import { useUsers, useAxiosPrivate, useScroll } from "../../hooks";

const Users = () => {
  const { users, setUsers } = useUsers();
  const { setVisible } = useScroll();
  const [searchQuery, setSearchQuery] = useState("");

  const axiosPrivate = useAxiosPrivate();
  const effectRun = useRef(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/users", {
          signal: controller.signal,
          headers: { "Content-Type": "application/json" },
        });
        isMounted &&
          setTimeout(() => {
            setUsers(response.data);
          }, 2000);
      } catch (err) {
        if (!err?.response) {
          toast.error(<div className="toast">No Server Response</div>, {
            duration: 5000,
          });
        } else {
          console.log("Error Fetching User", err);
          toast.error(<div className="toast">Error Feching Users</div>, {
            duration: 5000,
          });
        }
      }
    };
    getUsers();
    if (effectRun.current) {
      getUsers();
    }
    return () => {
      isMounted = false;
      isMounted && controller.abort();
      effectRun.current = true;
    };
  }, [setUsers, axiosPrivate]);

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="users-container">
      {users.length < 1 ? (
        <p className="noBrand">Users Loading...</p>
      ) : (
        <>
          <h2>Users List ({users.length})</h2>
          <input
            type="text"
            placeholder="Search for users' email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {filteredUsers.length === 0 ? (
            <p className="noBrand">No users found.</p>
          ) : (
            <ul>
              {filteredUsers.map((user) => (
                <li key={user._id}>
                  <Link
                    to={`/user-details/${user._id}`}
                    className="users"
                    onClick={() => setVisible(true)}
                  >
                    {user.email}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  );
};

export default Users;
