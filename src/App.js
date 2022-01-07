import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./styles/App.css";
import { Login } from "./views/Login/Login";
import { Home } from "./views/Home/Home";
import { Onboarding } from "./views/Onboarding/Onboarding";
import { Library } from "./views/Library/Library";
import { Messages } from "./views/Messages/Messages";
import { Chat } from "./views/Chat/Chat";
import { Settings } from "./views/Settings/Settings";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { RequireAuth } from "./components/RequireAuth/RequireAuth";
import { Navigation } from "./components/Navigation/Navigation";
import { useMetadata } from "./contexts/metadata.context";
import { useLanguage } from "./contexts/language.context";
import { useApiToken } from "./contexts/apiToken.context";
import { useQuery } from "react-query";
import { user as userApi } from "./services/api.servise";

function App() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { languageState, languageDispatch } = useLanguage();
  const { metadataDispatch } = useMetadata();
  const { apiTokenState, apiTokenDispatch } = useApiToken();
  const location = useLocation();
  const [selectedNavItem, setSelectedNavItem] = useState("home");
  const [getMetadata, setGetMetadata] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const browserLanguage =
      window.navigator.userLanguage || window.navigator.language;
    languageDispatch({ type: "setLanguage", payload: browserLanguage });
  }, []);

  const {
    isLoading: metadataIsLoading,
    isSuccess: metadataIsSuccess,
    data: metadata,
  } = useQuery(
    "metadata",
    async () => {
      return await userApi.getMetadata(apiTokenState?.value);
    },
    {
      enabled: getMetadata,
    }
  );

  useEffect(() => {
    if (!metadataIsLoading && metadataIsSuccess) {
      metadataDispatch({ type: "setMetadata", payload: metadata });

      if (metadata?.language)
        languageDispatch({ type: "setLanguage", payload: metadata.language });

      setGetMetadata(false);

      if (metadata && !metadata.isOnboarded) {
        navigate("/onboarding");
      }
    }
  }, [metadataIsLoading, metadata]);

  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently().then((token) => {
        apiTokenDispatch({ type: "setApiToken", payload: token });
        setGetMetadata(true);
      });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (location.pathname.includes("messages")) setSelectedNavItem("messages");
    if (location.pathname.includes("home")) setSelectedNavItem("home");
  }, [location.pathname]);

  function handleNavigationSelect(selected) {
    setSelectedNavItem(selected);
    navigate(`/${selected}`);
  }

  return (
    <div className="App">
      <div className="App__content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/onboarding"
            element={
              <RequireAuth>
                <Onboarding />
              </RequireAuth>
            }
          />
          <Route
            path="/home"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="/library/:init"
            element={
              <RequireAuth>
                <Library />
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
            path="/messages/sub/:sub"
            element={
              <RequireAuth>
                <Chat />
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

      {isAuthenticated && location.pathname !== "/onboarding" && (
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
