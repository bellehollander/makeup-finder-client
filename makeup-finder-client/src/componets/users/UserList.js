import { useState, useEffect } from "react";
import { getAllUsers } from "../../managers/UserManager";
import "./ViewUsers.css";

export const ViewUsers = () => {
  const [users, setUsers] = useState([]);

  const getUsers = () => {
    return getAllUsers().then((usersFromAPI) => {
      setUsers(usersFromAPI);
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div className="tip-list-header">
        <h1 className="header-tips">Users</h1>
        <img
          className="sparkle-image"
          src="https://thumbs.dreamstime.com/b/yellow-original-bright-stars-sparkle-icon-glowing-light-effect-star-vector-illustration-yellow-original-bright-stars-sparkle-icon-192033133.jpg"
          alt="gold sparkle image"
        />
      </div>
      <table className="user-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Makeup Skill</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.User.first_name}</td>
              <td>{user.User.last_name}</td>
              <td>{user.User.email}</td>
              <td>{user.makeup_skill.label}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
