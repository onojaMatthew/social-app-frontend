import React from "react";
import { Link } from "react-router-dom";
import DefaultProfileImage from "../assets/avatar.jpeg";


const FindPeopleList = ({ users, clickFollow }) => (
  <div className="row">
    {users && users.map((user, i) => (
    <div key={i} className="card col-md-4">
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
        <Link to={`/user/${user._id}`} className="btn btn-raised btn-sm btn-primary btn-sm">View Profile</Link>
        <button 
          className="btn btn-info btn-raised float-right btn-sm"
          onClick={clickFollow(user, i)}
        >Follow</button>
      </div>
    </div>
    ))}
  </div>
);

export default FindPeopleList;
