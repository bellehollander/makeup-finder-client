export const getWishList = () => {
  return fetch(`http://localhost:8000/wishlist`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  }).then((res) => res.json());
};

export const PostWishList = (newWishList) => {
  return fetch(`http://localhost:8000/wishlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
    body: JSON.stringify(newWishList),
  }).then((res) => res.json());
};

export const DeleteWishList = (wishListId) => {
  return fetch(`http://localhost:8000/wishlist/${wishListId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  });
};
