import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./styles/App.css";
import logo from "./logo.svg";

function App() {
  const {
    loginWithRedirect,
    isAuthenticated,
    getAccessTokenSilently,

    logout,
    user,
  } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      console.log(user);
      getAccessTokenSilently().then((res) => console.log(res));
    }
  }, [isAuthenticated]);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={() => loginWithRedirect()}>Login</button>
        {isAuthenticated && (
          <button onClick={() => logout({ returnTo: window.location.origin })}>
            Log Out
          </button>
        )}
        {isAuthenticated && (
          <div>
            <img src={user.picture} alt={user.name} />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
