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
        const getEmail = localStorage.getItem("email")
        try{
            const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDJk2qCxLvy8gpH7j8NlZsL7Zg0QeB6ZVA",{
                method : "POST",
                headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    requestType: "PASSWORD_RESET",
                    email: nPassword,
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
            <label htmlFor="email">Enter Email</label>
            <input type="email" id="email" value={nPassword} onChange={npasswordHandler} />
            <button type="submit" className={classes.btn}>Send Link</button>
        </form>
    )
}

export default ForgotPassword;