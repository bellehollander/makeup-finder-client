import { Routes, Route } from "react-router-dom";
import { Login } from "../auth/Login";
import { Register } from "../auth/Register";
import { Authorized } from "./Authorized";
import { UserHome } from "../UserProfile.js/UserHome";
import { Profile } from "../UserProfile.js/CreateProfile";

export const UserViews = ({ token, setToken, isAdmin, setAdmin }) => {
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={<Login setToken={setToken} setAdmin={setAdmin} />}
        />
        <Route
          path="/register"
          element={<Register setToken={setToken} setAdmin={setAdmin} />}
        />
        <Route element={<Authorized token={token} />} />
        <Route path="/" element={<UserHome token={token} />} />
        <Route path="/Profile/:id" element={<Profile />} />
      </Routes>
    </>
  );
};
