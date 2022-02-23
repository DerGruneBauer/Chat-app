import React from "react";
import styles from "./Home.module.css";
import PostCard from "../../components/PostCard/PostCard";
import NewPostCard from "../../components/NewPostCard/NewPostCard";
import { userContext } from "../../userContext";

const Home = () => {
  return (
    <userContext.Consumer>
      {(value) => (
        <div className={styles.homeContainer}>
          <NewPostCard user={value} />
          <PostCard user={value} />
          <PostCard user={value} />
        </div>
      )}
    </userContext.Consumer>
  );
};
export default Home;
