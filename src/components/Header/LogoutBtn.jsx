import React from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';

function LogoutBtn() {
    const dispatch = useDispatch();
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout());
        });
    };

    return (
        <button
            className='inline-block px-6 py-2 text-[#c9d1d9] hover:text-white hover:bg-[#21262d] rounded-full transition-colors duration-200'
            onClick={logoutHandler}
        >
            Logout
        </button>
    );
}

export default LogoutBtn;
