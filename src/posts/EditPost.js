import React, { Component } from "react";
import { singlePost, updatePost } from './apiPost';
import { isAuthenticated } from "../auth";
import EditPostForm from './EditPostForm';
import { Redirect } from 'react-router-dom';
import DefaultPostImage from "../assets/annapaurna.jpg";

class EditPost extends Component {
  state = {
    id: "",
    title: "",
    body: "",
    redirectToProfile: false,
    error: "",
    fileSize: 0,
    loading: false,
  }

  init = (postId) => {
    singlePost(postId)
      .then(data => {
        if (data.error) {
          this.setState({ redirectToProfile: true })
        } else {
          this.setState({
            id: data._id,
            title: data.title,
            body: data.body,
            error: ""
          });
        }
      });
  }

  componentDidMount() {
    this.postData = new FormData();
    const postId = this.props.match.params.postId;
    this.init(postId);
  }

  handleChange = name => event => {
    this.setState({ error: "" });
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    console.log(value, " value from editpost")
    const fileSize = name === "photo" ? event.target.files[0].size : 0
    this.postData.set(name, value);
    this.setState({ [name]: value, fileSize });
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

  clickSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });
    if (this.isValid()) {
      const postId = this.state.id;
      const token = isAuthenticated().token;
      updatePost(postId, token, this.postData)
        .then(data => {
          if (data.error) this.setState({ error: data.error })
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
    const { id, title, body, error, loading, redirectToProfile } = this.state;
    if (redirectToProfile) {
      return <Redirect to={`/user/${isAuthenticated().user._id}`} />
    }
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">{title}</h2>
        <div className="alert alert-danger" style={{ display: error ? "" : "none"}}>{error}</div>
        {loading ? <div className="jumbotron text-center"><h2>Loading...</h2></div> : ""}
        <img 
          style={{ height: 200, widht: "auth" }} 
          src={`${process.env.REACT_APP_API_URL}/post/photo/${id}?${new Date().getTime()}`} alt={title}
          onError={i => i.target.src = `${DefaultPostImage}`}
          className="img-thumbnail"
        />
        <EditPostForm 
          body={body}
          title={title}
          handleChange={this.handleChange}
          clickSubmit={this.clickSubmit}
        />
      </div>
    );
  }
}

export default EditPost;
