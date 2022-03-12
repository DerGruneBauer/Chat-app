import React, { useState, useEffect } from "react";
import styles from "./Profile.module.css";
import followIcon from "../../assets/followUser.svg";
import PostCard from "../../components/PostCard/PostCard";
import { getUserPosts } from "../../firebase";
import SideBarNav from "../../components/SideBarNav/SideBarNav";

const Profile = (props) => {

  const [selectedPosts, setSelectedPosts] = useState([]);

  const [selectedNavItem, setSelectedNavItem] = useState("Tweets");

  const sideBarNav = ["Tweets", "Tweets & Replies", "Media", "Likes"];

  const updateShownItems = (e) => {
    setSelectedNavItem(e.target.innerText);
  }

  useEffect(() => {
    getUserTweets();
  }, [selectedNavItem]);

  const profilePicture = (
    <img
      alt="your profile icon"
      className={styles.profilePicture}
      src={props.user.photoUrl}
    />
  );

  const defaultProfilePicture = <div className={styles.defaultPicture} />;

  const getUserTweets = async () => {
    if (selectedNavItem == "Tweets") {
      console.log(`Showing tweets`);
      let posts = await getUserPosts(props.user.uid);
      setSelectedPosts(posts);
    } else if (selectedNavItem == "Tweets & Replies") {
      setSelectedPosts([]);
      console.log("showing tweets and replies");
    } else if (selectedNavItem == "Media") {
      setSelectedPosts([]);
      console.log("showing media");
    } else {
      setSelectedPosts([]);
      console.log("showing likes");
    }
  };

  const formateDate = (seconds) => {
    var time = new Date(1970, 0, 1);
    time.setSeconds(seconds);
    return time.toDateString();
  };

  const mappedPosts = selectedPosts.map((post) => (
    <PostCard
      key={props.id}
      user={props.user}
      userName={post.userName}
      postText={post.postText}
      comments={post.comments}
      saves={post.saves}
      retweets={post.retweets}
      photoUrl={post.photoUrl}
      date={formateDate(post.datePosted.seconds)}
    />
  ));

  const loadedProfile = (
    <>
      <img />
      {props.user.photoUrl === "" ? defaultProfilePicture : profilePicture}
      <div className={styles.userInfo}>
        <h2>
          {props.user.name == "" ? "Edit name in settings" : props.user.name}
        </h2>
        <div className={styles.userStats}>
          <span>
            <b>2,567</b> Following
          </span>
          <span>
            <b>10.8k</b> Followers
          </span>
        </div>
        <p>
          {props.user.bio == "" ? "Edit user bio in settings." : props.user.bio}
        </p>
        <button>
          <img src={followIcon} alt="Click to follow this user." />
          Follow
        </button>
      </div>
      {/* <nav>
        <div className={styles.slidingBarContainer}>{mappedSlidingBar}</div>
        <div className={styles.navButtonContainer}>{mappedSavedItems}</div>
      </nav> */}
      <SideBarNav sideBarNav={sideBarNav} updateShownItems={updateShownItems}/>
      <div className={styles.postSection}>{mappedPosts}</div>
    </>
  );

  return <div className={styles.profileContainer}>{loadedProfile}</div>;
};
export default Profile;
