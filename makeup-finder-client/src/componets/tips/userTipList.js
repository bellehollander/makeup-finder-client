import { getAllUsers } from "../../managers/UserManager";
import { getCurrentUser } from "../../managers/SkillManager";
import { GetAllTips } from "../../managers/TipManager";
import { useState, useEffect } from "react";

export const UserTipList = ({ token }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [CurrentProfile, setProfile] = useState({});
  const [tips, setTips] = useState([]);

  const getTips = () => {
    return GetAllTips().then((tipsFromAPI) => {
      setTips(tipsFromAPI);
    });
  };

  useEffect(() => {
    getCurrentUser(token).then((author) => {
      setCurrentUser(author[0]);
    });
  }, [token]);

  useEffect(() => {
    getAllUsers().then((usersFromAPI) => {
      const currentProfile = usersFromAPI.find(
        (user) => user.User.id === currentUser.id
      );
      setProfile(currentProfile);
    });
  }, [currentUser]);

  useEffect(() => {
    getTips();
  }, []);

  return (
    <>
      <h1>Tips</h1>
      <div className="tips">
        {tips.map((tip) => {
          // Check if the tip's makeup_skill ID matches the current user's profile skill
          const matchesProfileSkill =
            tip?.makeup_skill?.id === CurrentProfile?.makeup_skill?.id;
          if (matchesProfileSkill) {
            return (
              <div key={tip.id}>
                <h3>{tip.label}</h3>
                <p>{tip.description}</p>
                <p> Skill Level: {tip.makeup_skill.label}</p>
              </div>
            );
          }
        })}
      </div>
    </>
  );
};
