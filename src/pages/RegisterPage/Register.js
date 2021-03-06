import React, { useState } from "react";
import styles from "./Register.module.css";
import { Link, useNavigate } from "react-router-dom";
import SocialMediaButton from "../../components/SocialMediaButton/SocialMediaButton";
import {
  signInWithGoogle,
  registerWithEmailAndPassword,
} from "../../firebase";
import googleIcon from "../../assets/googleIcon.svg";
import facebookIcon from "../../assets/facebookIcon.svg";
import githubIcon from "../../assets/githubIcon.svg";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const register = async (event) => {
    event.preventDefault();
    await registerWithEmailAndPassword(email, password, userName)
    .then(res => {
      if(res instanceof Error) {
        console.log("error logging in");
        setError(true);
      } else {
        props.getUserUid(res.uid);
        setError(false);
        navigate("/");
      }
    });
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.logoContainer}>
        <h1>chatter</h1>
        <svg />
      </div>
      <p className={styles.loginLargeText}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.
      </p>
      <p className={styles.loginMainText}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore incididunt ut labore.
      </p>
      <span style={{ display: `${error ? 'inline-block' : 'none'}` }}>Error logging in. Try again.</span>
      <label className={error ? styles.error : null}>
        <svg/>
        <input
          onChange={(e) => setUserName(e.target.value)}
          id="userNameInput"
          placeholder="Username"
          type="text"
        />
      </label>
      <label className={error ? styles.error : null}>
        <svg className={styles.emailIcon} />
        <input
          onChange={(e) => setEmail(e.target.value)}
          id="emailInput"
          placeholder="Email"
          type="text"
        />
      </label>
      <label className={error ? styles.error : null}>
        <svg className={styles.passwordIcon} />
        <input
          onChange={(e) => setPassword(e.target.value)}
          id="passwordInput"
          placeholder="Password"
          type="password"
        />
      </label>
      <button onClick={(event) => register(event)}>
        Start chatting now
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
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};
export default Register;
