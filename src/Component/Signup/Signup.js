import React, { useState } from "react";
import './Signup.css'
const SignUp = () => {
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [cPassword , setCpassword] = useState("");
    const [isLogin , setLogin] = useState(false)
    const emailInputHandler = (event)=>{
        setEmail(event.target.value)
    }
    const passwordInputHandler = (event)=>{
        setPassword(event.target.value)
    }
    const cPasswordInputHandler = (event)=>{
        setCpassword(event.target.value)
    }

    let formSubmitHandler= async(event)=>{
        event.preventDefault();
        if (password !== cPassword) {
            alert("Passwords do not match");
            return;
          } else{
            try{
                const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:${isLogin ? 'signInWithPassword' : 'signUp'}?key=AIzaSyDJk2qCxLvy8gpH7j8NlZsL7Zg0QeB6ZVA`,{
                    method: 'POST',
                    headers:{
                        "Content-Type" : 'application/json'
                    },
                    body:JSON.stringify({
                        email,
                        password,
                        returnSecureToken: true,
                    }),
                })
                const responseData = await response.json()
                if(response.ok){
                    alert(`${isLogin ? 'Login' : 'Sign-Up'} successful`, 'success')
                    console.log(responseData)
                } else {
                    alert(responseData.error.message || 'Authentication failed');

                  }
            } catch(error){
                console.error('An error occurred during authentication', error);
            }
          }
        
    }
 
    
    return(
        
        <form onSubmit={formSubmitHandler}>
            <div className="form-container">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={emailInputHandler} required placeholder="User Email"/>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={passwordInputHandler} required placeholder="Password"/>
            {!isLogin && <label htmlFor="cpassword">Confirm Password</label>}
            {!isLogin &&<input type="password" id="cpassword" value={cPassword} onChange={cPasswordInputHandler} required placeholder="Confirm Password"/>}
            <button type="submit">{isLogin ? "Login" : "SignUp" }</button>
            </div>
            <div className="toggle">
            <button type="button"
            onClick={() => setLogin(!isLogin)}
            className="toggle-button"
            >{isLogin ? "Create New Account? SignUp" : "Have an account? Login"}</button>
            </div>
        </form>
        
    )
}
export default SignUp;