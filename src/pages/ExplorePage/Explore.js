import React, { useState, useEffect } from "react";
import styles from "./Explore.module.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import SideBarNav from "../../components/SideBarNav/SideBarNav";
import PostCard from "../../components/PostCard/PostCard";
import UserApi from "../../api/UserApi";
import UsersSearchCard from "../../components/UsersSearchCard/UsersSearchCard";

const Explore = (props) => {
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [searchedItem, setSearchedItem] = useState("");
  const [selectedNavItem, setSelectedNavItem] = useState("Top");

  const sideBarNav = ["Top", "Latest", "People", "Media"];

  const updateSelectedMenuItem = (e) => {
    setSelectedNavItem(e.target.innerText);
  };

  const updateSearchedItem = (e, searchBarText) => {
    e.preventDefault();
    setSearchedItem(searchBarText);
  }

  const searchDatabase = async () => {
    var users = await getAllUsers();
    setSelectedPosts(users.filter(user => user.user_name.toLowerCase().includes(searchedItem.toLowerCase())));
  }

  const getAllUsers = async () => {
    var users;
    await UserApi.getAllUsers()
    .then((response) => response.json())
    .then((res) => {
      users = res;
    });
    return users;
  }

  const mappedUserCards = selectedPosts.map((user, index) => (
    <UsersSearchCard 
      key={"userCard"+index}
      id={user.user_id}
      user={props.user}
      displayName={user.display_name == "" ? user.user_name : user.display_name}
      userName={user.user_name}
      photoUrl={user.photo_url}
      bio={user.bio}
      followers={"200k"}/>
  ));

  return (
    <div className={styles.exploreContainer}>
      <SearchBar searchDatabase={searchDatabase} searchItem={updateSearchedItem} />
      <SideBarNav updateShownItems={updateSelectedMenuItem} sideBarNav={sideBarNav}/>
      <div className={styles.postSection}>
        {mappedUserCards}
      </div>
    </div>
  );
};

export default Explore;
