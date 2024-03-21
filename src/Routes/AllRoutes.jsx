import { Routes, Route } from "react-router-dom";
import CartPage from "../Pages/Cart";
import Home from "../Pages/Home";
const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/users" element={<CartPage />} />
      <Route path="/settings" element={<CartPage />} />
      <Route path="/favorites" element={<CartPage />} />
      <Route path="/explore" element={<CartPage />} />
    </Routes>
  );
};
export default AllRoutes;
