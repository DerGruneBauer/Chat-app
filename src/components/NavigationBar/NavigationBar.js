import React, { useState } from "react";
import styles from "./NavigationBar.module.css";
import bookmarkIcon from "../../assets/bookmark.svg";
import homeIcon from "../../assets/home.svg";
import exploreIcon from "../../assets/explore.svg";
import { useNavigate } from "react-router-dom";

const NavigationBar = () => {

  const navigate = useNavigate();

  const [navigationIcons, setNavigationIcons] = useState([
    {
      id: 0,
      name: "homeIcon",
      image: homeIcon,
      isActive: true,
      pageComponent: "/"
    },
    {
      id: 1,
      name: "exploreIcon",
      image: exploreIcon,
      isActive: false,
      pageComponent: "/explore"
    },
    {
      id: 2,
      name: "bookmarkIcon",
      image: bookmarkIcon,
      isActive: false,
      pageComponent: "/bookmarks"
    },
  ]);

  const [slidingBar, setSlidingBar] = useState([
    { id: 0, isActive: true },
    { id: 1, isActive: false },
    { id: 2, isActive: false },
  ]);

  const updateSelectedIcon = (id) => {
    const updatedIcons = navigationIcons.map((icon) => {
      return icon.id === id
        ? { ...icon, isActive: true }
        : { ...icon, isActive: false };
    });
    const updatedSlidingBar = slidingBar.map((bar) => {
      return bar.id === id
        ? { ...bar, isActive: true }
        : { ...bar, isActive: false };
    });
    setSlidingBar(updatedSlidingBar);
    setNavigationIcons(updatedIcons);
  };

  const mappedNavigationIcons = navigationIcons.map((icon) => (
    <button
      key={icon.id}
      id={icon.id}
      onClick={() => {
        updateSelectedIcon(icon.id);
        navigate(`${icon.pageComponent}`);
      }}
      className={styles.navButton}
    >
      <img
        src={icon.image}
        className={`${styles.icon} ${
          icon.isActive ? styles.selectedIconColor : styles.unselectedIconColor
        }`}
      ></img>
    </button>
  ));

  const mappedSlidingBar = slidingBar.map((bar) => (
    <div
      key={bar.id}
      id={bar.id}
      className={`${styles.slidingBar} ${
        bar.isActive ? styles.activeSlidingBar : styles.unactiveSlidingBar
      }`}
    ></div>
  ));

  return (
    <nav className={styles.navBar}>
      <div className={styles.navIconsContainer}>{mappedNavigationIcons}</div>
      <div className={styles.slidingBarContainer}>{mappedSlidingBar}</div>
    </nav>
  );
};

export default NavigationBar;
