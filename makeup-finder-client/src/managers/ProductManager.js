export const GetAllProducts = () => {
  return fetch(`http://localhost:8000/products`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  }).then((res) => res.json());
};

export const CreateProduct = (newProduct) => {
  return fetch(`http://localhost:8000/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
    body: JSON.stringify(newProduct),
  }).then((res) => res.json());
};

export const DeleteProduct = (ProductId) => {
  return fetch(`http://localhost:8000/products/${ProductId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  });
};

export const GetAllProductTypes = () => {
  return fetch(`http://localhost:8000/producttypes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  }).then((res) => res.json());
};
export const GetAllPrefrences = () => {
  return fetch(`http://localhost:8000/makeuppreferences`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  }).then((res) => res.json());
};

export const EditProduct = (product) => {
  return fetch(`http://localhost:8000/products/${product.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
    body: JSON.stringify(product),
  });
};

export const getProductById = (productId) => {
  return fetch(`http://localhost:8000/products/${productId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  }).then((res) => res.json());
};

export const getProductReviews = (productId) => {
  return fetch(`http://localhost:8000/productreviews?product_id=${productId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  }).then((res) => res.json());
};

export const createProductReview = (newReview) => {
  return fetch(`http://localhost:8000/productreviews`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
    body: JSON.stringify(newReview),
  }).then((res) => res.json());
};

export const deleteProductReview = (reviewId) => {
  return fetch(`http://localhost:8000/productreviews/${reviewId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  });
};
