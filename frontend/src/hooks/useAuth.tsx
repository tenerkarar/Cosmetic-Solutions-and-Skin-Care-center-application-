
import React, { useState, useEffect, useContext } from 'react';
import jwtDecode from 'jwt-decode';

import { axiosHttpClient } from '../api/api';
import AuthContext from '../contexts/AuthContext';


const useAuth = () => {

    // const [refresh, setRefresh] = useState();
    // //@ts-ignore
    // const { auth, setAuth } = useContext(AuthContext);

    // useEffect(() => {
    //     async function loadRefreshToken() {
    //         //@ts-ignore
    //         const tokens = JSON.parse(localStorage.getItem('token'));

    //         if (tokens) {
    //             //@ts-ignore
    //             const tokens = JSON.parse(localStorage.getItem('token'));
    //             setRefresh(tokens.refreshToken);
    //             // getAccessToken(refresh);
    //             try {
    //                 const accessTokenResponse = await axiosHttpClient.post(`/auth/refresh/`, { refreshToken: refresh });
    //                 const accessToken = accessTokenResponse.data.accessToken;
    //                 // console.log(accessToken);
    //                 setAuth({
    //                     token: accessToken,
    //                     user: jwtDecode(accessToken)
    //                 });

    //                 axiosHttpClient.interceptors.request.use(function (config) {
    //                     //@ts-ignore
    //                     const token = JSON.parse(localStorage.getItem('token'));
    //                     //@ts-ignore
    //                     config.headers.Authorization =  token.refreshToken ? `${accessToken}` : '';
    //                     return config;
    //                 });

    //                 // console.log(auth);
    //             } catch (e: any) {
    //                 console.log(e.message);
    //             }
    //         }
    //     }

    //     loadRefreshToken();
    // }, []);

    // // Generate new Access token from refreshToken
    // // const getAccessToken = async (tkn: any) => {

    // //     try {
    // //         const accessTokenResponse = await axios.post(`${apiUrl}/auth/refresh/`, { refreshToken: refresh });
    // //         const accessToken = accessTokenResponse.data.accessToken;
    // //         // console.log(accessToken);
    // //         setAuth({
    // //             token: accessToken,
    // //             user: jwtDecode(accessToken)
    // //         });

    // //         console.log(auth.user);

    // //     } catch (e: any) {
    // //         console.log(e.message);
    // //     }
    // // }

    return null
}

export default useAuth;