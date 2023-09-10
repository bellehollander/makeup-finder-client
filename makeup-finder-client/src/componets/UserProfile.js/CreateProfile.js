import React, { useEffect, useState } from "react";
import {
  CreateProfilePreference,
  getCurrentUser,
} from "../../managers/SkillManager";
import { GetAllPrefrences } from "../../managers/ProductManager";
import { getAllUsers } from "../../managers/UserManager";
import { getAllProfilePrefrences } from "../../managers/PrefrencesManager";

export const Profile = ({ token }) => {
  const [makeup_preferences, setMakeupPreferences] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [CurrentProfile, setProfile] = useState({});
  const [profile_preferences, setProfilePreferences] = useState([]);
  const [profile_preference, setProfilePreference] = useState({
    Profile: 0,
    makeup_preference: 0,
  });

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

  const getMakeupPreferences = () => {
    return GetAllPrefrences().then((makeup_preferencesFromAPI) => {
      setMakeupPreferences(makeup_preferencesFromAPI);
    });
  };

  useEffect(() => {
    getMakeupPreferences();
  }, []);

  const handlePrefrenceChange = (event) => {
    const newProfilePreference = { ...profile_preference };
    newProfilePreference[event.target.name] = event.target.value;
    setProfilePreference(newProfilePreference);
  };

  const UsersPrefrences = () => {
    getAllProfilePrefrences().then((profilePreferencesFromAPI) => {
      const currentPrefrences = [];
      profilePreferencesFromAPI.map((profilePreference) => {
        if (profilePreference.Profile.id === CurrentProfile?.id) {
          currentPrefrences.push(profilePreference);
        }
      });
      setProfilePreferences(currentPrefrences);
    });
  };

  useEffect(() => {
    UsersPrefrences();
  }, [CurrentProfile]);

  const handleClickSaveProfilePreference = (event) => {
    event.preventDefault();

    // Check if the user already has this preference
    const existingPreference = profile_preferences.find(
      (preference) =>
        preference.MakeupPreferences.id ===
        parseInt(profile_preference.makeup_preference)
    );

    if (existingPreference) {
      window.alert("You've already added this preference.");
    } else {
      // If not, add the preference
      const newProfilePreference = {
        Profile: CurrentProfile.id,
        MakeupPreferences: parseInt(profile_preference.makeup_preference),
      };

      CreateProfilePreference(newProfilePreference).then(() => {
        window.alert(
          "Profile Preference Added! We recommend adding more for more product recommendations!"
        );
        UsersPrefrences();
      });
    }
  };

  const eyeshadowPrefrence = makeup_preferences.filter(
    (makeup_preference) => makeup_preference.product_type.label === "eyeshadow"
  );

  const eyelinerPrefrence = makeup_preferences.filter(
    (makeup_preference) => makeup_preference.product_type.label === "Eyeliner"
  );

  const mascaraPrefrence = makeup_preferences.filter(
    (makeup_preference) => makeup_preference.product_type.label === "mascara"
  );

  const foundationPrefrence = makeup_preferences.filter(
    (makeup_preference) => makeup_preference.product_type.label === "foundation"
  );

  const blushPrefrence = makeup_preferences.filter(
    (makeup_preference) => makeup_preference.product_type.label === "blush"
  );

  const bronzerPrefrence = makeup_preferences.filter(
    (makeup_preference) => makeup_preference.product_type.label === "bronzer"
  );

  const lipstickPrefrence = makeup_preferences.filter(
    (makeup_preference) => makeup_preference.product_type.label === "lipstick"
  );

  const highlighterPrefrence = makeup_preferences.filter(
    (makeup_preference) =>
      makeup_preference.product_type.label === "highlighter"
  );

  const concealerPrefrence = makeup_preferences.filter(
    (makeup_preference) => makeup_preference.product_type.label === "concealer"
  );

  const ContourPrefrence = makeup_preferences.filter(
    (makeup_preference) => makeup_preference.product_type.label === "contour"
  );

  return (
    <form className="profileForm">
      <h1> {currentUser.first_name}'s Profile </h1>
      <h2 className="profileForm__title"> Add Profile Preferences! </h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="makeup_preference">
            Which of these eyeshadows do you like best?
          </label>
          <select
            value={profile_preference.makeup_preference}
            name="makeup_preference"
            id="makeup_preference"
            className="form-control"
            onChange={handlePrefrenceChange}
          >
            <option value="0">Select a Makeup Preference</option>
            {eyeshadowPrefrence.map((makeup_preference) => (
              <option key={makeup_preference.id} value={makeup_preference.id}>
                {makeup_preference.label}
              </option>
            ))}
          </select>
          <button onClick={handleClickSaveProfilePreference}>
            Save Profile Preference
          </button>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="makeup_preference">
            Which of these eyeliners do you like best?
          </label>
          <select
            value={profile_preference.makeup_preference}
            name="makeup_preference"
            id="makeup_preference"
            className="form-control"
            onChange={handlePrefrenceChange}
          >
            <option value="0">Select a Makeup Preference</option>
            {eyelinerPrefrence.map((makeup_preference) => (
              <option key={makeup_preference.id} value={makeup_preference.id}>
                {makeup_preference.label}
              </option>
            ))}
          </select>
          <button onClick={handleClickSaveProfilePreference}>
            Save Profile Preference
          </button>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="makeup_preference">
            Which of these mascaras do you like best?
          </label>
          <select
            value={profile_preference.makeup_preference}
            name="makeup_preference"
            id="makeup_preference"
            className="form-control"
            onChange={handlePrefrenceChange}
          >
            <option value="0">Select a Makeup Preference</option>
            {mascaraPrefrence.map((makeup_preference) => (
              <option key={makeup_preference.id} value={makeup_preference.id}>
                {makeup_preference.label}
              </option>
            ))}
          </select>
          <button onClick={handleClickSaveProfilePreference}>
            Save Profile Preference
          </button>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="makeup_preference">
            Which of these foundations do you like best?
          </label>
          <select
            value={profile_preference.makeup_preference}
            name="makeup_preference"
            id="makeup_preference"
            className="form-control"
            onChange={handlePrefrenceChange}
          >
            <option value="0">Select a Makeup Preference</option>
            {foundationPrefrence.map((makeup_preference) => (
              <option key={makeup_preference.id} value={makeup_preference.id}>
                {makeup_preference.label}
              </option>
            ))}
          </select>
          <button onClick={handleClickSaveProfilePreference}>
            Save Profile Preference
          </button>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="makeup_preference">
            Which of these blushes do you like best?
          </label>
          <select
            value={profile_preference.makeup_preference}
            name="makeup_preference"
            id="makeup_preference"
            className="form-control"
            onChange={handlePrefrenceChange}
          >
            <option value="0">Select a Makeup Preference</option>
            {blushPrefrence.map((makeup_preference) => (
              <option key={makeup_preference.id} value={makeup_preference.id}>
                {makeup_preference.label}
              </option>
            ))}
          </select>
          <button onClick={handleClickSaveProfilePreference}>
            Save Profile Preference
          </button>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="makeup_preference">
            Which of these lipsticks do you like best?
          </label>
          <select
            value={profile_preference.makeup_preference}
            name="makeup_preference"
            id="makeup_preference"
            className="form-control"
            onChange={handlePrefrenceChange}
          >
            <option value="0">Select a Makeup Preference</option>
            {lipstickPrefrence.map((makeup_preference) => (
              <option key={makeup_preference.id} value={makeup_preference.id}>
                {makeup_preference.label}
              </option>
            ))}
          </select>
          <button onClick={handleClickSaveProfilePreference}>
            Save Profile Preference
          </button>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="makeup_preference">
            Which of these highlighter do you like best?
          </label>
          <select
            value={profile_preference.makeup_preference}
            name="makeup_preference"
            id="makeup_preference"
            className="form-control"
            onChange={handlePrefrenceChange}
          >
            <option value="0">Select a Makeup Preference</option>
            {highlighterPrefrence.map((makeup_preference) => (
              <option key={makeup_preference.id} value={makeup_preference.id}>
                {makeup_preference.label}
              </option>
            ))}
          </select>
          <button onClick={handleClickSaveProfilePreference}>
            Save Profile Preference
          </button>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="makeup_preference">
            Which of these bronzers do you like best?
          </label>
          <select
            value={profile_preference.makeup_preference}
            name="makeup_preference"
            id="makeup_preference"
            className="form-control"
            onChange={handlePrefrenceChange}
          >
            <option value="0">Select a Makeup Preference</option>
            {bronzerPrefrence.map((makeup_preference) => (
              <option key={makeup_preference.id} value={makeup_preference.id}>
                {makeup_preference.label}
              </option>
            ))}
          </select>
          <button onClick={handleClickSaveProfilePreference}>
            Save Profile Preference
          </button>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="makeup_preference">
            Which of these concealers do you like best?
          </label>
          <select
            value={profile_preference.makeup_preference}
            name="makeup_preference"
            id="makeup_preference"
            className="form-control"
            onChange={handlePrefrenceChange}
          >
            <option value="0">Select a Makeup Preference</option>
            {concealerPrefrence.map((makeup_preference) => (
              <option key={makeup_preference.id} value={makeup_preference.id}>
                {makeup_preference.label}
              </option>
            ))}
          </select>
          <button onClick={handleClickSaveProfilePreference}>
            Save Profile Preference
          </button>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="makeup_preference">
            Which of these Contours do you like best?
          </label>
          <select
            value={profile_preference.makeup_preference}
            name="makeup_preference"
            id="makeup_preference"
            className="form-control"
            onChange={handlePrefrenceChange}
          >
            <option value="0">Select a Makeup Preference</option>
            {ContourPrefrence.map((makeup_preference) => (
              <option key={makeup_preference.id} value={makeup_preference.id}>
                {makeup_preference.label}
              </option>
            ))}
          </select>
          <button onClick={handleClickSaveProfilePreference}>
            Save Profile Preference
          </button>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="makeup_preference">Makeup Preferences:</label>
          {profile_preferences.length > 0 ? (
            <ul>
              {profile_preferences.map((preference) => (
                <>
                  <li key={preference.id}>
                    {preference.MakeupPreferences.label}

                    <img
                      key={preference.id}
                      src={preference.MakeupPreferences.image}
                    />
                  </li>
                </>
              ))}
            </ul>
          ) : (
            <p>No makeup preferences selected.</p>
          )}
        </div>
      </fieldset>
    </form>
  );
};
