import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import { useParams, Link } from "react-router-dom";

function UserProfile() {
  const [user, setUser] = useState({ id: "", name: "", lastname: "", description: "" });
  const { id } = useParams(); // Get the user's id from the URL parameter

  const getUser = async () => {
    try {
      const results = await fetch(`/api/users/${id}`);
      const data = await results.json();
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="container">
      <h3>{user.name}</h3>
      <div>
        <img className="card-img-top" src="https://www.alleycat.org/wp-content/uploads/2019/03/FELV-cat.jpg" alt="Card image cap" />
      </div>
      <div>
        <label>Name:</label> {user.name}
      </div>
      <div>
        <label>Last Name:</label> {user.lastname}
      </div>
      <p>
        <label>Description:</label>
        {user.description}
      </p>
      <div>
        <Link to={`/users/${id}/tasks`}>Go to tasks</Link>
      </div>
    </div>
  );
}

export default UserProfile;







