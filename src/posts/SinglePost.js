import React, { Component } from "react";
import { singlePost, remove } from './apiPost';
import SinglePostDetails from "./SinglePostDetails";
import { isAuthenticated } from "../auth";
import { Redirect } from 'react-router-dom';

class SinglePost extends Component {
  state = {
    post: "",
    error: "",
    redirectToHome: false
  }

  componentDidMount() {
    const postId = this.props.match.params.postId;

    singlePost(postId)
      .then(data => {
        if (data.error) {
          this.setState({ error: data.error });
        } else {
          this.setState({
            post: data
          });
        }
      })
  }

  deleteConfirm = () => {
    const answer = window.confirm("Are you sure you want to delete this post?");
    if (answer) {
      this.deletePost()
    }
  }

  deletePost = () => {
    const postId = this.props.match.params.postId;
    const token = isAuthenticated().token;
    remove(postId, token)
      .then(data => {
        if (data.error) {
          console.log(data.error)
        } else {
          this.setState({
            redirectToHome: true
          })
        }
      })
  }

  render() {
    const { post, redirectToHome } = this.state;
    if (redirectToHome) {
      return <Redirect to="/" />
    }

    return (
      <div>
        <div className="container">
          <h2 className="display-2 mt-5 mb-5">{post.title}</h2>
          {!post ? <div className="jumbotron text-center"><h2>Loading...</h2></div> : (
            <SinglePostDetails post={post} deletePost={this.deleteConfirm} />
          )}
          
        </div>
      </div>
    );
  }
}

export default SinglePost;
