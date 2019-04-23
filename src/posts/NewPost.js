import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { Redirect } from 'react-router-dom';
import DefaultProfileImage from "../assets/avatar.jpeg";
import NewPostForm from './NewPostForm';
import { update } from './apiPost';

class NewPost extends Component {
  state = {
    title: "",
    body: "",
    photo: "",
    error: "",
    user: {},
    fileSize: 0,
    loading: false,
    redirectToProfile: false,
  }

  componentDidMount() {
    this.postData = new FormData();
    this.setState({ user: isAuthenticated().user });
  }

  isValid = () => {
    const { title, body, fileSize } = this.state;
    if(fileSize > 100000) {
      this.setState({
        error: "File size should be less than 100kb",
        loading: false
      });
      return false;
    }

    if(title.length === 0 || body.length === 0) {
      this.setState({
        error: "All fields are required",
        loading: false
      });
      return false;
    }

    return true;
  }

  handleChange = name => event => {
    this.setState({ error: "" });
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    const fileSize = name === "photo" ? event.target.files[0].size : 0
    this.postData.set(name, value);
    this.setState({ [name]: value, fileSize });
  }

  clickSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });
    if (this.isValid()) {
      const postId = this.state.id;
      const token = isAuthenticated().token;
      update(postId, token, this.postData)
        .then(data => {
          if (data.error) this.setState({ error: data.error });
          else
          this.setState({ 
            loading: false, 
            title: "", 
            body: "", 
            photo: "",
            redirectToProfile: true,
          });
        });
    }
  }

  render() {
    const { title, body, redirectToProfile, user, loading, error } = this.state;
    if (redirectToProfile) {
      return <Redirect to={`/user/${user._id}`} />
    }

    
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Edit Profile</h2>
        <div className="alert alert-danger" style={{ display: error ? "" : "none"}}>{error}</div>
        {loading ? <div className="jumbotron text-center"><h2>Loading...</h2></div> : ""}
        
        <NewPostForm 
          handleChange={this.handleChange}
          clickSubmit={this.clickSubmit}
          title={title}
          body={body}
        />
      </div>
    );
  }
}

export default NewPost;
