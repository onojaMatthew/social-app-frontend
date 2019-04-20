import React, { Component } from "react";
import { findPeople, follow } from "./apiUser";
import FindPeopleList from "./FindPeopleList";
import { isAuthenticated } from "../auth";

class Users extends Component {
  state = {
    users: [],
    error: "",
    open: false,
    followMessage: "",
  }

  componentDidMount() {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;
    findPeople(userId, token)
      .then(data => {
        if (data.error) {
        } else {
          this.setState({ users: data });
        }
      });
  }

  clickFollow = (user, i) => {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;

    follow(userId, token, user._id)
      .then(data => {
        if (data.error) {
          this.setState({
            error: data.error
          });
        } else {
          let toFollow = this.state.users;
          toFollow.splice(i, 1);
          this.setState({
            users: toFollow,
            open: true,
            followMessage: `Following ${user.name}`
          });
        }
      });
  }
  render(){
    const { users, followMessage, open } = this.state;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Find People</h2>
          {open && 
            <div className="alert alert-success">
              <p>{followMessage}</p>
            </div>
          }
          
        <FindPeopleList users={users} clickFollow={this.clickFollow} />
      </div>
    );
  }
}

export default Users;
