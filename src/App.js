import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/LoginPage/Login";
import Register from "./pages/RegisterPage/Register";
import Home from "./pages/HomePage/Home";
import Profile from "./pages/ProfilePage/Profile";
import Header from "./components/Header/Header";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import MenuModal from "./components/Modal/Modal";
import Explore from "./pages/ExplorePage/Explore";
import Bookmarks from "./pages/BookmarksPage/Bookmarks";
import Settings from "./pages/SettingsPage/SettingsPage";
import { userContext } from "./userContext";
import { getUserInformation } from "./firebase";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [uid, setUid] = useState("");
  const [loggedInUser, setLoggedInUser] = useState({
    uid: "",
    authProvider: "",
    email: "",
    userName: "",
    displayName: "",
    photoUrl: "",
    bio: "",
    userId: "",
  });
  const [modalRef, setModalRef] = useState([{}]);

  const updateLoggedInStatus = (bool) => {
    setIsLoggedIn(bool);
  };

  const updateUsersInformation = (updatedUser) => {
    setLoggedInUser(updatedUser);
  };

  const updateModalStatus = (bool) => {
    setShowSettingsModal(bool);
  };

  const updateModalRefs = (ref) => {
    if(!modalRef.includes(ref.current)){
      setModalRef(modalRef => [...modalRef, ref.current]);
    }
  }

  window.onclick = function(event) {
    if(!modalRef.includes(event.target)) {
      updateModalStatus(false);
    }
  }

  const updateUid = (uid) => {
    setUid(uid);
  };

  useEffect(() => {
    if (uid != "") {
      getUserInformation(uid).then((res) => {
        setLoggedInUser(res);
        updateLoggedInStatus(true);
      });
    }
  }, [uid]);

  const signInPages = (
    <Routes>
      <Route exact path="/" element={<Register getUserUid={updateUid} />} />
      <Route exact path="/login" element={<Login getUserUid={updateUid} />} />
    </Routes>
  );

  const appPages = (
    <userContext.Consumer>
      {(user) => (
        <div className="appPagesContainer">
          <Header
            updateModalDisplay={updateModalStatus}
            modalStatus={showSettingsModal}
            user={user}
            updateModalRefs={updateModalRefs}
          />
          <MenuModal
            onClick={e => e.stopPropagation()}
            updateModalDisplay={updateModalStatus}
            modalStatus={showSettingsModal}
            user={user}
            signOut={updateLoggedInStatus}
            setUserUid={updateUid}
            updateModalRefs={updateModalRefs}
          />
          <Routes>
            <Route exact path="/" element={<Home user={user} />} />
            <Route path="/profile/:uid" element={<Profile user={user} />} />
            <Route exact path="/settings" element={<Settings updateUser={updateUsersInformation} user={user} />} />
            <Route exact path="/explore" element={<Explore user={user} />} />
            <Route exact path="/bookmarks" element={<Bookmarks user={user} />} />
          </Routes>
          <NavigationBar />
        </div>
      )}
    </userContext.Consumer>
  );

  return (
    <div className="app">
      <userContext.Provider value={loggedInUser}>
        <BrowserRouter>{isLoggedIn ? appPages : signInPages}</BrowserRouter>
      </userContext.Provider>
    </div>
  );
}

export default App;
