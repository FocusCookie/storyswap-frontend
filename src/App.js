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
import { useMetadata } from "./contexts/metadata.context";
import { useApiToken } from "./contexts/apiToken.context";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { user as userApi } from "./services/api.servise";

function App() {
  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();
  const { metadataState, metadataDispatch } = useMetadata();
  const { apiTokenState, apiTokenDispatch } = useApiToken();
  const [selectedNavItem, setSelectedNavItem] = useState("home");
  const [getMetadata, setGetMetadata] = useState(false);
  const navigate = useNavigate();

  const { isLoading: metadataIsLoading, data: metadata } = useQuery(
    "metadata",
    async () => {
      return await userApi.getMetadata(apiTokenState?.value);
    },
    {
      enabled: getMetadata,
    }
  );

  useEffect(() => {
    if (!metadataIsLoading && metadata) {
      metadataDispatch({ type: "setMetadata", payload: metadata });
      setGetMetadata(false);
    }
  }, [metadataIsLoading]);

  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently().then((token) => {
        apiTokenDispatch({ type: "setApiToken", payload: token });
        setGetMetadata(true);
      });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    //TODO remove in production
    if (isAuthenticated) console.log(" metadata ", metadataState);
    if (isAuthenticated) console.log(" apiTokenState ", apiTokenState);
  }, [metadataState, apiTokenState]);

  function handleNavigationSelect(selected) {
    setSelectedNavItem(selected);
    navigate(`/${selected}`);
  }

  //TODO: Implement when no metadata and isONboarded false show onboarding route need to be included in the require auth ?

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

      {isAuthenticated && (
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
