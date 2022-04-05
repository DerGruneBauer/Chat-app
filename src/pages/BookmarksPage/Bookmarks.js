import React, { useState, useEffect } from "react";
import styles from "./Bookmarks.module.css";
import SideBarNav from "../../components/SideBarNav/SideBarNav";
import PostCard from "../../components/PostCard/PostCard";
import PostApi from "../../api/PostsApi";
import UserApi from "../../api/UserApi";

const Bookmarks = (props) => {
  const [selectedPosts, setSelectedPosts] = useState([]);

  const [selectedNavItem, setSelectedNavItem] = useState("Tweets");

  const sideBarNav = ["Tweets", "Tweets & Replies", "Media", "Likes"];

  const updateShownItems = (e) => {
    setSelectedNavItem(e.target.innerText);
  };

  useEffect(() => {
    getUserTweets();
  }, [selectedNavItem]);

  const getUserTweets = async () => {
    if (selectedNavItem === "Tweets") {
      setSelectedPosts([]);
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
            console.log(post[0]);
            return post[0];
          });
          setSelectedPosts(finalPosts);
        });
    }
  };

  const formateDate = (date, time) => {
    return `${date.substring(0, 10)} at ${time.substring(0, 5)}`;
  };

  const mappedPosts = selectedPosts.map((post) => (
    <PostCard
      key={post.post_id}
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

  return (
    <div className={styles.bookmarkContainer}>
      <SideBarNav updateShownItems={updateShownItems} sideBarNav={sideBarNav}/>
      <div className={styles.postSection}>
        {mappedPosts}
      </div>
    </div>
  );
};

export default Bookmarks;