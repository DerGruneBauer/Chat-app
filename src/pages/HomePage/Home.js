import React from "react";
import styles from "./Home.module.css";
import PostCard from "../../components/PostCard/PostCard";
import NewPostCard from "../../components/NewPostCard/NewPostCard";

const Home = () => {

  return (
    <div className={styles.homeContainer}>
      <NewPostCard />
      <PostCard />
      <PostCard />
    </div>
  );
};
export default Home;