import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Header from '../Header/Header';
import { getProfile } from '../../Utility/api';
import { useCart } from '../context/CartContext';
import { ProfileResponse } from '../../../types/types';
import { Navigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners'; // Import the spinner

const Profile: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const { setItemCount } = useCart();
  const [profileSummary, setProfileSummary] = useState<ProfileResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await getProfile();
        setItemCount(profile.item_count);
        setProfileSummary(profile);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Failed to load profile. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, [isLoggedIn, setItemCount]);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return (
      <div className='h-96 flex justify-center items-center'>
        <ClipLoader color="#000" loading={loading} size={50} />
      </div>
    );
  }

  if (error) {
    return (
      <div className='h-96 flex justify-center items-center'>
        <p className='text-red-500'>{error}</p>
      </div>
    );
  }

  const formattedDate = profileSummary
    ? new Date(profileSummary.created_at).toLocaleString()
    : '';

  return (
    <div>
      <Header />
      <div className='h-96 flex justify-center items-center'>
        <div className="bg-white w-96 shadow-2xl p-6 rounded-2xl border">
          <h2 className="text-xl font-bold mb-4 text-center">Profile Summary</h2>

          <div className="flex justify-between mb-2">
            <p className="text-gray-600">Username:</p>
            <p>{profileSummary?.username || 'N/A'}</p>
          </div>

          <div className="flex justify-between mb-2">
            <p className="text-gray-600">Email:</p>
            <p>{profileSummary?.email || 'N/A'}</p>
          </div>

          <div className="flex justify-between mb-2">
            <p>Created On:</p>
            <p>{formattedDate || 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
