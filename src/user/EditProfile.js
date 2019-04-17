import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { read, update, updateLocalStorage } from './apiUser';
import EditProfileForm from "./forms/EditProfileForm";
import { Redirect } from 'react-router-dom';
import DefaultProfileImage from "../assets/avatar.jpeg";

class EditProfile extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    id: "",
    about: "",
    redirectToProfile: false,
    error: "",
    loading: false,
    fileSize: 0,
  }

  init = (userId) => {
    const token = isAuthenticated().token;
    read(userId, token)
      .then(data => {
        if (data.error) {
          this.setState({ redirectToProfile: true })
        } else {
          this.setState({
            id: data._id,
            name: data.name,
            password: data.password,
            email: data.email,
            about: data.about,
          });
        }
      });
  }

  componentDidMount() {
    this.userData = new FormData();
    const userId = this.props.match.params.userId;
    this.init(userId);
  }

  isValid = () => {
    const { name, email, password, fileSize } = this.state;
    if(fileSize > 100000) {
      this.setState({
        error: "File size should be less than 100kb",
        loading: false
      });
      return false;
    }
    if(name.length === 0) {
      this.setState({
        error: "Name is required",
        loading: false
      });
      return false;
    }

    if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      this.setState({
        error: "A valid email is required",
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
    this.userData.set(name, value);
    this.setState({ [name]: value, fileSize });
  }

  clickSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });
    if (this.isValid()) {
      const userId = this.props.match.params.userId;
      const token = isAuthenticated().token;
      update(userId, token, this.userData)
        .then(data => {
          if (data.error) this.setState({ error: data.error });
          else
            updateLocalStorage(data, () => {
              this.setState({
                redirectToProfile: true,
              });
            });
        });
    }
  }

  render() {
    const { id, name, email, password, about, redirectToProfile, loading, error } = this.state;
    if (redirectToProfile) {
      return <Redirect to={`/user/${id}`} />
    }

    const photoUrl = id ? `${process.env.REACT_APP_API_URL}/user/photo/${id}?${new Date().getTime()}` : DefaultProfileImage;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Edit Profile</h2>
        <div className="alert alert-danger" style={{ display: error ? "" : "none"}}>{error}</div>
        {loading ? <div className="jumbotron text-center"><h2>Loading...</h2></div> : ""}
        <img 
          style={{ height: 200, widht: "auth" }} 
          src={photoUrl} alt={name}
          onError={i => i.target.src = `${DefaultProfileImage}`}
          className="img-thumbnail"
        />
        <EditProfileForm 
          handleChange={this.handleChange}
          clickSubmit={this.clickSubmit}
          name={name}
          email={email}
          about={about}
          password={password}
        />
      </div>
    );
  }
}

export default EditProfile;
