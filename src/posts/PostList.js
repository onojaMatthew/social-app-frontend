import React from "react";
import { Link } from "react-router-dom";
import DefaultPost from "../assets/annapaurna.jpg"

const PostList = ({ posts }) => {
  return (
    <div className="row">
      {posts && posts.map((post, i) => {
        const postedBy = post.postedBy ? `/user/${post.postedBy._id}` : "";
        const posterName = post.postedBy ? post.postedBy.name : " Unknown";
        return (
          <div className="card col-md-4" key={i}>
            <div className="card-body">
              <img 
                src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                alt={posterName}
                style={{ 
                  width: "100%",
                  height: "200px" 
                }}
                onError={i => i.target.src=`${DefaultPost}`}
                className="img-thumbnail mb-2"
              />
              <h5 className="card-title">{post.title}</h5>
              <p className="card-text">{post.body.substring(0, 20)}</p>
              <hr />
              <p className="font-italic mark">
                Posted by <Link to={postedBy}>{posterName}</Link>{" "}
                on {new Date(post.created).toDateString()}
              </p>
              <Link to={`/post/${post._id}`} className="btn btn-raised btn-sm btn-primary">Read more...</Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PostList;
