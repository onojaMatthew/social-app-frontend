import React, { Component } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { read } from "./apiUser";
import DefaultProfileImage from "../assets/avatar.jpeg"
import DeleteUser from './DeleteUser';

class Profile extends Component {
  state = {
    user: {},
    redirectToSignup: false
  }

  init = (userId) => {
    const token = isAuthenticated().token;
    read(userId, token)
      .then(data => {
        if (data.error) {
          this.setState({ redirectToSignup: true })
        } else {
          this.setState({
            user: data
          })
        }
      })
  }



  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.init(userId);
  }

  componentWillReceiveProps(props) {
    const userId = props.match.params.userId;
    this.init(userId);
  }

  render() {
    const { user } = this.state;
    const photoUrl = user._id ? `${process.env.REACT_APP_API_URL}/user/photo/${user._id}?${new Date().getTime()}` : DefaultProfileImage;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Profile</h2>
        <div className="row">
          <div className="col-md-6">
          <img 
            style={{ height: 200, widht: "auth" }} 
            src={photoUrl} alt={user.name}
            onError={i => i.target.src=`${DefaultProfileImage}`}
            className="img-thumbnail"
          />
          </div>
          <div className="col-md-6">
            <div className="lead">
              <p>Hello {user.name}</p>
              <p>Email: {user.email}</p>
              <p>{`Joined: ${user ? new Date(user.created).toDateString() : null}`}</p>
            </div>
            {isAuthenticated().user && isAuthenticated().user._id === user._id && (
            <div className="d-inline-block">
              <Link 
                className="btn btn-raised btn-success mr-5"
                to={`/user/edit/${user._id}`}
              >
                Edit Profile
              </Link>
              <DeleteUser id={user._id} />
            </div>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col md-12 mt-5 mb-5">
              
            <hr />
            <p className="lead">{user.about}</p>
            <hr />
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
