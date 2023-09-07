export const GetAllTips = () => {
  return fetch(`http://localhost:8000/tips`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  }).then((res) => res.json());
};

export const CreateTip = (newTip) => {
  return fetch(`http://localhost:8000/tips`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
    body: JSON.stringify(newTip),
  }).then((res) => res.json());
};
