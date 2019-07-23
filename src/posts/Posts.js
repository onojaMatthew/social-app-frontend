import React, { Component } from "react";
import { list } from "./apiPost";
import PostList from "./PostList";

class Posts extends Component {
  state = {
    posts: [],
  }

  componentDidMount() {
    list()
      .then(data => {
        if (data.error) {
          console.log("Error")
        } else {
          this.setState({ posts: data });
        }
      });
  }
  render(){
    const { posts } = this.state;
    console.log(posts)
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">
          {!posts.length ? "Posts list is empty. Consider creating posts" : "Recent Posts"}
        </h2>
        <PostList posts={posts} />
      </div>
    );
  }
}

export default Posts;
