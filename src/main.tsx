import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import {PRODUCTION_URL, DEV_URL} from "./constants.ts";
import { AuthProvider } from "react-oidc-context";
import { WebStorageStateStore } from 'oidc-client-ts';

const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_AqjEcBPFO",
  client_id: "4get5f78j454a695eoj7r06k13",
  redirect_uri: (import.meta.env.DEV ? DEV_URL : PRODUCTION_URL) + "callback/",
  response_type: "code",
  scope: "aws.cognito.signin.user.admin email openid phone profile",
  post_logout_redirect_uri: import.meta.env.DEV ? DEV_URL : PRODUCTION_URL,
  stateStore: new WebStorageStateStore({ store: window.localStorage }),
  onSigninCallback: () => {
    window.history.replaceState(
      {},
      document.title,
      window.location.pathname
    );
  }
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider {...cognitoAuthConfig}>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
