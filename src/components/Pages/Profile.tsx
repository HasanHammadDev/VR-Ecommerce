import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Header from '../Header/Header';
import { getProfile } from '../../Utility/api';
import { useCart } from '../context/CartContext';
import { ProfileResponse } from '../../../types/types';

const Profile: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const { setItemCount } = useCart();
  const [profileSummary, setProfileSummary] = useState<ProfileResponse>()
  const formattedDate = profileSummary?.created_at ? new Date(profileSummary?.created_at).toLocaleString() : 'Invalid Date';

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await getProfile();
        setItemCount(profile.item_count)
        setProfileSummary(profile)
        console.log(profile);
        console.log(profileSummary)
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
      <div className='h-96 flex justify-center items-center'>
        <div className="bg-white w-96 shadow-2xl p-6 rounded-2xl border">
          <h2 className="text-xl font-bold mb-4 text-center">Profile Summary</h2>

          <div className="flex justify-between mb-2">
            <p className="text-gray-600">Username:</p>
            <p>{profileSummary?.username}</p>
          </div>

          <div className="flex justify-between mb-2">
            <p className="text-gray-600">Email:</p>
            <p>{profileSummary?.email}</p>
          </div>

          <div className="flex justify-between mb-2">
            <p>Created On:</p>
            <p>{new Date(formattedDate).toLocaleString()}</p>
          </div>

          {/* <button className="bg-green-600 text-white font-semibold py-2 px-4 rounded w-full hover:bg-green-800 hover:shadow-lg transition duration-300">
            Buy All
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;