import { Routes, Route } from "react-router-dom";
import { Login } from "../auth/Login";
import { Register } from "../auth/Register";
import { Authorized } from "./Authorized";
import { AdminMessage } from "./youarean";
import { ViewUsers } from "../users/UserList";
import { TipList } from "../tips/TipList";
import { CreateTips } from "../tips/CreateTip";
import { ProductList } from "../products/ProductList";
import { ProductForm } from "../products/CreateProduct";

export const AdminViews = ({ token, setToken, setAdmin }) => {
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
        <Route path="/" element={<AdminMessage />} />
        <Route path="/userList" element={<ViewUsers />} />
        <Route path="/tipManager" element={<TipList />} />
        <Route path="/createTip" element={<CreateTips />} />
        <Route path="/productManager" element={<ProductList />} />
        <Route path="/createProduct" element={<ProductForm />} />
      </Routes>
    </>
  );
};
