import React, { useState, useEffect } from "react";
import styles from "./Profile.module.css";
import followIcon from "../../assets/followUser.svg";
import PostCard from "../../components/PostCard/PostCard";
import SideBarNav from "../../components/SideBarNav/SideBarNav";
import PostApi from "../../api/PostsApi";
import UserApi from "../../api/UserApi";
import {
  useParams
} from "react-router-dom";

const Profile = (props) => {

  let urlUid = useParams();

  const [selectedPosts, setSelectedPosts] = useState([]);

  const [selectedNavItem, setSelectedNavItem] = useState("Tweets");

  const sideBarNav = ["Tweets", "Tweets & Replies", "Media", "Likes"];

  const [selectedUser, setSelectedUser] = useState({});


  useEffect(() => {
    getUserProfileInformation();
    getUserTweets();
  }, [selectedNavItem]);

  const updateShownItems = (e) => {
    setSelectedNavItem(e.target.innerText);
  };

  const getUserProfileInformation = async () => {
    await UserApi.getUserById(urlUid.uid)
      .then((response) => response.json())
      .then((res) => {
        setSelectedUser(res[0]);
      });
  }

  const getUserTweets = async () => {
    if (selectedNavItem === "Tweets") {
      await PostApi.getPostsByUid(urlUid.uid)
        .then((response) => response.json())
        .then((res) => {
          setSelectedPosts(res.reverse());
        })
    } else if (selectedNavItem === "Tweets & Replies") {
      setSelectedPosts([]);
    } else if (selectedNavItem === "Media") {
      setSelectedPosts([]);
    } else {
      let postArray = await UserApi.getUserLikedPostArray(selectedUser.user_id)
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

  const profilePicture = (
    <img
      alt="your profile icon"
      className={styles.profilePicture}
      src={selectedUser.photo_url}
    />
  );

  const defaultProfilePicture = <div className={styles.defaultPicture} />;

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
      {selectedUser.photo_url ? profilePicture : defaultProfilePicture}
      <div className={styles.userInfo}>
        <h2>
          {selectedUser.display_name ? selectedUser.display_name : selectedUser.user_name}
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
          {selectedUser.bio ? selectedUser.bio : "Edit user bio in settings."}
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
