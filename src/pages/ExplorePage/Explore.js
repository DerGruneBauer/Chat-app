import React, { useState, useEffect } from "react";
import styles from "./Explore.module.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import SideBarNav from "../../components/SideBarNav/SideBarNav";
import PostCard from "../../components/PostCard/PostCard";

const Explore = (props) => {
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [searchedItem, setSearchedItem] = useState("");
  const [selectedNavItem, setSelectedNavItem] = useState("Top");

  const sideBarNav = ["Top", "Latest", "People", "Media"];

  const updateShownItems = (e) => {
    setSelectedNavItem(e.target.innerText);
  };

  const updateSearchedItem = (e, searchBarText) => {
    e.preventDefault();
    setSearchedItem(searchBarText);
  }
  
  return (
    <div className={styles.exploreContainer}>
      <SearchBar searchItem={updateSearchedItem} />
      <SideBarNav updateShownItems={updateShownItems} sideBarNav={sideBarNav}/>
      <div className={styles.postSection}>
        {/* <PostCard user={props.user} />
        <PostCard user={props.user} /> */}
      </div>
    </div>
  );
};

export default Explore;
