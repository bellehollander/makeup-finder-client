import React, { useEffect, useState } from "react";
import { CreateProfilePreference } from "../../managers/SkillManager";
import { GetAllPrefrences } from "../../managers/ProductManager";
import { getCurrentUserProfile } from "../../managers/UserManager";
import {
  getAllProfilePrefrences,
  deleteProfilePrefrence,
} from "../../managers/PrefrencesManager";
import { GetAllProductTypes } from "../../managers/ProductManager";
import "./Profile.css";

export const Profile = ({ token }) => {

  // set up inital state for makeup preferences
  const [makeupPreferences, setMakeupPreferences] = useState([]);
  // set up inital state for product types
  const [productTypes, setProductTypes] = useState([]);
  // set up inital state for selected product type
  const [selectedProductType, setSelectedProductType] = useState(null);
  // set up inital state for current profile
  const [CurrentProfile, setProfile] = useState({});
  // set up inital state for profile preferences
  const [profilePreferences, setProfilePreferences] = useState([]);
// use effect to get the current user profile and update the current profile state, listening for a change in the token
  useEffect(() => {
    getCurrentUserProfile(token).then((author) => {
      setProfile(author);
    });
  }, [token]);
// function to get all of the makeup preferences from the API and update the makeup preferences state
  const getMakeupPreferences = () => {
    return GetAllPrefrences().then((makeupPreferencesFromAPI) => {
      setMakeupPreferences(makeupPreferencesFromAPI);
    });
  };
// function to get all of the product types from the API and update the product types state
  const getProductTypes = () => {
    return GetAllProductTypes().then((productTypesFromAPI) => {
      setProductTypes(productTypesFromAPI);
    });
  };
// useEffect to get all makeup preferences and product types on inital render
  useEffect(() => {
    getMakeupPreferences();
    getProductTypes();
  }, []);
// function to get all profile preferences from the API and update the profile preferences state
// filter the profile preferences to only grab the ones that matches the current profile
  const getUsersPreferences = () => {
    getAllProfilePrefrences().then((profilePreferencesFromAPI) => {
      const currentPreferences = profilePreferencesFromAPI.filter(
        (profilePreference) =>
          profilePreference.Profile.id === CurrentProfile?.id
      );
      setProfilePreferences(currentPreferences);
    });
  };
// when a change in the current profile is detected, get the users preferences
  useEffect(() => {
    getUsersPreferences();
  }, [CurrentProfile]);
// function to handle the click of the save button on the profile preferences
  const handleClickSaveProfilePreference = (event, preferenceId) => {
    // prevent the default action of the button
    event.preventDefault();
    // check to see if the user already has this preference
    const existingPreference = profilePreferences.find(
      (preference) => preference.MakeupPreferences.id === preferenceId
    );
// if the user already has this preference, remove it, if not add it
    if (existingPreference) {
      // User already has this preference, remove it
      handleClickDeleteProfilePreference(existingPreference.id);
    } else {
      // User doesn't have this preference, add it
      const newProfilePreference = {
        Profile: CurrentProfile.id,
        MakeupPreferences: preferenceId,
      };
// call the create profile preference function and then get the users preferences to update the page
      CreateProfilePreference(newProfilePreference).then(() => {
        getUsersPreferences();
      });
    }
  };
// function to handle the click of the delete button on the profile preferences
// then get the users preferences to update the page
  const handleClickDeleteProfilePreference = (id) => {
    deleteProfilePrefrence(id).then(() => {
      getUsersPreferences();
    });
  };
// filter the makeup preferences to only grab the ones that match the selected product type
  const preferencesForSelectedType = makeupPreferences.filter(
    (preference) => preference.product_type.id === selectedProductType
  );

  return (
    <>
      <div className="tip-list-header">
        <h2> {CurrentProfile.User?.first_name}'s Profile</h2>
        <img
          className="sparkle-image"
          src="https://thumbs.dreamstime.com/b/yellow-original-bright-stars-sparkle-icon-glowing-light-effect-star-vector-illustration-yellow-original-bright-stars-sparkle-icon-192033133.jpg"
          alt="gold sparkle image"
        />
      </div>
      <div className="makeup-preferences-container">
        <div className="categories">
          <h2>Product Types</h2>
          <ul>
            {productTypes.map((productType) => (
              <li
                key={productType.id}
                onClick={() => setSelectedProductType(productType.id)}
                className={`category-button ${
                  selectedProductType === productType.id ? "selected" : ""
                }`}
              >
                {productType.label}
              </li>
            ))}
          </ul>
        </div>
        <div className="makeup-preferences">
          <h2>Makeup Preferences</h2>
          <ul>
            {preferencesForSelectedType.map((preference) => (
              <li key={preference.id}>
                {preference.label}
                <img src={preference.image} />
                <button
                  onClick={(e) =>
                    handleClickSaveProfilePreference(e, preference.id)
                  }
                >
                  {profilePreferences.some(
                    (pref) => pref.MakeupPreferences.id === preference.id
                  )
                    ? "Remove"
                    : "Add"}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="create-form">
          <h2>Your Makeup Preferences</h2>
          <ul>
            {profilePreferences.map((preference) => (
              <li key={preference.id}>
                {preference.MakeupPreferences.label}
                <img
                  className="prefrence-image"
                  src={preference.MakeupPreferences.image}
                />
                <button
                  className="category-button"
                  onClick={() =>
                    handleClickDeleteProfilePreference(preference.id)
                  }
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
