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
      <h1>Users</h1>
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
