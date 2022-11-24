import React, { useContext, useEffect } from 'react';
import AuthContext from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Logout = () => {

     //@ts-ignore
    const { auth, setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    
    useEffect(() => {
        setAuth(null);
    }, []);

    return null;
}

export default Logout;