import React, { useEffect, useState } from 'react';
import axiosInstance from '../Services/axiosInstance';
import '../styles/ProfilePage.css';

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        // function to fetch user profile
        const fetchProfile = async () => {
            try {
                // API call to fetch profile data
                const response = await axiosInstance.get('/users/profile');
                console.log('Profile Data:', response.data);
                setProfile(response.data);
            } catch (error) {
                // log error if API call fails
                console.error('Error fetching profile:', error);
            }
        };
        fetchProfile();
    }, []);

    if (!profile) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-container">
            <h1>Profile</h1>
            <p>Username: {profile.username}</p> 
            <p>Email: {profile.email}</p>
        </div>
    );
};

export default ProfilePage;
