import { Routes, Route } from "react-router-dom";
import { Login } from "../auth/Login";
import { Register } from "../auth/Register";
import { Authorized } from "./Authorized";
import { UserHome } from "../UserProfile.js/UserHome";
import { Profile } from "../UserProfile.js/CreateProfile";
import { UserProductList } from "../products/UserProductList";
import { UserTipList } from "../tips/userTipList";
import { WishList } from "../wishlist/UserWishList";
import { ProductDetailList } from "../products/productDetailList";

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
        <Route path="/products" element={<UserProductList token={token} />} />
        <Route path="/tips" element={<UserTipList />} />
        <Route path="/wishlist" element={<WishList token={token} />} />
        <Route path="/productDetailList/:id" element={<ProductDetailList />} />
      </Routes>
    </>
  );
};
