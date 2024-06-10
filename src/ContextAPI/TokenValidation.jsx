import React, { createContext, useEffect, useState } from 'react';

export const AuthResponseContext = createContext();

function TokenValidation({ children }) {
    const [isAdminAuthorized, setIsAdminAuthorized] = useState(false);
    const [isUserAuthorized, setIsUserAuthorized] = useState(false);

    useEffect(() => {
        if (sessionStorage.getItem("username")) {
            setIsUserAuthorized(true);
        } else {
            setIsUserAuthorized(false);
        }
    }, [isUserAuthorized]);

    useEffect(() => {
        if (sessionStorage.getItem("email")) {
            setIsAdminAuthorized(true);
        } else {
            setIsAdminAuthorized(false);
        }
    }, [isAdminAuthorized]);

    return (
        <AuthResponseContext.Provider value={{ isUserAuthorized, setIsUserAuthorized, isAdminAuthorized, setIsAdminAuthorized }}>
            {children}
        </AuthResponseContext.Provider>
    );
}

export default TokenValidation;
