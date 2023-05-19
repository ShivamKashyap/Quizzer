import React, { useContext } from 'react'
import '../styles/profile.scss';
import DataContext from '../context/userData/DataContext';

const Profile = () => {
    const datacontext = useContext(DataContext)
    const { userData } = datacontext;

    return (
        <>
            <div className="__profileMain" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <div className="profileCloser">
                    {userData && <img src={userData.picture} alt="" />}
                </div>
            </div>
        </>
    )
}

export default Profile
