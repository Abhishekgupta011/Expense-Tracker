import React, { useState } from "react";
import './Signup.css'
import Layout from "../Layout/Layout";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from "@mui/material/TextField";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCpassword] = useState("");
    const [isLogin, setLogin] = useState(false);
    const [isLoggedIn, setLoggedIn] = useState(false); // Track the login state
    const [visiblePassword , setVisiblePassword] = useState(false);
    const emailInputHandler = (event) => {
        setEmail(event.target.value);
    }

    const passwordInputHandler = (event) => {
        setPassword(event.target.value);
    }

    const cPasswordInputHandler = (event) => {
        setCpassword(event.target.value);
    }

    let formSubmitHandler = async (event) => {
        event.preventDefault();
        if (!isLogin && password !== cPassword) {
            alert("Passwords do not match");
            return;
        } else {
            try {
                const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:${isLogin ? 'signInWithPassword' : 'signUp'}?key=AIzaSyDJk2qCxLvy8gpH7j8NlZsL7Zg0QeB6ZVA`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": 'application/json'
                    },
                    body: JSON.stringify({
                        email,
                        password,
                        returnSecureToken: true,
                    }),
                })
                const responseData = await response.json()
                if (response.ok) {
                    alert(`${isLogin ? 'Login' : 'Sign-Up'} successful`, 'success');
                    console.log(responseData);
                    localStorage.setItem("IdToken" , responseData.idToken);
                    if(isLogin){
                        setLoggedIn(true);
                    }
                    
                } else {
                    alert(responseData.error.message || 'Authentication failed');
                }
            } catch (error) {
                console.error('An error occurred during authentication', error);
            }
        }
    }

    return (
        <>
            {isLoggedIn ? <Layout />:<form onSubmit={formSubmitHandler}>
                <div className="form-container">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={email} onChange={emailInputHandler} required placeholder="User Email" />
                    <label htmlFor="password">Password</label>
                    <TextField
                            type={visiblePassword ? "password" : "text"} 
                            id="password"
                            value={password}
                            onChange={passwordInputHandler}
                            required
                            label="Password"
                            className="password"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {visiblePassword ? (
                                            <VisibilityOffIcon onClick={() => setVisiblePassword(false)} />
                                        ) : (
                                            <VisibilityIcon onClick={() => setVisiblePassword(true)} />
                                        )}
                                    </InputAdornment>
                                )
                            }}
                        />
                    {!isLogin && <label htmlFor="cpassword">Confirm Password</label>}
                    {!isLogin && <input type="password" id="cpassword" value={cPassword} onChange={cPasswordInputHandler} required placeholder="Confirm Password" />}
                    <button type="submit">{isLogin ? "Login" : "Sign-Up"}</button>
                    {isLogin && <button className="fpassword">Forgot Password?</button>}
                </div>
                <div className="toggle">
                    <button type="button"
                        onClick={() => setLogin(!isLogin)}
                        className="toggle-button"
                    >{isLogin ? "Create New Account? Sign Up" : "Have an account? Login"}</button>
                </div>
            </form>}
            
        </>
    )
}

export default SignUp;
