import React from "react";
import { Link } from 'react-router-dom';
import DefaultPost from "../assets/annapaurna.jpg";
import { isAuthenticated } from "../auth";

const SinglePostDetails = ({ post, deletePost }) => {
  const postedBy = post.postedBy ? `/user/${post.postedBy._id}` : "";
  const posterName = post.postedBy ? post.postedBy.name : " Unknown";
  return (
    <div className="card-body">
      <img 
        src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
        alt={posterName}
        style={{ 
          width: "100%",
          height: "300px",
          objectFit: "cover"
        }}
        onError={i => i.target.src=`${DefaultPost}`}
        className="img-thumbnail mb-2"
      />
      <p className="card-text">{post.body}</p>
      <hr />
      <p className="font-italic mark">
        Posted by <Link to={postedBy}>{posterName}</Link>{" "}
        on {new Date(post.created).toDateString()}
      </p>
      <div className="d-inline-block">
        <Link to={`/`} className="btn btn-raised btn-sm btn-primary mr-5">Back to Posts</Link>
        {isAuthenticated().user && isAuthenticated().user._id === post.postedBy._id && (
          <>
            <Link to={`/post/edit/${post._id}`} className="btn btn-raised btn-sm btn-warning mr-5">Update Post</Link>
            <button to={`/`} onClick={deletePost} className="btn btn-raised btn-sm btn-danger ">Delete Post</button>
          </>
        )}
      </div>
    </div>
  )
}

export default SinglePostDetails;
