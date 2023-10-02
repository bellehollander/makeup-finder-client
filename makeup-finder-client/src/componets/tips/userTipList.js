import { GetAllTips } from "../../managers/TipManager";
import { useState, useEffect } from "react";
import { getCurrentUserProfile } from "../../managers/UserManager";
import "./TipList.css";

export const UserTipList = ({ token }) => {
  // get the current user's profile
  const [CurrentProfile, setProfile] = useState({});
  // set up the inital state for tips
  const [tips, setTips] = useState([]);
  // function to get all tips from the API and update the tip state
  const getTips = () => {
    return GetAllTips().then((tipsFromAPI) => {
      setTips(tipsFromAPI);
    });
  };
  // get the current user's profile, listening for a change in the token
  useEffect(() => {
    getCurrentUserProfile(token).then((profile) => {
      setProfile(profile);
    });
  }, [token]);
  // on inital render of the page, get all tips
  useEffect(() => {
    getTips();
  }, []);

  return (
    <>
      <div className="tip-list-header">
        <h1 className="header-tips" id="user-greeting">
          {" "}
          {CurrentProfile.User?.first_name}'s Tips!{" "}
        </h1>
        <img
          className="sparkle-image"
          src="https://thumbs.dreamstime.com/b/yellow-original-bright-stars-sparkle-icon-glowing-light-effect-star-vector-illustration-yellow-original-bright-stars-sparkle-icon-192033133.jpg"
          alt="gold sparkle image"
        />
      </div>
      <p className="skill-level-tips">
        {" "}
        skill level: {CurrentProfile.makeup_skill?.label}
      </p>
      <div className="tips-container">
        {tips.map((tip) => {
          // Check if the tip's makeup_skill ID matches the current user's profile skill
          const matchesProfileSkill =
            tip?.makeup_skill?.id === CurrentProfile?.makeup_skill?.id;
          if (matchesProfileSkill) {
            return (
              <div key={tip.id} className="tip-card">
                <h2>{tip.label}</h2>
                <p>{tip.description}</p>
                <p className="skill-level">
                  Skill Level: {tip.makeup_skill.label}
                </p>
              </div>
            );
          }
        })}
      </div>
    </>
  );
};
