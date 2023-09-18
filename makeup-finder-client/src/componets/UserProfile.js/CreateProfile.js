import React, { useEffect, useState } from "react";
import { CreateProfilePreference } from "../../managers/SkillManager";
import { GetAllPrefrences } from "../../managers/ProductManager";
import { getCurrentUserProfile } from "../../managers/UserManager";
import { getAllProfilePrefrences } from "../../managers/PrefrencesManager";
import { deleteProfilePrefrence } from "../../managers/PrefrencesManager";
import "./Profile.css";

export const Profile = ({ token }) => {
  // set up inital state for makeup preferences
  const [makeup_preferences, setMakeupPreferences] = useState([]);
  // set up inital state for current profile
  const [CurrentProfile, setProfile] = useState({});
  // set up inital state for the profile preferences
  const [profile_preferences, setProfilePreferences] = useState([]);
  // set up inital state for profile preference
  const [profile_preference, setProfilePreference] = useState({
    Profile: 0,
    makeup_preference: 0,
  });
  // function to get the current user profile and update the current profile state
  // based on the token
  useEffect(() => {
    getCurrentUserProfile(token).then((author) => {
      setProfile(author);
    });
  }, [token]);
  // function to get all makeup preferences from the API and update the makeup preferences state
  const getMakeupPreferences = () => {
    return GetAllPrefrences().then((makeup_preferencesFromAPI) => {
      setMakeupPreferences(makeup_preferencesFromAPI);
    });
  };
  // on inital render grab all makeup preferences
  useEffect(() => {
    getMakeupPreferences();
  }, []);
  // function for handling the change of the profile preference
  const handlePrefrenceChange = (event) => {
    // create a copy of the profile preference state
    const newProfilePreference = { ...profile_preference };
    // update the profile preference state
    newProfilePreference[event.target.name] = event.target.value;
    // update the profile preference state
    setProfilePreference(newProfilePreference);
  };
  // function to get all profile preferences from the API and update the profile preferences state
  // filter the profile preferences to only grab the ones that matches the current profile
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
  // grab the current user's profile preferences
  // dependent on the current profile
  useEffect(() => {
    UsersPrefrences();
  }, [CurrentProfile]);
  // function for handling the click of the save profile preference button
  const handleClickSaveProfilePreference = (event) => {
    // prevent the default
    event.preventDefault();

    // Check if the user already has this preference
    const existingPreference = profile_preferences.find(
      (preference) =>
        preference.MakeupPreferences.id ===
        parseInt(profile_preference.makeup_preference)
    );
    // if the user already has this preference, alert them
    if (existingPreference) {
      window.alert("You've already added this preference.");
    } else {
      // If not, add the preference
      const newProfilePreference = {
        Profile: CurrentProfile.id,
        MakeupPreferences: parseInt(profile_preference.makeup_preference),
      };
      // post the profile preference
      CreateProfilePreference(newProfilePreference).then(() => {
        window.alert(
          "Profile Preference Added! We recommend adding more for more product recommendations!"
        );
        // get the users profile preferences again
        UsersPrefrences();
      });
    }
  };

  const handleClickDeleteProfilePreference = (id, e) => {
    // prevent the default
    e.preventDefault();
    // delete the profile preference
    deleteProfilePrefrence(id).then(() => {
      // get the users profile preferences again
      UsersPrefrences();
    });
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
      <h1> {CurrentProfile.User?.first_name}'s Profile </h1>
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
                    <button
                      onClick={(e) => {
                        handleClickDeleteProfilePreference(preference.id, e);
                      }}
                    >
                      {" "}
                      Remove{" "}
                    </button>
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
