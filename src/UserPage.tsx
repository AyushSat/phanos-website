import React from 'react';
import Header from './Header';
import { useAuth } from 'react-oidc-context';

const UsersPage: React.FC = () => {
  const auth = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 pt-40 px-8">
      <Header />
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
             <td className="px-4 py-3">Premium (Demo)</td>
           </tr>
           <tr>
             <th className="px-4 py-3 text-gray-700 font-medium">Account Created</th>
             <td className="px-4 py-3">2024-01-01</td>
           </tr>
         </tbody>
       </table>
     </div>
      ) : (
        <p className="text-red-600">Please sign in to view your profile details.</p>
      )}
    </div>
  );
};

export default UsersPage;