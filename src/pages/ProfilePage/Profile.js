import React, { useState, useEffect } from "react";
import styles from "./Profile.module.css";
import followIcon from "../../assets/followUser.svg";
import PostCard from "../../components/PostCard/PostCard";
import SideBarNav from "../../components/SideBarNav/SideBarNav";
import PostApi from "../../api/PostsApi";
import UserApi from "../../api/UserApi";

const Profile = (props) => {
  const [selectedPosts, setSelectedPosts] = useState([]);

  const [selectedNavItem, setSelectedNavItem] = useState("Tweets");

  const sideBarNav = ["Tweets", "Tweets & Replies", "Media", "Likes"];

  const updateShownItems = (e) => {
    setSelectedNavItem(e.target.innerText);
  };

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
    if (selectedNavItem === "Tweets") {
      await PostApi.getPostsByUserId(props.user.userId)
        .then((response) => response.json())
        .then((res) => {
          setSelectedPosts(res.reverse());
        });
    } else if (selectedNavItem === "Tweets & Replies") {
      setSelectedPosts([]);
      console.log("showing tweets and replies");
    } else if (selectedNavItem === "Media") {
      setSelectedPosts([]);
      console.log("showing media");
    } else {
      let postArray = await UserApi.getUserLikedPostArray(props.user.userId)
        .then((res) => res.json())
        .then((result) => {
          return result[0].liked_posts;
        });

      let mappedRequest = postArray.map((post) =>
        PostApi.getPostsByPostId(post)
      );

      Promise.all(mappedRequest)
        .then((responses) => {
          return responses;
        })
        .then((responses) => Promise.all(responses.map((r) => r.json())))
        .then((posts) => {
          let finalPosts = posts.map((post) => {
            return post[0];
          });
          setSelectedPosts(finalPosts);
        });
    }
  };

  const formateDate = (date, time) => {
    return `${date.substring(0, 10)} at ${time.substring(0, 5)}`;
  };

  const mappedPosts = selectedPosts.map((post, index) => (
    <PostCard
      key={"post"+index}
      id={post.post_id}
      user={props.user}
      displayName={post.display_name}
      postText={post.post_text}
      comments={post.comments.length}
      saves={post.saves.length}
      retweets={post.retweets.length}
      photoUrl={post.photo_url}
      date={formateDate(post.date_posted, post.time_posted)}
      postersPhotoUrl={post.postersPhotoUrl}
    />
  ));

  const defaultBackgroundImage = <div className={styles.defaultBackgroundImage} />

  const loadedProfile = (
    <>
      { 1+1 === 2 ? defaultBackgroundImage : <img alt="The user's selected background." className={styles.backgroundImage} />}
      {props.user.photoUrl === "" ? defaultProfilePicture : profilePicture}
      <div className={styles.userInfo}>
        <h2>
          {props.user.displayName === "" ? "Edit name in settings" : props.user.displayName}
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
          {props.user.bio === ""
            ? "Edit user bio in settings."
            : props.user.bio}
        </p>
        <button>
          <img src={followIcon} alt="Click to follow this user." />
          Follow
        </button>
      </div>
      <SideBarNav sideBarNav={sideBarNav} updateShownItems={updateShownItems} />
      <div className={styles.postSection}>{mappedPosts}</div>
    </>
  );

  return <div className={styles.profileContainer}>{loadedProfile}</div>;
};
export default Profile;
