import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Actions from './Actions/Actions';
import Inf from './Inf/Inf';
import './UserZone.css';
import user_pic_example from '../../../assets/user_pic_example.png';


const UserZone = ({ isLoggedIn, userName, userPicture, setUserName, setUserPicture, isMobile, isMenuVisible }) => {
    const [isLoadingActions, setIsLoadingActions] = useState(true);
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/auth');
    };

    useEffect(() => {
        setIsLoadingActions(true);
        setTimeout(() => {
            const userData = {
                name: 'Имя Фамилия',
                picture: user_pic_example
            };
            setUserName(formatName(userData.name));
            setUserPicture(userData.picture);
            setIsLoadingActions(false);
        }, 2000);
    }, []);

    function formatName(fullName) {
        const parts = fullName.split(' ');
        if (parts.length > 1) {
            return `${parts[0]} ${parts[1].charAt(0)}.`;
        }
        return fullName; 
    }


    return (
        <div className="user-blocks">

            {isMobile && isLoggedIn && !isMenuVisible && (
                <Actions isLoading={isLoadingActions} />
            )}

            {isMobile && isLoggedIn && isMenuVisible && (
                <Inf 
                    userName={userName} 
                    userPicture={userPicture} 
                    isLoading={isLoadingActions} 
                />
            )}

            {!isMobile && isLoggedIn && (
                <>
                    <Actions isLoading={isLoadingActions} />
                    <Inf userName={userName} userPicture={userPicture} isLoading={isLoadingActions} />
                </>
            )}
        
        </div>
        

    );
};

export default UserZone;