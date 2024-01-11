import React, { useRef, useState } from 'react'
import '../../styles/login.css'
import { useContext } from 'react'
import { Context } from '../store/appContext'
import { useNavigate,Link } from 'react-router-dom'

export const Login = () => {
    
    const {store,actions}=useContext(Context);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const loginUser = () => {
        actions.loginUserExisting({
            email,
            password
        })
    }
  
    return (
      <div className='container-form'>
          <form 
          id='contact-form' className='form-signup'>
              <label className='label-signup' for="email">Email:</label>
              <input className='input-signup' type="email" id="email" name="email" onChange={(e)=> setEmail(e.target.value)} required/>
    
              <label className='label-signup' for="password">Password:</label>
              <input className='input-signup' type="password" id="password" name="password"  onChange={(e)=> setPassword(e.target.value)} required/>
  
              <button className="button-signup" type="button" onClick={loginUser}>Login</button>
          </form>

          <div className='goHome-login'>
            <Link to="/">Go to Home</Link>
            </div>

      </div>
    )
}

