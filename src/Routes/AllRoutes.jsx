import { Routes, Route } from "react-router-dom";
import AddPost from "../Pages/AddPost";
import CartPage from "../Pages/Cart";
import Home from "../Pages/Home";
import Posts from "../Pages/Posts";
const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/users" element={<Home />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/add-post/:postId?" element={<AddPost />} />
      <Route path="/events" element={<CartPage />} />
    </Routes>
  );
};
export default AllRoutes;
