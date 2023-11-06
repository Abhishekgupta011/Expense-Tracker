import React, { useState } from "react";
import classes from './FogotPassword.module.css';
const ForgotPassword = () =>{
    const [nPassword , setNpassword] = useState("")
    const npasswordHandler = (event) =>{
        setNpassword(event.target.value)
    }
    const nPasswordSubmitHandler = async(e)=>{
        e.preventDefault();
        const storedToken = localStorage.getItem("IdToken")
        try{
            const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDJk2qCxLvy8gpH7j8NlZsL7Zg0QeB6ZVA",{
                method : "POST",
                headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    idToken: storedToken,
                    password: nPassword,
                    returnSecureToken: true,
                  }),
                });
          
                const responseData = await response.json();
          
                if (response.ok) {
                  alert("Password Chaned Successfully");
                } else {
                  console.log('Password change failed:', responseData.error.message);
                }
              } catch (error) {
                console.error('Something went wrong:', error);
              }
            };
    return(
        <form onSubmit={nPasswordSubmitHandler} className={classes.fpassword}>
            <label htmlFor="Npassword">New Password</label>
            <input type="password" id="Npassword" value={nPassword} onChange={npasswordHandler} />
            <button type="submit" className={classes.btn}>Change Password</button>
        </form>
    )
}

export default ForgotPassword;