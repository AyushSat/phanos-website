import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import PRODUCTION_URL from "./constants.ts";
import { AuthProvider } from "react-oidc-context";

const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_AqjEcBPFO",
  client_id: "4get5f78j454a695eoj7r06k13",
  redirect_uri: import.meta.env.DEV ? "http://localhost:5173/" : PRODUCTION_URL,
  response_type: "code",
  scope: "aws.cognito.signin.user.admin email openid phone profile",
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <App />
    </AuthProvider>
  </StrictMode>,
)






    
