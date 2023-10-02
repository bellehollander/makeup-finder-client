import { GetAllPrefrences } from "../../managers/ProductManager";
import { GetAllProductTypes } from "../../managers/ProductManager";
import { useState, useEffect } from "react";
import "./ViewMakeupPreferences.css";

export const ViewMakeupPreferences = () => {
  // set up state for all of the makeup preferences
  const [makeup_preferences, setMakeupPreferences] = useState([]);
  // set up state for all of the product types
  const [product_types, setProductTypes] = useState([]);
  // set up state for the makeup preference to be added
  const [makeup_preference, setMakeupPreference] = useState({
    label: "",
    product_type: 0,
    image: "",
  });

  const [selectedCategory, setSelectedCategory] = useState(null); // State to track the selected category
  const [showCreateForm, setShowCreateForm] = useState(false); // State to manage the create form visibility
  // function to grab all of the makeup preferences from the API, and update the makeup preferences state
  const getMakeupPreferences = () => {
    return GetAllPrefrences().then((makeup_preferencesFromAPI) => {
      setMakeupPreferences(makeup_preferencesFromAPI);
    });
  };
  // function to grab all of the product types from the API, and update the product types state
  const getProductTypes = () => {
    return GetAllProductTypes().then((product_typesFromAPI) => {
      setProductTypes(product_typesFromAPI);
    });
  };
  // on inital render, get all of the makeup preferences and product types
  useEffect(() => {
    getMakeupPreferences();
    getProductTypes();
  }, []);
  // function to post a new makeup preference to the API
  const addMakeupPreference = (makeup_preference) => {
    const makeupPrefrencesToSave = {
      label: makeup_preference.label,
      product_type: parseInt(makeup_preference.product_type),
      image: makeup_preference.image,
    };

    fetch("http://localhost:8000/makeuppreferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
      },
      body: JSON.stringify(makeupPrefrencesToSave),
    })
      .then((res) => res.json())
      .then((newMakeupPreference) => {
        // re-render the makeup preferences
        getMakeupPreferences();
        // Close the create form
        setShowCreateForm(false);
      });
  };
  // function to delete the makeup preference from the API
  // then re-render the makeup preferences
  const deleteMakeupPreference = (makeup_preference_id) => {
    fetch(`http://localhost:8000/makeuppreferences/${makeup_preference_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
      },
    }).then(() => {
      getMakeupPreferences();
    });
  };

  const toggleCategory = (product_type_id) => {
    // Toggle the selected category
    if (selectedCategory === product_type_id) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(product_type_id);
    }
    // Close the create form
    setShowCreateForm(false);
  };

  return (
    <>
      <div className="tip-list-header">
        <h2> Makeup Preferences Manager</h2>
        <img
          className="sparkle-image"
          src="https://thumbs.dreamstime.com/b/yellow-original-bright-stars-sparkle-icon-glowing-light-effect-star-vector-illustration-yellow-original-bright-stars-sparkle-icon-192033133.jpg"
          alt="gold sparkle image"
        />
      </div>
      <div className="makeup-preferences-container">
        <div className="categories">
          <h2>Categories</h2>
          <ul>
            {product_types.map((product_type) => (
              <li
                key={product_type.id}
                onClick={() => toggleCategory(product_type.id)}
                className={`category-button ${
                  selectedCategory === product_type.id ? "selected" : ""
                }`}
              >
                {product_type.label}
              </li>
            ))}
          </ul>
        </div>
        <div className="makeup-preferences">
          <h2>Makeup Preferences</h2>
          <ul>
            {selectedCategory !== null &&
              makeup_preferences
                .filter(
                  (makeup_pref) =>
                    makeup_pref.product_type.id === selectedCategory
                )
                .map((makeup_pref) => (
                  <li key={makeup_pref.id}>
                    {makeup_pref.label}
                    <img src={makeup_pref.image} alt={makeup_pref.label} />
                    <button
                      onClick={() => {
                        deleteMakeupPreference(makeup_pref.id);
                      }}
                    >
                      Delete
                    </button>
                  </li>
                ))}
          </ul>
        </div>
        <div className="create-form" id="create-prefrence">
          {/* Button to toggle the create form */}
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="create-button"
          >
            Create Makeup Preference
          </button>

          {/* Conditional rendering of the create form */}
          {showCreateForm && (
            <div>
              <h2 className="create-header">Create Makeup Preference</h2>
              <form
                id="create-form-prefrence"
                onSubmit={(event) => {
                  event.preventDefault();
                  addMakeupPreference(makeup_preference);
                }}
              >
                <label>
                  Label:
                  <input
                    type="text"
                    name="label"
                    value={makeup_preference.label}
                    onChange={(event) => {
                      const copy = { ...makeup_preference };
                      copy.label = event.target.value;
                      setMakeupPreference(copy);
                    }}
                  />
                </label>
                <br />
                <label>
                  Product Type:
                  <select
                    name="product_type"
                    value={makeup_preference.product_type}
                    onChange={(event) => {
                      const copy = { ...makeup_preference };
                      copy.product_type = event.target.value;
                      setMakeupPreference(copy);
                    }}
                  >
                    <option value="0">Select a product type</option>
                    {product_types.map((product_type) => (
                      <option key={product_type.id} value={product_type.id}>
                        {product_type.label}
                      </option>
                    ))}
                  </select>
                </label>
                <br />
                <label>
                  Image URL:
                  <input
                    type="text"
                    name="image"
                    value={makeup_preference.image}
                    onChange={(event) => {
                      const copy = { ...makeup_preference };
                      copy.image = event.target.value;
                      setMakeupPreference(copy);
                    }}
                  />
                </label>
                <br />
                <button type="submit" className="create-button">
                  Create
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
