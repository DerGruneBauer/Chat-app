import React, {useRef} from "react";
import styles from "./SearchBar.module.css";
import searchIcon from "../../assets/searchMagnifyingGlass.svg";

const SearchBar = (props) => {

  const inputField = useRef(null);

  const onKeyDown = (e) => {
    if(e.key === 'Enter') {
      props.searchDatabase();
      inputField.current.value="";
    }
  }

  return (
    <div className={styles.searchContainer}>
      <label>
        <img alt="Search for new content." src={searchIcon} />
        <input ref={inputField} onKeyDown={(e) => onKeyDown(e)} onChange={(e) => props.searchItem(e, e.target.value)} placeholder="Search" type="text"></input>
      </label>
      <button onClick={() => {props.searchDatabase(); inputField.current.value="";}}>Search</button>
    </div>
  );
};

export default SearchBar;
