import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { useAuth } from 'react-oidc-context';

const UsersPage: React.FC = () => {
  const auth = useAuth();
  let navigate = useNavigate();
  const [loadingPremium, setLoadingPremium] = useState(true);
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    if (auth.isAuthenticated && auth.user?.profile.email) {
      fetch(import.meta.env.VITE_API_URL + `get-status?email=${auth.user?.profile.email}`, {
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

  
  if(loadingPremium){
    return (
      <div className="min-h-screen bg-gray-100 pt-20 px-8">
        <Header />
        <h2 className="text-2xl font-bold mb-4 text-purple-800">Loading...</h2>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-100 pt-20 px-8">
      <Header/>
      <h2 className="text-2xl font-bold mb-4 text-purple-800">Your Profile</h2>
      {auth.isAuthenticated ? (
       <div className="overflow-x-auto">
       <table className="min-w-[300px] border border-gray-300 bg-white text-left shadow-md rounded-md">
         <tbody>
           <tr className="border-b border-gray-200">
             <th className="px-4 py-3 text-gray-700 font-medium">Email</th>
             <td className="px-4 py-3">{auth.user?.profile.email}</td>
           </tr>
           <tr className="border-b border-gray-200">
             <th className="px-4 py-3 text-gray-700 font-medium">Subscription Plan</th>
              {(isPremium ? <td className="px-4 py-3">Premium</td> :
              <td className="px-4 py-3">Basic</td>)}
           </tr>
         </tbody>
       </table>
       <br></br>
       <button className="bg-purple-800 hover:bg-purple-900 text-white font-semibold py-2 px-4 rounded-2xl shadow-md transition duration-300" onClick={async () => {
        if(isPremium){
          await fetch(import.meta.env.VITE_API_URL + `unsubscribe?email=${auth.user?.profile.email}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${auth.user?.id_token}`,
            'Content-Type': 'application/json',
            }
          })
          .then((res) => res.json())
          .then((_) => {
            window.location.reload();
          })
          .catch((error) => {
            console.error('Error fetching premium status:', error);
            setLoadingPremium(false);
          });
        }else{
          navigate("/checkout");
        }
       }}>{isPremium ? "Unsubscribe" : "Subscribe"}</button>
     </div>
      ) : (
        <p className="text-red-600">Please sign in to view your profile details.</p>
      )}
    </div>
  );
};

export default UsersPage;