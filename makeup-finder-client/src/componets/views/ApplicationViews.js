import { AdminViews } from "./AdminViews";
import { UserViews } from "./UserViews";
// passing down all the props from the makeup component to the AdminViews and UserViews components
export const ApplicationViews = ({ token, setToken, isAdmin, setAdmin }) => {
  if (isAdmin) {
    return (
      <AdminViews
        token={token}
        setToken={setToken}
        isAdmin={isAdmin}
        setAdmin={setAdmin}
      />
    );
  } else {
    return (
      <UserViews
        token={token}
        setToken={setToken}
        isAdmin={isAdmin}
        setAdmin={setAdmin}
      />
    );
  }
};
