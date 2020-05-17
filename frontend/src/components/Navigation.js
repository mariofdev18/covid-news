import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Navigation extends Component {

  state = {
    session: false
  }

  componentDidMount() {
    if(localStorage.getItem("session") != null) this.setState({session: true});
  }

  logOut = () => {
    localStorage.removeItem("session");
    this.setState({session: false});
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <h1 className="navbar-brand">
            Covid-19 info
          </h1>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">

          {this.state.session ?
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/home">Main</Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/settings">Settings</Link>
              </li>
              <li onClick={this.logOut} className="nav-item active">
                <Link className="nav-link" to="/login">Log Out</Link>
              </li>
            </ul>
               :
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/signup">Sign Up</Link>
              </li>
            </ul>
          }

          </div>
        </div>
      </nav>
    )
  }
}
