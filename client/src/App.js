import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./views/Home";
import { AddPost } from "./views/AddPost";
import { EditPost } from "./views/EditPost";
import { Register } from "./views/Register";
import { Post } from "./views/Post";
import { Posts } from "./views/Posts";
import { Login } from "./views/Login.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="posts" element={<Posts />}></Route>
        <Route path=":id" element={<Post />}></Route>
        <Route path=":id/edit" element={<EditPost />}></Route>
        <Route path="new" element={<AddPost />}></Route>
        <Route path="register" element={<Register />}></Route>
        <Route path="login" element={<Login />}></Route>
      </Routes>
      <ToastContainer position="bottom-right" />
    </Layout>
  );
}

export default App;
