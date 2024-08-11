import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Header from '../Header/Header';
import { getProfile } from '../../Utility/api';
import { useCart } from '../context/CartContext';

const Profile: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const { setItemCount } = useCart();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await getProfile();
        setItemCount(profile.item_count)
        console.log(profile);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    if (isLoggedIn) {
      fetchUserProfile();
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div>
        <Header />
      <h1>Profile Page</h1>
      <div>
        <strong>Name:</strong>
      </div>
      <div>
        <strong>Email:</strong>
      </div>
      <div>
        <strong>Bio:</strong>
      </div>
    </div>
  );
};

export default Profile;