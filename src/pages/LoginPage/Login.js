import React, { useState, useEffect } from "react";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import SocialMediaButton from "../../components/SocialMediaButton/SocialMediaButton";
import {
  firebaseApp,
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
} from "../../firebase";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import googleIcon from "../../assets/googleIcon.svg";
import facebookIcon from "../../assets/facebookIcon.svg";
import githubIcon from "../../assets/githubIcon.svg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  return (
    <div className={styles.loginContainer}>
      <div className={styles.logoContainer}>
        <h1>chatter</h1>
        <svg />
      </div>
      <p className={styles.loginLargeText}>
        Login
      </p>
        <label className={styles.loginInputLabel}>
          <svg className={styles.emailIcon} />
          <input
            className={styles.loginInput}
            onChange={(e) => setEmail(e.target.value)}
            id="emailInput"
            placeholder="Email"
            type="text"
          />
        </label>
        <label className={styles.loginInputLabel}>
          <svg className={styles.passwordIcon} />
          <input
            className={styles.loginInput}
            onChange={(e) => setPassword(e.target.value)}
            id="passwordInput"
            placeholder="Password"
            type="password"
          />
        </label>
        <button
          className={styles.submitButton}
          onClick={signInWithEmailAndPassword(email, password)}
        >
          Login
        </button>
      <p className={styles.loginSubtext}>
        Or continue with one of the following socials
      </p>
      <div className={styles.socialMediaLoginContainer}>
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
