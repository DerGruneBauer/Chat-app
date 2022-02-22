import React, { useState } from "react";
import styles from "./Profile.module.css";
import followIcon from "../../assets/followUser.svg";
import PostCard from "../../components/PostCard/PostCard";

const Profile = () => {
  const [savedItemsNav, setSavedItems] = useState([
    { id: 0, isActive: true, name: "Tweets" },
    { id: 1, isActive: false, name: "Tweets & Replies" },
    { id: 2, isActive: false, name: "Media" },
    { id: 3, isActive: false, name: "Likes" },
  ]);

  const [slidingBar, setSlidingBar] = useState([
    { id: 0, isActive: true },
    { id: 1, isActive: false },
    { id: 2, isActive: false },
    { id: 3, isActive: false },
  ]);

  const updateSelectedItem = (id) => {
    const updatedItems = savedItemsNav.map((item) => {
      return item.id === id
        ? { ...item, isActive: true }
        : { ...item, isActive: false };
    });
    const updatedSlidingBar = slidingBar.map((bar) => {
      return bar.id === id
        ? { ...bar, isActive: true }
        : { ...bar, isActive: false };
    });
    setSlidingBar(updatedSlidingBar);
    setSavedItems(updatedItems);
  };

  const mappedSavedItems = savedItemsNav.map((item) => (
    <button
      key={item.id}
      id={item.id}
      className={styles.savedItemButton}
      onClick={() => {
        updateSelectedItem(item.id);
      }}
      className={item.isActive ? styles.selectedItem : styles.unselectedItem}
    >
      {item.name}
    </button>
  ));

  const mappedSlidingBar = slidingBar.map((bar) => (
    <div
      key={bar.id}
      id={bar.id}
      className={
        bar.isActive ? styles.activeSlidingBar : styles.unactiveSlidingBar
      }
    ></div>
  ));

  return (
    <div className={styles.profileContainer}>
      <img className={styles.bannerImage} />
      <img className={styles.userImage} />
      <div className={styles.userInfo}>
        <h2>Remi Greenbauer</h2>
        <div className={styles.userStats}>
          <span>
            <b>2,567</b> Following
          </span>
          <span>
            <b>10.8k</b> Followers
          </span>
        </div>
        <p>Photographer and Filmaker based in Copenhagen, Denmark.</p>
        <button className={styles.followUserButton}>
          <img src={followIcon} alt="follow this user icon" />
          Follow
        </button>
      </div>
      <nav>
        <div className={styles.slidingBarContainer}>{mappedSlidingBar}</div>
        <div className={styles.navButtonContainer}>{mappedSavedItems}</div>
      </nav>
      <div className={styles.postSection}>
        <PostCard />
        <PostCard />
      </div>
    </div>
  );
};
export default Profile;
