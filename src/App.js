import "./App.css";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/LoginPage/Login";
import Register from "./pages/RegisterPage/Register";
import Home from "./pages/HomePage/Home";
import Profile from "./pages/ProfilePage/Profile";
import Header from "./components/Header/Header";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import UserSettings from "./components/Modal/Modal";
import Explore from "./pages/ExplorePage/Explore";
import Bookmarks from "./pages/BookmarksPage/Bookmarks";
import Settings from "./pages/SettingsPage/SettingsPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [uid, setUid] = useState();

  //may run into issue where user types URL into bar and receives login/register even through already logged in.
  //If logged in should redirect to homepage when trying to access register/login.

  const updateLoggedInStatus = (bool) => {
    setIsLoggedIn(bool);
  };

  const updateModalStatus = (bool) => {
    setShowSettingsModal(bool);
  }

  const updateUid = (uid) => {
    setUid(uid);
  }

  const signInPages = (
    <Routes>
      <Route
        exact
        path="/"
        element={<Register getUserUid={updateUid} register={updateLoggedInStatus} />}
      />
      <Route
        exact
        path="/login"
        element={<Login getUserUid={updateUid} logIn={updateLoggedInStatus} />}
      />
    </Routes>
  );

  const appPages = (
    <div className="appPagesContainer">
      <Header updateModalDisplay={updateModalStatus} modalStatus={showSettingsModal} signOut={updateLoggedInStatus} userUid={uid} />
      <UserSettings updateModalDisplay={updateModalStatus} modalStatus={showSettingsModal}/>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/profile" element={<Profile userUid={uid}/>} />
        <Route exact path="/settings" element={<Settings userUid={uid}/>} />
        <Route exact path="/explore" element={<Explore />} />
        <Route exact path="/bookmarks" element={<Bookmarks />} />
      </Routes>
      <NavigationBar />
    </div>
  );

  return (
    <div className="app">
      <BrowserRouter>{isLoggedIn ? appPages : signInPages}</BrowserRouter>
    </div>
  );
}

export default App;
