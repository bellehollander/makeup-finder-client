import { GetAllProducts } from "../../managers/ProductManager";
import { useState, useEffect } from "react";
import { getCurrentUserProfile } from "../../managers/UserManager";
import { getAllProfilePrefrences } from "../../managers/PrefrencesManager";

export const UserProductList = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [profilePreferences, setProfilePreferences] = useState([]);
  const [currentProfile, setCurrentProfile] = useState({});

  const getProducts = () => {
    return GetAllProducts().then((productsFromAPI) => {
      setProducts(productsFromAPI);
    });
  };

  const UsersPrefrences = () => {
    getAllProfilePrefrences().then((profilePreferencesFromAPI) => {
      const currentPrefrences = profilePreferencesFromAPI.filter(
        (profilePreference) =>
          profilePreference.Profile.id === currentProfile?.id
      );
      setProfilePreferences(currentPrefrences);
    });
  };

  useEffect(() => {
    getCurrentUserProfile(token).then((userProfile) => {
      setCurrentProfile(userProfile);
    });
  }, [token]);

  useEffect(() => {
    UsersPrefrences();
  }, [currentProfile]);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <h1>Products</h1>
      <div className="products">
        {products.map((product) => {
          // Check if the product's makeup_preference ID matches any of the user's profile preferences
          const matchesProfilePreference = profilePreferences.some(
            (profilePreference) =>
              profilePreference.MakeupPreferences.id ===
              product.makeup_preferences.id
          );

          if (matchesProfilePreference) {
            return (
              <div key={product.id} className="product">
                <h2>{product.name}</h2>
                <p>{product.brand}</p>
                <p>{product.description}</p>
                <img src={product.image} alt="product image" />
                <p> $ {product.price}0</p>
              </div>
            );
          }

          return null;
        })}
      </div>
    </>
  );
};
