import React, { useState } from "react";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import SocialMediaButton from "../../components/SocialMediaButton/SocialMediaButton";
import {
  signInWithGoogle,
  logInWithEmailAndPassword,
} from "../../firebase";
import googleIcon from "../../assets/googleIcon.svg";
import facebookIcon from "../../assets/facebookIcon.svg";
import githubIcon from "../../assets/githubIcon.svg";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (event) => {
    event.preventDefault();
    let user = await logInWithEmailAndPassword(event, email, password);
    if(user instanceof Error) {
      console.log("error logging in");
    } else {
      props.logIn(true);
      props.getUserUid(user.uid);
      navigate("/");  
    }

  }
  return (
    <div className={styles.loginContainer}>
      <div className={styles.logoContainer}>
        <h1>chatter</h1>
        <svg />
      </div>
      <p className={styles.loginLargeText}>Login</p>
      <label>
        <svg className={styles.emailIcon} />
        <input
          onChange={(e) => setEmail(e.target.value)}
          id="emailInput"
          placeholder="Email"
          type="text"
        />
      </label>
      <label>
        <svg className={styles.passwordIcon} />
        <input
          onChange={(e) => setPassword(e.target.value)}
          id="passwordInput"
          placeholder="Password"
          type="password"
        />
      </label>
      <button
        onClick={(event) => login(event)}
      >
        Login
      </button>
      <p className={styles.loginSubtext}>
        Or continue with one of the following socials
      </p>
      <div className={styles.socialMediaLoginContainer}>
        {/* use a map here */}
        <SocialMediaButton socialIcon={googleIcon} onClick={signInWithGoogle} />
        <SocialMediaButton socialIcon={facebookIcon} />
        <SocialMediaButton socialIcon={githubIcon} />
      </div>
      <p className={styles.loginSubtext}>
        Don't have an account yet? <Link to="/">Register</Link>
      </p>
    </div>
  );
};
export default Login;
