import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

export default class Login extends Component {

  state = {
    email: '',
    password: '',
    redirect: false
  }

  onSubmit = async e => {
    e.preventDefault();
    const res = await axios.post('http://localhost:4000/api/users/login', {email: this.state.email, password: this.state.password});

    if(res.status === 200){
      localStorage.setItem('session', JSON.stringify(res.data.user));
      this.setState({ redirect: true })
      window.location.reload(false);
    }
  }

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/home' />
    }
  }

  render() {
    return (
        <div id="login">
         <div className="container">
             <div id="login-row" className="row justify-content-center align-items-center">
                 <div id="login-column" className="col-md-6">
                     <div id="login-box" className="col-md-12">
                         <form id="login-form" className="form" onSubmit={this.onSubmit}>

                             <h3 className="text-center text-info">Login</h3>

                             <div className="form-group">
                                 <label htmlFor="email" className="text-info">Email:</label><br/>
                                 <input type="text" name="email" id="email" className="form-control" onChange={this.onInputChange}/>
                             </div>

                             <div className="form-group">
                                 <label htmlFor="password" className="text-info">Password:</label><br/>
                                 <input type="password" name="password" id="password" className="form-control" onChange={this.onInputChange}/>
                             </div>

                             <div className="form-group">
                             <label htmlFor="remember-me" className="text-info"><span>Remember me</span> <span><input id="remember-me" name="remember-me" type="checkbox" /></span></label><br/>
                                <input type="submit" name="submit" className="btn btn-info btn-md" value="Login" />
                                {this.renderRedirect()}
                            </div>

                             <div id="register-link" className="text-right">
                                 <Link className="text-info" to="/signup">Register here</Link>
                             </div>
                         </form>
                     </div>
                 </div>
             </div>
         </div>
     </div>
    )
  }
}
