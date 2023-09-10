/*import { Link } from "react-router-dom";
import { getCurrentUser } from "../../managers/SkillManager";
import { useState, useEffect } from "react";
import { getAllUsers } from "../../managers/UserManager";
import { useNavigate } from "react-router-dom";
import { CreateProfile, GetMakeupSkills } from "../../managers/SkillManager";

export const UserHome = ({ token }) => {
  const [currentUser, setCurrentUser] = useState(0);
  const [makeupSkills, setMakeupSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [profile, setProfile] = useState({
    user_id: currentUser.id,
    makeup_skill_id: 0,
  });

  useEffect(() => {
    getCurrentUser(token).then((author) => {
      setCurrentUser(author[0]);
    });
  }, [token]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    return getAllUsers().then((usersFromAPI) => {
      setUsers(usersFromAPI);
      setLoading(false);
    });
  };

  const makeupSkillsList = () => {
    return GetMakeupSkills().then((makeupSkillsFromAPI) => {
      setMakeupSkills(makeupSkillsFromAPI);
    });
  };

  useEffect(() => {
    makeupSkillsList();
  }, []);

  const handleControlledInputChange = (event) => {
    const newProfile = { ...profile };
    newProfile[event.target.name] = event.target.value;
    setProfile(newProfile);
  };

  const handleClickSaveProfile = (event) => {
    event.preventDefault();
    const newProfile = {
      User: currentUser.id,
      makeup_skill: parseInt(profile.makeup_skill_id),
    };
    CreateProfile(newProfile);
    window.alert(
      "Profile Created! View your profile and start adding preferences!"
    );
    navigate(`/Profile/${currentUser.id}`);
  };

  // Check if the user has a profile
  const hasProfile = users.some((user) => user.User.id === currentUser.id);
  const userProfileId = users.find((user) => user.User.id === currentUser.id);

  return (
    <div className="userHome">
      <h1>Welcome to Makeup Finder!</h1>
      <h2> Hello {currentUser.first_name}! </h2>
      <p>
        Here you can find makeup products and tips to help you find the perfect
        look!
      </p>
      {hasProfile ? (
        <Link to={`/Profile/${userProfileId.id}`}>View Your Profile</Link>
      ) : (
        <form>
          <fieldset>
            <div className="form-group">
              <h1> Please Create Your Profile To Begin! </h1>
              <label htmlFor="makeup_skill_id">Makeup Skill Level: </label>
              <select
                value={profile.makeup_skill_id}
                name="makeup_skill_id"
                id="makeup_skill_id"
                className="form-control"
                onChange={handleControlledInputChange}
              >
                <option value="0">Select a Makeup Skill Level</option>
                {makeupSkills.map((makeupSkill) => (
                  <option key={makeupSkill.id} value={makeupSkill.id}>
                    {makeupSkill.label}
                  </option>
                ))}
              </select>
            </div>
          </fieldset>
          <button className="btn btn-primary" onClick={handleClickSaveProfile}>
            Save Profile
          </button>
        </form>
      )}
    </div>
  );
};
*/
import { Link } from "react-router-dom";
import { getCurrentUser } from "../../managers/SkillManager";
import { useState, useEffect } from "react";
import { getAllUsers } from "../../managers/UserManager";
import { useNavigate } from "react-router-dom";
import { CreateProfile, GetMakeupSkills } from "../../managers/SkillManager";

export const UserHome = ({ token }) => {
  const [currentUser, setCurrentUser] = useState(0);
  const [makeupSkills, setMakeupSkills] = useState([]);
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [profile, setProfile] = useState({
    user_id: currentUser.id,
    makeup_skill_id: 0,
  });
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    getCurrentUser(token).then((author) => {
      setCurrentUser(author[0]);
    });
  }, [token]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    return getAllUsers().then((usersFromAPI) => {
      setUsers(usersFromAPI);
      setLoading(false); // Set loading to false when data is fetched
    });
  };

  const makeupSkillsList = () => {
    return GetMakeupSkills().then((makeupSkillsFromAPI) => {
      setMakeupSkills(makeupSkillsFromAPI);
    });
  };

  useEffect(() => {
    makeupSkillsList();
  }, []);

  const handleControlledInputChange = (event) => {
    const newProfile = { ...profile };
    newProfile[event.target.name] = event.target.value;
    setProfile(newProfile);
  };

  const handleClickSaveProfile = (event) => {
    event.preventDefault();
    const newProfile = {
      User: currentUser.id,
      makeup_skill: parseInt(profile.makeup_skill_id),
    };
    CreateProfile(newProfile);
    window.alert(
      "Profile Created! View your profile and start adding preferences!"
    );
    navigate(`/Profile/${currentUser.id}`);
  };

  // Check if the user has a profile
  const hasProfile = users.some((user) => user.User.id === currentUser.id);
  const userProfileId = users.find((user) => user.User.id === currentUser.id);

  return (
    <div className="userHome">
      <h1>Welcome to Makeup Finder!</h1>
      <h2> Hello {currentUser.first_name}! </h2>
      <p>
        Here you can find makeup products and tips to help you find the perfect
        look!
      </p>
      {loading ? (
        <p>Loading...</p>
      ) : hasProfile ? (
        <Link to={`/Profile/${userProfileId.id}`}>View Your Profile</Link>
      ) : (
        <form>
          <fieldset>
            <div className="form-group">
              <h1> Please Create Your Profile To Begin! </h1>
              <label htmlFor="makeup_skill_id">Makeup Skill Level: </label>
              <select
                value={profile.makeup_skill_id}
                name="makeup_skill_id"
                id="makeup_skill_id"
                className="form-control"
                onChange={handleControlledInputChange}
              >
                <option value="0">Select a Makeup Skill Level</option>
                {makeupSkills.map((makeupSkill) => (
                  <option key={makeupSkill.id} value={makeupSkill.id}>
                    {makeupSkill.label}
                  </option>
                ))}
              </select>
            </div>
          </fieldset>
          <button className="btn btn-primary" onClick={handleClickSaveProfile}>
            Save Profile
          </button>
        </form>
      )}
    </div>
  );
};
