export const GetMakeupSkills = () => {
  return fetch(`http://localhost:8000/makeupskill`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  }).then((res) => res.json());
};

export const CreateProfile = (newProfile) => {
  return fetch(`http://localhost:8000/profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
    body: JSON.stringify(newProfile),
  }).then((res) => res.json());
};

export const CreateProfilePreference = (newProfilePreference) => {
  return fetch(`http://localhost:8000/profilepreferences`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
    body: JSON.stringify(newProfilePreference),
  }).then((res) => res.json());
};

export const getCurrentUser = () => {
  return fetch(`http://localhost:8000/users?current`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  }).then((res) => res.json());
};
