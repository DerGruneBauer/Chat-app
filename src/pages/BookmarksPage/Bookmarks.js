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
    getTweetsBySelectedCategory();
  }, [selectedNavItem]);

  const getTweetsBySelectedCategory = async () => {
    if (selectedNavItem === "Tweets") {
      let postArray = await UserApi.getUserSavedPostArray(props.user.userId)
        .then((res) => res.json())
        .then((result) => {
          return result[0].saved_posts;
        });
      getAllPostsForSelectedSection(postArray);
    } else if (selectedNavItem === "Tweets & Replies") {
      setSelectedPosts([]);
    } else if (selectedNavItem === "Media") {
      setSelectedPosts([]);
    } else {
      let postArray = await UserApi.getUserLikedPostArray(props.user.userId)
        .then((res) => res.json())
        .then((result) => {
          return result[0].liked_posts;
        });
      getAllPostsForSelectedSection(postArray);
    }
  };

  const getAllPostsForSelectedSection = async (postArray) => {
    let mappedRequest = postArray.map((post) => PostApi.getPostsByPostId(post));

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
  };

  const formateDate = (date, time) => {
    return `${date.substring(0, 10)} at ${time.substring(0, 5)}`;
  };

  const mappedPosts = selectedPosts.map((post, index) => (
    <PostCard
      key={`post${post.post_id}${index}`}
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