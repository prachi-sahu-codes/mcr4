import "./App.css";
import { Routes, Route } from "react-router-dom";
import { LeftSidebar } from "./component/LeftSidebar";
import { Home } from "./pages/home/Home";
import { PostDetail } from "./pages/postDetail/PostDetail";
import { SortBar } from "./component/SortBar";

function App() {
  return (
    <div className="App">
      <nav className="navigation">
        <div className="app-title">MyForum</div>
      </nav>
      <div className="main-area">
        <LeftSidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:postId" element={<PostDetail />} />
        </Routes>
        <SortBar />
      </div>
    </div>
  );
}

export default App;
