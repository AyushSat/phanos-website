import { useState, useEffect } from 'react'
import './App.css'
import { useAuth } from "react-oidc-context";
import {PRODUCTION_URL, DEV_URL} from "./constants.ts";

function Landing() {
    const auth = useAuth();

    // const signOutRedirect = () => {
    //   const clientId = "4get5f78j454a695eoj7r06k13";
    //   const logoutUri = import.meta.env.DEV ? DEV_URL : PRODUCTION_URL;
    //   const cognitoDomain = "https://aesthetichomographya7ad08f01-7ad08f01-dev.auth.us-east-2.amazoncognito.com";
    //   window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
    // };  
  
    const [data, setData] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const apiUrl = import.meta.env.VITE_API_URL;
    useEffect(() => {
      const fetchData = async () => {
        try {
          if(auth.isAuthenticated){
            const token = auth.user?.id_token; // can also be access token
            const response = await fetch(apiUrl, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            if (!response.ok) {
              setError("HTTP Error occured...");
            }
            const result = (await response.json())["message"];
            setData(result);
          }else{
            setData("Log in first!");
          }
        } catch (err) {
          setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [auth.isAuthenticated]);
  
    let authElements: JSX.Element | null;
  
  
    if (auth.isLoading) {
      authElements = <div>Loading...</div>;
    }else if(auth.error){
      authElements = <div>Encountering error... {auth.error.message}</div>;
    }else if (auth.isAuthenticated) {
      authElements =  (
        <div>
          <pre> Hello: {auth.user?.profile.email} </pre>
          <pre> ID Token: {auth.user?.id_token} </pre>
          <pre> Access Token: {auth.user?.access_token} </pre>
          <pre> Refresh Token: {auth.user?.refresh_token} </pre>
  
          <button onClick={() => auth.signoutRedirect()}>Sign out</button>
          <a href='/checkout'>Checkout</a>
        </div>
      );
    }else{
      authElements = (
        <div>
          <button onClick={() => auth.signinRedirect()}>Sign in</button>
        </div>
      );
    }

    return <>
        <h1>Phanos Website!</h1>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {data && <p>Backend Response: {data}</p>}
        <h3>Auth portion</h3>
        {authElements}
    </>
}

export default Landing;