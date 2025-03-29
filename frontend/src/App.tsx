import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import BoardsPage from "./pages/BoardsPage";
import ViewBoardPage from "./pages/ViewBoardPage";
import Logout from "./pages/Logout";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SideBar from "./components/SideBar";
import PrivateRoute from "./components/PrivateRoute";
import HomePage from "./pages/HomePage";
import { AuthContext } from "./context";
import { useState } from "react";
import ScrollToTop from "./utils";

const App = () => {
  const [Auth, setAuth] = useState(localStorage.getItem("jwt") !== "null");
  const loggedIn: boolean = (localStorage.getItem("jwt") !== "null");

  return (
    <div>
      <Router>
        <ScrollToTop/>
        <AuthContext.Provider value={{Auth, setAuth}}>
        <Header />
          {loggedIn && <SideBar />}
          <Routes>
            <Route path="/" element={<IndexPage/>} />
            <Route path="/register" element={<RegisterPage/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/home" element={<PrivateRoute><HomePage/></PrivateRoute>} />
            <Route path="/boards" element={<PrivateRoute><BoardsPage/></PrivateRoute>} />
            <Route path="/boards/:name" element={<PrivateRoute><ViewBoardPage/></PrivateRoute>} />
            <Route path="/logout" element={<Logout/>} />
          </Routes>
          <Footer />
        </AuthContext.Provider>
      </Router>
    </div>
  );
};

export default App;