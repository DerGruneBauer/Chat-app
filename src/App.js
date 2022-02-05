import './App.css';
import ImageApi from './ui-api/ImageApi';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './pages/LoginPage/Login';
import Register from './pages/RegisterPage/Register';
import ImageUploadPage from './pages/ImageUploadPage/ImageUploadPage';
import Home from './pages/HomePage/Home';
import Profile from './pages/ProfilePage/Profile';
import Header from './components/Header/Header';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   ImageApi.testFetchCall()
  //     .then(res => res.json())
  //     .then(data => { console.log(data.express); setTestApiData(data.express); setIsLoading(false) });
  // }, [])

  //may run into issue where user types URL into bar and receives login/register even through already logged in. 
  //If logged in should redirect to homepage when trying to access register/login.

  const updateLoggedInStatus = (bool) => {
    setIsLoggedIn(bool);
  }

  const signInPages = (
    <Routes>
      <Route exact path="/" element={<Register register={updateLoggedInStatus}/>} />
      <Route exact path="/login" element={<Login logIn={updateLoggedInStatus}/>} />
    </Routes>
  )

  const appPages = (
    <div className="appPagesContainer">
    <Header signOut={updateLoggedInStatus}/>
    <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route exact path="/profile" element={<Profile/>} />
    </Routes>
    </div>
  )

  return (
    <div className="app">
      <BrowserRouter>
        {isLoggedIn ? appPages : signInPages}
      </BrowserRouter>
    </div>
  );
}

export default App;
