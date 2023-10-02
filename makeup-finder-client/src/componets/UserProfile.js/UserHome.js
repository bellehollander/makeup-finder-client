import { Link } from "react-router-dom";
import { getCurrentUser } from "../../managers/SkillManager";
import { useState, useEffect } from "react";
import { getAllUsers } from "../../managers/UserManager";
import { useNavigate } from "react-router-dom";
import { CreateProfile, GetMakeupSkills } from "../../managers/SkillManager";
import "./userHome.css";

export const UserHome = ({ token }) => {
  // set up inital state for current user
  const [currentUser, setCurrentUser] = useState(0);
  // set up inital state for makeup skills
  const [makeupSkills, setMakeupSkills] = useState([]);
  const navigate = useNavigate();
  // set up inital state for all users
  const [users, setUsers] = useState([]);
  // set up inital state for profile
  const [profile, setProfile] = useState({
    user_id: currentUser.id,
    makeup_skill_id: 0,
  });
  const [loading, setLoading] = useState(true); // Add loading state
  // useEffect to get the current user, listening for a change in the token
  useEffect(() => {
    getCurrentUser(token).then((author) => {
      setCurrentUser(author[0]);
    });
  }, [token]);
  // get all the users on inital render of the page
  useEffect(() => {
    getUsers();
  }, []);
  // function to get all the users from the API and update the users state
  const getUsers = () => {
    return getAllUsers().then((usersFromAPI) => {
      setUsers(usersFromAPI);
      setLoading(false); // Set loading to false when data is fetched
    });
  };
  // function to get all the makeup skills from the API and update the makeup skills state
  const makeupSkillsList = () => {
    return GetMakeupSkills().then((makeupSkillsFromAPI) => {
      setMakeupSkills(makeupSkillsFromAPI);
    });
  };
  // on inital render of the page, get all the makeup skills
  useEffect(() => {
    makeupSkillsList();
  }, []);
  // function to handle the controlled input change
  const handleControlledInputChange = (event) => {
    const newProfile = { ...profile };
    newProfile[event.target.name] = event.target.value;
    setProfile(newProfile);
  };
  // function to handle the save profile button click
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
      <div className="tip-list-header">
        <h2 className="user-welcome"> Hello {currentUser.first_name}! </h2>
        <img
          className="sparkle-image"
          src="https://thumbs.dreamstime.com/b/yellow-original-bright-stars-sparkle-icon-glowing-light-effect-star-vector-illustration-yellow-original-bright-stars-sparkle-icon-192033133.jpg"
          alt="gold sparkle image"
        />
      </div>

      <p className="about">
        Welcome to Makeup Finder! We're so glad you're here!
      </p>
      {loading ? (
        <p>Loading...</p>
      ) : hasProfile ? (
        <Link to={`/Profile/${userProfileId.id}`} className="view-profile-link">
          View Your Profile
        </Link>
      ) : (
        <form>
          <fieldset className="create-profile-fieldset">
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
