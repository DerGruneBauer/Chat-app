import './App.css';
import ImageApi from './ui-api/ImageApi';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './pages/LoginPage/Login';
import Register from './pages/RegisterPage/Register';
import ImageUploadPage from './pages/ImageUploadPage/ImageUploadPage';

function App() {

  const [testApiData, setTestApiData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // useEffect(() => {
  //   ImageApi.testFetchCall()
  //     .then(res => res.json())
  //     .then(data => { console.log(data.express); setTestApiData(data.express); setIsLoading(false) });
  // }, [])

  //may run into issue where user types URL into bar and receives login/register even through already logged in. 
  //If logged in should redirect to homepage when trying to access register/login.
  const signInPages = (
    <Routes>
      <Route exact path="/" element={<Login/>} />
      <Route exact path="/register" element={<Register/>} />
    </Routes>
  )

  return (
    <div className="app">
      <BrowserRouter>
        {isLoggedIn ? <ImageUploadPage/> : signInPages}
      </BrowserRouter>
    </div>
  );
}

export default App;
