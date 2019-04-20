import React from "react";

const NewPostForm = ({ title, body, clickSubmit, handleChange }) => (
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
        <label className="text-muted">Title</label>
        <input 
          onChange={handleChange("title")} 
          type="text" className="form-control"
          value={title}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Body</label>
        <textarea 
          onChange={handleChange("body")} 
          type="text" 
          className="form-control"
          value={body}
        />
      </div>
      <button onClick={clickSubmit} className="btn btn-raised btn-primary">Update Profile</button>
    </form>
  </div>
);

export default NewPostForm;
