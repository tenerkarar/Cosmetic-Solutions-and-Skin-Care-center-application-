import jwtDecode from 'jwt-decode';
import React, { Children, createContext, useMemo, useState, useEffect } from 'react';
import { axiosHttpClient } from '../api/api';

export interface IAuthContext {
    children: React.ReactNode;
}

const AuthContext = createContext(null);

export const AuthProvider: React.FC<IAuthContext> = (props) => {

    const [auth, setAuth] = useState(null);

    useEffect(() => {

        //@ts-ignore
        const savedRefreshToken = JSON.parse(localStorage.getItem('token'));

        if (savedRefreshToken) {

            try {
                async function genAccessToken() {
                    const accessTokenResponse = await axiosHttpClient.post(`/auth/refresh/`, { refreshToken: savedRefreshToken.refreshToken });
                    const accessToken = accessTokenResponse.data.accessToken;

                    setAuth({
                        //@ts-ignore
                        token: accessToken,
                        user: jwtDecode(accessToken)
                    });

                    axiosHttpClient.interceptors.request.use(function (config) {
                        //@ts-ignore
                        config.headers.Authorization = accessToken ? `${accessToken}` : '';
                        return config;
                    });
                }

                genAccessToken();

            } catch (e: any) {
                console.log(e.message);
            }

        }

    }, [])

    const value = useMemo(() => ({ auth, setAuth }), [auth]);

    return (
        // @ts-ignore
        <AuthContext.Provider value={value} >
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;