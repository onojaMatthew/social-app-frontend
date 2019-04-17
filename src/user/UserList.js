import React from "react";
import { Link } from "react-router-dom";
import DefaultProfileImage from "../assets/avatar.jpeg";


const UserList = ({ users }) => (
  <div className="row">
    {users && users.map((user) => (
    <div className="card col-md-4">
      <img 
        style={{ height: 200, widht: "auth" }} 
        src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`} 
        alt={user.name}
        onError={i => i.target.src=`${DefaultProfileImage}`}
        className="img-thumbnail"
      />
      <div className="card-body">
        <h5 className="card-title">{user.name}</h5>
        <p className="card-text">{user.email}</p>
        <Link to={`/user/${user._id}`} className="btn btn-raised btn-sm btn-primary">View Profile</Link>
      </div>
    </div>
    ))}
  </div>
);

export default UserList;
