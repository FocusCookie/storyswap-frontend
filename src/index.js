import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from "react-router-dom";
import { MetadataProvider } from "./contexts/metadata.context";
import { ReceiverProvider } from "./contexts/receiver.context";
import { ApiTokenProvider } from "./contexts/apiToken.context";
import { LanguageProvider } from "./contexts/language.context";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="storyswap.eu.auth0.com"
      clientId="K02ZmIC9PSnGHfX3uG165VenI5OBOOQI"
      redirectUri={window.location.origin}
      audience="https://api.storyswap.app"
      scope="openid profile email"
    >
      <ApiTokenProvider>
        <QueryClientProvider client={queryClient}>
          <MetadataProvider>
            <LanguageProvider>
              <ReceiverProvider>
                <BrowserRouter>
                  <App />
                </BrowserRouter>
              </ReceiverProvider>
            </LanguageProvider>
          </MetadataProvider>
        </QueryClientProvider>
      </ApiTokenProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
