import React, { useState, useEffect } from "react";
import './ProfilePage.css';

const ProfilePage = () => {
    const [username, setUsername] = useState("");
    const [photoUrl, setPhotoUrl] = useState("");
    const [loading, setLoading] = useState(true); 
    const [isVerify , setIsVerify] = useState(false)
    const usernameHandler = (event) => {
        setUsername(event.target.value);
    }

    const photoUrlHandler = (event) => {
        setPhotoUrl(event.target.value);
    }

    const updateProfileApi = async (event) => {
        event.preventDefault();
        const storedToken = localStorage.getItem("IdToken");
        try {
            const response = await fetch(
                'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDJk2qCxLvy8gpH7j8NlZsL7Zg0QeB6ZVA',
                {
                    method: "POST",
                    headers: {
                        "Content-Type": 'application/json'
                    },
                    body: JSON.stringify({
                        idToken: storedToken,
                        displayName: username,
                        photoUrl: photoUrl,
                        returnSecureToken: true,
                    })
                }
            );

            if (response.ok) {
                alert("Profile updated successfully");
            } else {
                // Handle error responses
            }
        } catch (error) {
            console.error('An error occurred while updating the profile', error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const storedToken = localStorage.getItem("IdToken");
            if (storedToken) {
                try {
                    const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDJk2qCxLvy8gpH7j8NlZsL7Zg0QeB6ZVA', {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            idToken: storedToken,
                        }),
                    });
    
                    if (response.ok) {
                        const data = await response.json();
                        console.log(data)
                        if (data) {
                            setUsername(data.users[0].displayName || ""); // Update with actual data field name
                            setPhotoUrl(data.users[0].photoUrl || ""); // Update with actual data field name
                            setIsVerify(data.users[0].emailVerified)
                        }
                    } else {
                        console.error('Error fetching user data');
                    }
                } catch (error) {
                    console.error('An error occurred while fetching user data', error);
                }
            }
    
            setLoading(false);
        };
    
        fetchData();
    }, []);
    

    if (loading) {
        return <div>Loading...</div>;
    }
    const verifyEmailHandler = async() =>{
        const email = localStorage.getItem("email");
        const storedToken = localStorage.getItem("IdToken");
        try{
            const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDJk2qCxLvy8gpH7j8NlZsL7Zg0QeB6ZVA",{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idToken: storedToken,
                    email: email,
                    requestType:  "VERIFY_EMAIL",
                })
            }) 
            if(response.ok){
                alert("Email Verified")
            }
        } catch(error){
            console.error('An error occurred while fetching user data', error)
        }
    }

    return (
        <div>
        <form onSubmit={updateProfileApi} className="update-form">
            <div className="form-header">
                <h1>Contact Details</h1>
                <button>Cancel</button>
            </div>
            <div className="u-form">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" value={username} onChange={usernameHandler} />
                <label htmlFor="photourl">Profile photo Url</label>
                <input type="url" id="photourl" value={photoUrl} onChange={photoUrlHandler} />
                <button type="submit" className="update">Update</button>
            </div>
        </form>
        {!isVerify && <button type="submit" className="btn" onClick={verifyEmailHandler}>Verify Email</button>}
        </div>
    );
}

export default ProfilePage;
