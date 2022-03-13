import React, { useState } from "react";
import styles from "./Bookmarks.module.css";
import SideBarNav from "../../components/SideBarNav/SideBarNav";
import PostCard from "../../components/PostCard/PostCard";

const Bookmarks = (props) => {
  const [selectedPosts, setSelectedPosts] = useState([]);

  const [selectedNavItem, setSelectedNavItem] = useState("Top");

  const sideBarNav = ["Tweets", "Tweets & Replies", "Media", "Likes"];

  const updateShownItems = (e) => {
    setSelectedNavItem(e.target.innerText);
  };

  return (
    <div className={styles.bookmarkContainer}>
      <SideBarNav updateShownItems={updateShownItems} sideBarNav={sideBarNav}/>
      <div className={styles.postSection}>
        <PostCard user={props.user} />
        <PostCard user={props.user} />
      </div>
    </div>
  );
};

export default Bookmarks;