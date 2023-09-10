export const getAllEyelinerPrefrences = () => {
  return fetch(`http://localhost:8000/makeupprefrences?eyeliner`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  }).then((res) => res.json());
};
export const getAllEyeshadowPrefrences = () => {
  return fetch(`http://localhost:8000/makeupprefrences?eyeshadow`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  }).then((res) => res.json());
};
export const getAllLipstickPrefrences = () => {
  return fetch(`http://localhost:8000/makeupprefrences?lipstick`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  }).then((res) => res.json());
};
export const getAllBlushPrefrences = () => {
  return fetch(`http://localhost:8000/makeupprefrences?blush`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  }).then((res) => res.json());
};
export const getAllMascaraPrefrences = () => {
  return fetch(`http://localhost:8000/makeupprefrences?mascara`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  }).then((res) => res.json());
};
export const getAllContourPrefrences = () => {
  return fetch(`http://localhost:8000/makeupprefrences?contour`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  }).then((res) => res.json());
};
export const getAllFoundationPrefrences = () => {
  return fetch(`http://localhost:8000/makeupprefrences?foundation`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  }).then((res) => res.json());
};
export const getAllConcealerPrefrences = () => {
  return fetch(`http://localhost:8000/makeupprefrences?concealer`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  }).then((res) => res.json());
};
export const getHighlighterAllPrefrences = () => {
  return fetch(`http://localhost:8000/makeupprefrences?highlighter`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  }).then((res) => res.json());
};
export const getAllBronzerPrefrences = () => {
  return fetch(`http://localhost:8000/makeupprefrences?bronzer`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  }).then((res) => res.json());
};

export const getAllProfilePrefrences = () => {
  return fetch(`http://localhost:8000/profilepreferences`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  }).then((res) => res.json());
};
