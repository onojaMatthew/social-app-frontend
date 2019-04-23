import React, { Component } from "react";
import { singlePost, update } from './apiPost';
import { isAuthenticated } from "../auth";
import EditPostForm from './EditPostForm';
import { Redirect } from 'react-router-dom';

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
      const userId = isAuthenticated().user._id;
      const token = isAuthenticated().token;
      update(userId, token, this.postData)
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
    const { title, body, redirectToProfile } = this.state;
    if (redirectToProfile) {
      return <Redirect to={`/user/${isAuthenticated().user._id}`} />
    }
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">{title}</h2>
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
