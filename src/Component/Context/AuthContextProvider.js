import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { useNavigate } from "react-router";

const AuthContextProvider = (props)=>{
    const storedToken = localStorage.getItem('IdToken');
    console.log(storedToken)
    const [token , setToken] = useState(storedToken);
    const userLoggedIn = !!token;
  const navigate = useNavigate()
    useEffect(() => {
        
        if (token) {
          localStorage.setItem("IdToken", token);
        } else {
          localStorage.removeItem("IdToken");
        }
      }, [token]);
      const login =(newToken)=>{
        setToken(newToken);
        localStorage.setItem("IdToken" , newToken);
      }
    const logout=()=>{
        console.log("loggedout")
        setToken(null)
        localStorage.removeItem("IdToken");
        navigate('/')
    }
    const AuthContextValue={
        token:token,
        isloggedIn: userLoggedIn,
        login:login,
        logout:logout,
        refreshToken:"",
    }
    return(
        <AuthContext.Provider value={AuthContextValue}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;