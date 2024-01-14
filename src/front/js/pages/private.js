import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { Context } from '../store/appContext'
import { useNavigate } from 'react-router-dom'
import "../../styles/private.css"



export const Private = () => {  

  const [userToken, setUserToken] = useState("");
  const navigate = useNavigate();

  useEffect (() => {
      const userToken = localStorage.getItem("userToken");
      if(!userToken){
          navigate("/login");
          return;
      }
      setUserToken(userToken)
      
  })

  const logout = async () => {
    localStorage.removeItem("userToken");
    window.location.reload(true);
  };

  return (
    <>
  
    {userToken && <p>User loged in!</p>}
    <button onClick={logout}>Logout</button>
 
    </>
    
  )
}

