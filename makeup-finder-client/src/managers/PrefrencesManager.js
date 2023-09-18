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

export const deleteProfilePrefrence = (profilePrefrenceId) => {
  return fetch(
    `http://localhost:8000/profilepreferences/${profilePrefrenceId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
      },
    }
  );
};
