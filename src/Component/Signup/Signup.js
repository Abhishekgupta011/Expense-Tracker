import React, { useEffect, useState } from "react";
import './Signup.css'
import Layout from "../Layout/Layout";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import ExpenseForm from "../Context/Expenses/ExpenseForm";
import { authActions } from "../Store/AuthSlice";
import { useDispatch } from "react-redux";
const SignUp = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCpassword] = useState("");
    const [isLogin, setLogin] = useState(true);
    const [isLoggedIn, setLoggedIn] = useState(false); 
    const [visiblePassword , setVisiblePassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const storedToken = localStorage.getItem("idToken");
    const [token , setToken] = useState(storedToken)
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
                setLoading(true);
                const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:${isLogin ? 'signInWithPassword' : 'signUp'}?key=AIzaSyDCPqUw7nUyeBo-hGlbZLX_ICNEO-8Qgmo`, {
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
                    console.log(`${isLogin ? 'Login' : 'Sign-Up'} successful`, 'success');
                    //console.log(responseData);
                    dispatch(authActions.login(responseData.idToken));
                    localStorage.setItem("email" , email);
                    localStorage.setItem("idToken" , responseData.idToken);
                    setToken(responseData.idToken)
                    if(isLogin){
                        setLoggedIn(true);
                    }
                    
                } else {
                    alert(responseData.error.message || 'Authentication failed');
                }
            } catch (error) {
                console.error('An error occurred during authentication', error);
            }finally {
                setLoading(false); // Set loading to false after the API call is completed
            }
        }
    }
    useEffect(() => {
        
        if (token) {
          localStorage.setItem("idToken", token);
        } else {
          localStorage.removeItem("idToken");
        }
      }, [token]);
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
                    <button type="submit" disabled={loading}>
                            {loading ? (
                                <div className="loader-container">
                                    <div className="loader"></div>
                                </div>
                            ) : (
                                isLogin ? "Login" : "Sign-Up"
                            )}
                        </button>
                    {isLogin && <Link to="/fpassword">Forgot Password?</Link>}
                </div>
                <div className="toggle">
                    <button type="button"
                        onClick={() => setLogin(!isLogin)}
                        className="toggle-button"
                    >{isLogin ? "Create New Account? Sign Up" : "Have an account? Login"}</button>
                </div>
            </form>}
            {isLoggedIn && <ExpenseForm/>}
            
        </>
    )
};

export default SignUp;
