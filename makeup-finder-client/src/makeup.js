import { useState } from "react";
import { ApplicationViews } from "./componets/views/ApplicationViews";
import { NavBar } from "./componets/nav/NavBar";

export const MakeupFinder = () => {
  // set up the state variable for the token and the function to set the token
  const [token, setTokenState] = useState(localStorage.getItem("auth_token"));
  // set up the state for the makeup_admin status and the function to set the makeup_admin status
  const [isMakeupAdmin, setIsMakeupAdmin] = useState(
    localStorage.getItem("makeup_admin")
  );
  // create a function to set the token in local storage and in state
  const setToken = (newToken) => {
    localStorage.setItem("auth_token", newToken);
    setTokenState(newToken);
  };
  // function to set the makeup_admin status in local storage and in state
  const setMakeupAdmin = (isStaff) => {
    localStorage.setItem("makeup_admin", isStaff);
    setIsMakeupAdmin(isStaff);
    console.log(isStaff);
  };
  // pass everything as props to the NavBar and ApplicationViews components
  return (
    <>
      <NavBar
        token={token}
        setToken={setToken}
        isAdmin={JSON.parse(isMakeupAdmin)}
        setAdmin={setMakeupAdmin}
      />
      <ApplicationViews
        token={token}
        setToken={setToken}
        isAdmin={JSON.parse(isMakeupAdmin)}
        setAdmin={setMakeupAdmin}
      />
    </>
  );
};
