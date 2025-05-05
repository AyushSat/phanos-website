import { useCallback, useEffect } from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import { useAuth } from "react-oidc-context";
import { useLocation } from 'react-router-dom';

const stripePromise = loadStripe("pk_test_51RKmQdEJNDgJoqWpveNfMCjwkfuLMs5Jnj02eVxIGNKfWcD9Vrqdh6ctBMnsQnbKkmN8tJRzB9GhjwGmC2Pn07JJ00EiAvPvq2");

const CheckoutForm = () => {
    const auth = useAuth();
    const location = useLocation();

    useEffect(() => {
        if(!auth.isAuthenticated){
            auth.signinRedirect({
                state: { from: location.pathname }
            });
        }
    }, [auth.isAuthenticated])
    const fetchClientSecret = useCallback((): Promise<string> => {
        console.log("useCallback called", auth.isAuthenticated)
        if(auth.isAuthenticated){
            return fetch(import.meta.env.VITE_API_URL + "/create-checkout-session", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${auth.user?.id_token}`,
                    },
                })
                .then((res) => res.json())
                .then((data) => data.clientSecret);
        }else{
            return new Promise((resolve, _) => {
                resolve("This won't work, just for type safety and not wasting an API call");
              });
        }
    }, [auth.isAuthenticated]);

    if(auth.isAuthenticated){
        const options = {fetchClientSecret};
        return (
            <div id="checkout">
            <EmbeddedCheckoutProvider
                stripe={stripePromise}
                options={(options)}
            >
                <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
            </div>
        )
    }else{
        return <div>Log in first.</div>
    }

    
}

export default CheckoutForm;