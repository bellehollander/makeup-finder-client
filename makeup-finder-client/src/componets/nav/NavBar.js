import { AdminNav } from "./AdminNav";
import { UserNav } from "./UserNav";
// pass the props fro the makeup component to the AdminNav and UserNav components
export const NavBar = ({ token, setToken, isAdmin }) => {
  let displayNav = <></>;

  if (isAdmin) {
    displayNav = (
      <AdminNav token={token} setToken={setToken} isAdmin={isAdmin} />
    );
  } else {
    displayNav = (
      <UserNav token={token} setToken={setToken} isAdmin={isAdmin} />
    );
  }
  return displayNav;
};
