import React, { Component } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { read } from "./apiUser";
import DefaultProfileImage from "../assets/avatar.jpeg"
import DeleteUser from './DeleteUser';
import FollowProfileButton from './followProfileButton';
import ProfileTabs from './ProfileTabs';
import { listByUser } from "../posts/apiPost";

class Profile extends Component {
  state = {
    user: {
      following: [],
      followers: [],
    },
    redirectToSignup: false,
    following: false,
    error: "",
    posts: [],
  }

  checkFollow = user => {
    const jwt = isAuthenticated();
    const match = user.followers.find(follower => {
      return follower._id === jwt.user._id;
    })
    return match;
  }

  clickFollowButton = (callApi) => {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;

    callApi(userId, token, this.state.user._id)
      .then(data => {
        if (data.error) {
          this.setState({ error: data.error });
        } else {
          this.setState({
            user: data,
            following: !this.state.following
          })
        }
      })
  }

  init = (userId) => {
    const token = isAuthenticated().token;
    read(userId, token)
      .then(data => {
        if (data.error) {
          this.setState({ redirectToSignup: true })
        } else {
          const following = this.checkFollow(data)
          this.setState({
            user: data,
            following
          })
          this.loadPost(data._id);
        }
      })
  }

  loadPost = (userId) => {
    const token = isAuthenticated().token;
    listByUser(userId, token)
      .then(data => {
        if (data.error) {
          this.setState({ error: data.error });
        } else {
          this.setState({ posts: data });
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
    const { user, posts } = this.state;
    const photoUrl = user._id ? `${process.env.REACT_APP_API_URL}/user/photo/${user._id}?${new Date().getTime()}` : DefaultProfileImage;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Profile</h2>
        <div className="row">
          <div className="col-md-4">
            <img 
              style={{ height: 200, widht: "auth" }} 
              src={photoUrl} alt={user.name}
              onError={i => i.target.src=`${DefaultProfileImage}`}
              className="img-thumbnail"
            />
          </div>
          <div className="col-md-8">
            <div className="lead">
              <p>Hello {user.name}</p>
              <p>Email: {user.email}</p>
              <p>{`Joined: ${user ? new Date(user.created).toDateString() : null}`}</p>
            </div>
            {isAuthenticated().user && isAuthenticated().user._id === user._id ? (
            <div className="d-inline-block">
            <Link 
                className="btn btn-raised btn-info mr-4"
                to={`/post/create`}
              >
                Create Post
              </Link>
              <Link 
                className="btn btn-raised btn-success"
                to={`/user/edit/${user._id}`}
              >
                Edit Profile
              </Link>
              <DeleteUser id={user._id} />
            </div>
            ) : (
              <FollowProfileButton 
                following={this.state.following}
                onButtonClick={this.clickFollowButton}
              />
            )}
          </div>
        </div>
        <div className="row">
          <div className="col md-12 mt-5 mb-5">
              
            <hr />
            <p className="lead">{user.about}</p>
            <hr />
            <ProfileTabs 
              followers={user.followers}
              following={user.following}
              posts={posts}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
