import React, { useState } from "react";
import styles from "./SideBarNav.module.css";

const SideBarNav = (props) => {

  const [savedItemsNav, setSavedItems] = useState([
    { id: 0, isActive: true, name: `${props.sideBarNav[0]}` },
    { id: 1, isActive: false, name: `${props.sideBarNav[1]}` },
    { id: 2, isActive: false, name: `${props.sideBarNav[2]}` },
    { id: 3, isActive: false, name: `${props.sideBarNav[3]}` },
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
      onClick={(e) => {
        updateSelectedItem(item.id);
        props.updateShownItems(e);
      }}
      className={styles.savedItemButton, item.isActive ? styles.selectedItem : styles.unselectedItem}
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
    <nav className={styles.sideBarNav}>
      <div className={styles.slidingBarContainer}>{mappedSlidingBar}</div>
      <div className={styles.navButtonContainer}>{mappedSavedItems}</div>
    </nav>
  );
};

export default SideBarNav;
