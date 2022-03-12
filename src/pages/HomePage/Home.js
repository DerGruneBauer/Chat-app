import React from "react";
import styles from "./Home.module.css";
import PostCard from "../../components/PostCard/PostCard";
import NewPostCard from "../../components/NewPostCard/NewPostCard";

const Home = (props) => {
  return (
        <div className={styles.homeContainer}>
          <NewPostCard user={props.user} />
          <PostCard user={props.user} />
          <PostCard user={props.user} />
        </div>
  );
};
export default Home;
