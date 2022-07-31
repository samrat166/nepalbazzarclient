import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home";
import { Routes, Route } from "react-router-dom";
import BottomNavigation from "./Components/BottomNavigation/BottomNavigation";
import Header from "./Components/BottomNavigation/Header/Header";
import Registration from "./Components/Registration/Registration";
import AddAPost from "./Components/AddAPost/AddAPost";
import Login from "./Components/Login/Login";
import Profile from "./Components/Profile/Profile";
import Chat from "./Components/Chat/Chat";
import Settings from "./Components/Settings/Settings";
import Tabs from "./Components/Profile/Tabs";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import ViewItem from "./Components/Profile/ViewItem/ViewItem";
import ScroolToTop from "./Components/ScroolToTop/ScroolToTop";
import DetailView from "./Components/PostCard/DetailView/DetailView";
import UserDetails from "./Components/UserDetails/UserDetails";
import LoadMore from "./Components/LoadMore/LoadMore";
import SubCategoryDesc from "./Components/SubCategoryDesc/SubCategoryDesc";
import Footer from "./Components/Footer/Footer";
import AdminPanel from "./Pages/AdminPanel";

function App() {
  return (
    <div className="App">
      <Header />
      <BottomNavigation />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/category/:id"
          element={
            <>
              <Navbar />

              <SubCategoryDesc />
              <Footer />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Navbar />

              <Registration />
              <Footer />
            </>
          }
        />
        <Route
          path="/post"
          element={
            <>
              <Navbar />

              <AddAPost />
              <Footer />
            </>
          }
        />
        <Route
          path="/admin-panel"
          element={
            <>
              <Navbar />

              <AdminPanel />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <Navbar />

              <Settings />
              <Footer />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Navbar />

              <Login />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <Navbar />

              <Tabs />
              <Footer />
            </>
          }
        />
        <Route
          path="/forgot/password"
          element={
            <>
              <ForgotPassword />
              <Footer />
            </>
          }
        />
        <Route
          path="/reset/password/:token/:email"
          element={
            <>
              <ResetPassword />
              <Footer />
            </>
          }
        />
        <Route
          path="/item/:id"
          element={
            <>
              <Navbar />

              <ViewItem />
              <Footer />
            </>
          }
        ></Route>
        <Route
          path="/detail/view/:id"
          element={
            <>
              <Navbar />

              <DetailView />
              <Footer />
            </>
          }
        ></Route>
        <Route
          path="/all/products"
          element={
            <>
              <Navbar />

              <LoadMore />
              <Footer />
            </>
          }
        ></Route>
        <Route
          path="/user/detail/:id"
          element={
            <>
              <Navbar />

              <UserDetails />
              <Footer />
            </>
          }
        ></Route>
        <Route
          path="/chat"
          element={
            <>
              <Navbar />

              <Chat />
              <Footer />
            </>
          }
        ></Route>
      </Routes>
      <ScroolToTop />
    </div>
  );
}

export default App;
