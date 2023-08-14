import React, { useState, useEffect } from "react";
import "./UserProfile.css"
import { useParams } from "react-router-dom"

function UserProfile({ user, selectedUserId }) {
  const { id_user } = useParams(); //get the user's id from the URL parameter
    return (
      <div className="container">
        <h3>{user.name}</h3>
        <div>
          <img className="card-img-top" src="https://www.alleycat.org/wp-content/uploads/2019/03/FELV-cat.jpg" alt="Card image cap"/>
        </div>
        <div>
        <p>ID: {user.id}</p>
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
        <a href="/tasks/:id" className="btn btn-primary">Go to tasks</a>
      </div>
    );
  }

export default UserProfile;

//predifined images?