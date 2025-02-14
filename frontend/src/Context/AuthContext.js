import { useState, createContext, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [authToken, setauthToken]= useState(null);
    const [user, setUser]= useState(null);

    useEffect(()=>{
        const token = localStorage.getItem("authToken");
        if(token){
            setauthToken(token);
        }
    },[]);


    const login = (token, userData)=>{
        localStorage.setItem("authToken", token);
       localStorage.setItem("user", JSON.stringify(userData))
        setUser(userData);
        setauthToken(token)
    }

    const logout = () =>{
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        setUser(null);
        setauthToken(null);
    }

    const value ={
        login,
        logout,
        user,
        authToken
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;

}