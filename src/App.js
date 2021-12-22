import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./styles/App.css";
import { Login } from "./views/Login/Login";
import { Home } from "./views/Home/Home";
import { Library } from "./views/Library/Library";
import { Messages } from "./views/Messages/Messages";
import { Settings } from "./views/Settings/Settings";
import { Routes, Route, useNavigate } from "react-router-dom";
import { RequireAuth } from "./components/RequireAuth/RequireAuth";
import { Navigation } from "./components/Navigation/Navigation";
import jwt_decode from "jwt-decode";

function App() {
  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();
  const [selectedNavItem, setSelectedNavItem] = useState("home");
  const [userMetadata, setUserMetadata] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      console.log(user);
      getAccessTokenSilently().then((token) => {
        console.log("token ", token);

        const decodedToken = jwt_decode(token);
        const metadata =
          decodedToken["https://api.storyswap.app/metadata"] || null;

        setUserMetadata(metadata);

        //TODO create an context for the metadata to access the metadata in the require auth to navigate to the onboarding view if the user is not onboarded (metadata.isOnboarded)

        console.log("metadata", metadata);
      });
    }
  }, [isAuthenticated]);

  function handleNavigationSelect(selected) {
    setSelectedNavItem(selected);
    navigate(`/${selected}`);
  }

  //TODO: hide nav if not logged in, redirect to login if logout

  return (
    <div className="App">
      <div className="App__content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/home"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="/library"
            element={
              <RequireAuth>
                <Library />
              </RequireAuth>
            }
          />
          <Route
            path="/messages"
            element={
              <RequireAuth>
                <Messages />
              </RequireAuth>
            }
          />
          <Route
            path="/settings"
            element={
              <RequireAuth>
                <Settings />
              </RequireAuth>
            }
          />
          <Route path="*" element={<Login />} />
        </Routes>
      </div>

      {isAuthenticated && userMetadata && userMetadata.isOnboarded && (
        <div className="App__navigation">
          <Navigation
            onSelect={handleNavigationSelect}
            select={selectedNavItem}
          />
        </div>
      )}
    </div>
  );
}

export default App;
