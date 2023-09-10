import { getWishList } from "../../managers/WishListManager";
import { getCurrentUserProfile } from "../../managers/UserManager";
import { useState, useEffect } from "react";
import { DeleteWishList } from "../../managers/WishListManager";

export const WishList = ({ token }) => {
  const [wishList, setWishList] = useState([]);
  const [currentProfile, setCurrentProfile] = useState({});

  const getWishListItems = () => {
    return getWishList().then((wishListFromAPI) => {
      const currentWishList = wishListFromAPI.filter(
        (wishListItem) => wishListItem.profile.id === currentProfile?.id
      );
      setWishList(currentWishList);
    });
  };

  useEffect(() => {
    getCurrentUserProfile(token).then((userProfile) => {
      setCurrentProfile(userProfile);
    });
  }, [token]);

  useEffect(() => {
    getWishListItems();
  }, [currentProfile]);

  const deleteWishListItem = (wishListItemId) => {
    DeleteWishList(wishListItemId).then(() => {
      getWishListItems();
    });
  };

  return (
    <>
      <h1>Wish List</h1>
      <div className="wishList">
        {wishList.map((wishListItem) => {
          return (
            <div key={wishListItem.id}>
              <h2>{wishListItem.product.label}</h2>
              <p>{wishListItem.product.brand}</p>
              <p> {wishListItem.product.link} </p>
              <img src={wishListItem.product.image} alt="product image" />
              <p>{wishListItem.product.description}</p>
              <p>Price: ${wishListItem.product.price}</p>
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
      </div>
    </>
  );
};
