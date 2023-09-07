import { useState } from "react";
import { ApplicationViews } from "./componets/views/ApplicationViews";
import { NavBar } from "./componets/nav/NavBar";

export const MakeupFinder = () => {
  const [token, setTokenState] = useState(localStorage.getItem("auth_token"));
  const [isMakeupAdmin, setIsMakeupAdmin] = useState(
    localStorage.getItem("makeup_admin")
  );

  const setToken = (newToken) => {
    localStorage.setItem("auth_token", newToken);
    setTokenState(newToken);
  };

  const setMakeupAdmin = (isStaff) => {
    localStorage.setItem("makeup_admin", isStaff);
    setIsMakeupAdmin(isStaff);
    console.log(isStaff);
  };

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
