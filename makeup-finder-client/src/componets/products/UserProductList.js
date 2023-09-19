import { GetAllProducts } from "../../managers/ProductManager";
import { useState, useEffect } from "react";
import { getCurrentUserProfile } from "../../managers/UserManager";
import { getAllProfilePrefrences } from "../../managers/PrefrencesManager";
import { PostWishList } from "../../managers/WishListManager";
import { getWishList } from "../../managers/WishListManager";
import { Link, useNavigate } from "react-router-dom";
import { ProductDetailList } from "./productDetailList";

import "./ProductList.css";

export const UserProductList = ({ token }) => {
  // set up inital state for products
  const [products, setProducts] = useState([]);
  // set up inital state for profile preferences
  const [profilePreferences, setProfilePreferences] = useState([]);
  // set up inital state for current profile
  const [currentProfile, setCurrentProfile] = useState({});
  // set up inital state for wish list
  const [wishList, setWishList] = useState([]);
  const navigate = useNavigate();

  // function to get all products from the API and update the product state
  const getProducts = () => {
    return GetAllProducts().then((productsFromAPI) => {
      setProducts(productsFromAPI);
    });
  };
  // function to get all profile preferences from the API and update the profile preferences state
  // filter the profile preferences to only grab the ones that matches the current profile
  const UsersPrefrences = () => {
    getAllProfilePrefrences().then((profilePreferencesFromAPI) => {
      const currentPrefrences = profilePreferencesFromAPI.filter(
        (profilePreference) =>
          profilePreference.Profile.id === currentProfile?.id
      );
      setProfilePreferences(currentPrefrences);
    });
  };
  // useEffect to get the current user profile and update the current profile state
  // listening for a change in the token state
  useEffect(() => {
    getCurrentUserProfile(token).then((userProfile) => {
      setCurrentProfile(userProfile);
    });
  }, [token]);
  // on inital render grab the user profile prefrences depending on the current profile
  useEffect(() => {
    UsersPrefrences();
  }, [currentProfile]);
  // on inital render grab all products
  useEffect(() => {
    getProducts();
  }, []);
  // function to get all wish list items from the API then update the state
  // filter the wish list items to only grab the ones that matches the current profile
  const getWishListItems = () => {
    return getWishList().then((wishListFromAPI) => {
      const currentWishList = wishListFromAPI.filter(
        (wishListItem) => wishListItem.profile.id === currentProfile?.id
      );
      setWishList(currentWishList);
    });
  };
  // depending on the current profile, grab the wish list items
  useEffect(() => {
    getWishListItems();
  }, [currentProfile]);
  // function to add a product to the wish list
  const addToWishList = (productId) => {
    const newWishListItem = {
      profile: currentProfile.id,
      product: productId,
    };
    PostWishList(newWishListItem).then(() => {
      getWishListItems();
    });
  };

  // want a function that adds the price of all the products in the wish list
  // then display the total price of all the products in the wish list

  return (
    <>
      <div className="tip-list-header">
        <h1 className="header-tips">
          {" "}
          {currentProfile.User?.first_name}'s Products!{" "}
        </h1>
        <img
          className="sparkle-image"
          src="https://thumbs.dreamstime.com/b/yellow-original-bright-stars-sparkle-icon-glowing-light-effect-star-vector-illustration-yellow-original-bright-stars-sparkle-icon-192033133.jpg"
          alt="gold sparkle image"
        />
      </div>
      <div className="products-container">
        {products
          .filter((product) =>
            profilePreferences.some(
              (profilePreference) =>
                profilePreference.MakeupPreferences.id ===
                product.makeup_preferences.id
            )
          )
          .map((product) => {
            const isProductInWishList = wishList.some(
              (wishListItem) => wishListItem.product.id === product.id
            );

            return (
              <div key={product.id} className="product-card">
                <h2
                  className="product-label"
                  onClick={() => {
                    navigate(`/productDetailList/${product.id}`);
                  }}
                >
                  {product.label}
                </h2>
                <p className="product-brand">{product.brand}</p>

                <img
                  className="product-image"
                  src={product.image}
                  alt="product image"
                />
                <p className="price">$ {product.price}0</p>
                <div className="wishlist">
                  {isProductInWishList ? (
                    <p id="added">This product is in your wishlist</p>
                  ) : (
                    <button onClick={() => addToWishList(product.id)}>
                      Add to Wishlist
                    </button>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};
