import React, {useState, useEffect} from "react";
import styles from "./UsersSearchCard.module.css";
import { Link } from "react-router-dom";
import UserApi from "../../api/UserApi";
import FollowButton from "../FollowButton/FollowButton";

const UsersSearchCard = (props) => {

  //need to update below naming eg. onInactive vs onActiveClick. Dont think this is correct
  const [followButton, setFollowButton] = useState(
    {
      isActive: false,
      onInactiveClick: [
        () => UserApi.updateUserFollowingSave(props.id, props.user.userId),
        () => UserApi.updateUserFollowingUnsave(props.id, props.user.userId),
      ],
      onActiveClick: [
        () => UserApi.updateUserFollowersSave(props.id, props.user.userId),
        () => UserApi.updateUserFollowersUnsave(props.id, props.user.userId),
      ],
    },
  );

  useEffect(() => {
    checkInitialState();
  }, []);

  const checkInitialState = async () => {
    await UserApi.getUserFollowingArray(props.user.userId)
      .then((response) => response.json())
      .then((res) => {
        if(res[0].following) {
          if(res[0].following.includes(props.id)){
            setFollowButton({...followButton, isActive: true})
          }
        }
      })
  };

  const updateActiveState = () => {
    setFollowButton({...followButton, isActive: !followButton.isActive})
  }

  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardTop}>
        <div className={styles.cardOwnerInfo}>
          <img></img>
          <div className={styles.cardData}>
            <span>
              <Link to={`/profile/${props.uid}`} className={styles.profileLink}>
                {props.displayName}
              </Link>
            </span>
            <span>{props.followers} followers</span>
          </div>
        </div>
        <FollowButton
          updateActiveState={updateActiveState}
          isActive={followButton.isActive}
          onInactiveClick={followButton.onInactiveClick}
          onActiveClick={followButton.onActiveClick}
        />
      </div>
      <p>{props.bio}</p>
      <img></img>
    </div>
  );
};
 
export default UsersSearchCard;