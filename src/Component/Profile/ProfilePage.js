import React, { useState, useEffect } from "react";
import './ProfilePage.css';

const ProfilePage = () => {
    const [username, setUsername] = useState("");
    const [photoUrl, setPhotoUrl] = useState("");
    const [loading, setLoading] = useState(true); // Added loading state

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
        // Fetch user data and update the state
        const storedToken = localStorage.getItem("IdToken");
        if (storedToken) {
            fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDJk2qCxLvy8gpH7j8NlZsL7Zg0QeB6ZVA', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data) {
                        setUsername(data.username || ""); // Update with actual data field name
                        setPhotoUrl(data.photoUrl || ""); // Update with actual data field name
                    }
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching user data', error);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
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
    );
}

export default ProfilePage;
