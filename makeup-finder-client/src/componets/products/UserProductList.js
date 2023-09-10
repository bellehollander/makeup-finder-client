import { GetAllProducts } from "../../managers/ProductManager";
import { useState, useEffect } from "react";
import { getCurrentUserProfile } from "../../managers/UserManager";
import { getAllProfilePrefrences } from "../../managers/PrefrencesManager";
import { PostWishList } from "../../managers/WishListManager";
import { getWishList } from "../../managers/WishListManager";

export const UserProductList = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [profilePreferences, setProfilePreferences] = useState([]);
  const [currentProfile, setCurrentProfile] = useState({});
  const [wishList, setWishList] = useState([]);

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

  const getWishListItems = () => {
    return getWishList().then((wishListFromAPI) => {
      const currentWishList = wishListFromAPI.filter(
        (wishListItem) => wishListItem.profile.id === currentProfile?.id
      );
      setWishList(currentWishList);
    });
  };

  useEffect(() => {
    getWishListItems();
  }, [currentProfile]);

  const addToWishList = (productId) => {
    const newWishListItem = {
      profile: currentProfile.id,
      product: productId,
    };
    PostWishList(newWishListItem).then(() => {
      getWishListItems();
    });
  };

  return (
    <>
      <h1>Products</h1>
      <div className="products">
        {products
          .filter((product) =>
            profilePreferences.some(
              (profilePreference) =>
                profilePreference.MakeupPreferences.id ===
                product.makeup_preferences.id
            )
          )
          .map((product) => {
            // Check if the product is in the wish list
            const isProductInWishList = wishList.some(
              (wishListItem) => wishListItem.product.id === product.id
            );

            return (
              <div key={product.id} className="product">
                <h2>{product.label}</h2>
                <p>{product.brand}</p>
                <p>{product.description}</p>
                <img src={product.image} alt="product image" />
                <p> $ {product.price}0</p>

                {isProductInWishList ? (
                  <p>This product is already in your wish list!</p>
                ) : (
                  <button onClick={() => addToWishList(product.id)}>
                    Add Product to Wish List
                  </button>
                )}
              </div>
            );
          })}
      </div>
    </>
  );
};
