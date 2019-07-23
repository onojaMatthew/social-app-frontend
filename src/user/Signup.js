import React, { Component } from "react";
import { Link } from "react-router-dom";
import SignupForm from "./forms/SignupForm";
import { signup } from "../auth";

class Signup extends Component {
  state={
    name: "",
    email: "",
    password: "",
    error: "",
    open: false,
  }

  handleChange = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  }

  clickSubmit = event => {
    event.preventDefault();
    const { name, email, password } = this.state;
    const user = {
      name,
      email,
      password
    }
    //console.log(user);
    signup(user)
      .then(data => {
        if (data && data.error) this.setState({ error: data.error });
        else
          this.setState({
            error: "",
            name: "",
            email: "",
            password: "",
            open: true,
          })
        
      });
  }

  
  render() {
    const { name, email, password, error, open } = this.state;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Signup</h2>
        <div className="alert alert-danger" style={{ display: error ? "" : "none"}}>{error}</div>
        <div className="alert alert-success" style={{ display: open ? "" : "none"}}>
          New account successfully created. <Link to="/signin">Sign In</Link>.
        </div>
        <SignupForm 
          name={name} 
          email={email} 
          password={password}
          handleChange={this.handleChange}
          clickSubmit={this.clickSubmit}
        />
      </div>
    )
  }
}

export default Signup;
