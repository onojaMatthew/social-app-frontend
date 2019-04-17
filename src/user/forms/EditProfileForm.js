import React from "react";

const EditProfileForm = ({ name, email, about, password, clickSubmit, handleChange }) => (
  <div>
    <form encType="multipart/form-data">
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input 
          onChange={handleChange("photo")} 
          type="file"
          accept="image/*"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input 
          onChange={handleChange("name")} 
          type="text" className="form-control"
          value={name}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input 
          onChange={handleChange("email")} 
          type="email" 
          className="form-control"
          value={email}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">About</label>
        <textarea 
          onChange={handleChange("about")} 
          type="text" 
          className="form-control"
          value={about}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input 
          onChange={handleChange("password")}
          type="password" 
          className="form-control"
          value={password}
        />
      </div>
      <button onClick={clickSubmit} className="btn btn-raised btn-primary">Update Profile</button>
    </form>
  </div>
);

export default EditProfileForm;
