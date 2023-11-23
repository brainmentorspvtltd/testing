import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import PostList from "../../modules/post/pages/PostList";
import { User } from "../../modules/user/pages/User";
import CreatePost from "../../modules/post/pages/CreatePost";
import Comment from "../../modules/comment/pages/Comment";

const AllRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<PostList />} />
          <Route path="/join" element={<User />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/discuss/:slug" element={<Comment />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AllRoutes;
