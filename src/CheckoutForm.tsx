import { useCallback, useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import { useAuth } from "react-oidc-context";
import { useLocation } from 'react-router-dom';
import Header from './Header';

const stripePromise = loadStripe("pk_test_51RKmQdEJNDgJoqWpveNfMCjwkfuLMs5Jnj02eVxIGNKfWcD9Vrqdh6ctBMnsQnbKkmN8tJRzB9GhjwGmC2Pn07JJ00EiAvPvq2");

const CheckoutForm = () => {
  const auth = useAuth();
  const location = useLocation();
  
  const [loadingPremium, setLoadingPremium] = useState(true);
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      auth.signinRedirect({
        state: { from: location.pathname }
      });
    }
  }, []);

  useEffect(() => {
    if (auth.isAuthenticated && auth.user?.profile.email) {
      fetch(import.meta.env.VITE_API_URL + `get-status?email=${auth.user.profile.email}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${auth.user?.id_token}`,
        'Content-Type': 'application/json',
        }
      })
      .then((res) => res.json())
      .then((data) => {
        setIsPremium(data.premium.BOOL);
        setLoadingPremium(false);
      })
      .catch((error) => {
        console.error('Error fetching premium status:', error);
        setLoadingPremium(false);
      });
    }
  }, [auth.isAuthenticated, auth.user?.profile.email]);

  

  const fetchClientSecret = useCallback((): Promise<string> => {
    if (auth.isAuthenticated) {
      return fetch(import.meta.env.VITE_API_URL + "create-checkout-session", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${auth.user?.id_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: auth.user?.profile.email
        })
      })
        .then((res) => res.json())
        .then((data) => data.clientSecret);
    } else {
      return new Promise((resolve) => {
        resolve("This won't work, just for type safety and not wasting an API call");
      });
    }
  }, [auth.isAuthenticated, auth.user?.profile.email]);

  if (!auth.isAuthenticated || loadingPremium) {
    return <div>Logging in...</div>;
  }

  const options = { fetchClientSecret };

  if(isPremium){
    return <div className="min-h-screen">
    <Header />
      <br></br>
      <br></br>
      <div className="flex flex-col md:flex-col max-w-6xl mx-auto px-6 py-12 gap-8">
        <h1>Already premium!</h1>
        <h3>Thanks for subscribing! We appreciate your business.</h3>
      </div>
    </div>
  }
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
        <br></br>
        <br></br>
      <div className="flex flex-col md:flex-row max-w-6xl mx-auto px-6 py-12 gap-8">
        {/* Stripe Checkout Section */}
        <div className="w-full md:w-2/3 bg-white rounded-xl shadow-md p-6">
          <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        </div>

        {/* Right-side Safety Message */}
        <div className="w-full md:w-1/3 flex flex-col items-start justify-start bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-green-700 mb-3">🔒 100% Secure Checkout</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            Your payment is encrypted and processed securely via Stripe.<br />
            We do <strong>not store</strong> your credit card details.<br /><br />
            Look for the lock icon in your browser's address bar to verify SSL encryption.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;