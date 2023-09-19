import { getWishList } from "../../managers/WishListManager";
import { getCurrentUserProfile } from "../../managers/UserManager";
import { useState, useEffect } from "react";
import { DeleteWishList } from "../../managers/WishListManager";

export const WishList = ({ token }) => {
  // set up inital state for wish list
  const [wishList, setWishList] = useState([]);
  // set up inital state for current profile
  const [currentProfile, setCurrentProfile] = useState({});
  // fucntion to get all wish list items from the API and update the wish list state
  // filter the wish list items to only grab the ones that matches the current profile
  const getWishListItems = () => {
    return getWishList().then((wishListFromAPI) => {
      const currentWishList = wishListFromAPI.filter(
        (wishListItem) => wishListItem.profile.id === currentProfile?.id
      );
      setWishList(currentWishList);
    });
  };
  // useEffect to get the current user profile and update the current profile state
  // listening for a change in the token state
  useEffect(() => {
    getCurrentUserProfile(token).then((userProfile) => {
      setCurrentProfile(userProfile);
    });
  }, [token]);
  // depending on the current profile, grab the wish list items
  useEffect(() => {
    getWishListItems();
  }, [currentProfile]);
  // function to delete a wish list item from the API then update the state
  // grab the wish list items again to update the state
  const deleteWishListItem = (wishListItemId) => {
    DeleteWishList(wishListItemId).then(() => {
      getWishListItems();
    });
  };
  const totalPrice = wishList.reduce((acc, wishListItem) => {
    return acc + parseInt(wishListItem.product.price);
  }, 0);

  console.log(totalPrice);
  return (
    <>
      <div className="tip-list-header">
        <h1 className="header-tips">
          {currentProfile.User?.first_name}'s Wish List!{" "}
        </h1>
        <img
          className="sparkle-image"
          src="https://thumbs.dreamstime.com/b/yellow-original-bright-stars-sparkle-icon-glowing-light-effect-star-vector-illustration-yellow-original-bright-stars-sparkle-icon-192033133.jpg"
          alt="gold sparkle image"
        />
      </div>
      <div className="products">
        {wishList.map((wishListItem) => {
          return (
            <div className="product-card" key={wishListItem.id}>
              <h2 className="product-label">{wishListItem.product.label}</h2>
              <p className="product-brand">{wishListItem.product.brand}</p>
              <p className="product-link"> {wishListItem.product.link} </p>
              <img
                className="product-image"
                src={wishListItem.product.image}
                alt="product image"
              />
              <p>{wishListItem.product.description}</p>
              <p className="price">Price: ${wishListItem.product.price}</p>
              <button
                onClick={() => {
                  deleteWishListItem(wishListItem.id);
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
        <div className="cart-total">
          <h3>Cart Total:</h3>
          <span className="total-price">${totalPrice}</span>
        </div>
      </div>
    </>
  );
};
