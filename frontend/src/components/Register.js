import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

export default class Login extends Component {

  state = {
    username:'',
    email: '',
    password: '',
    language: 'es',
    redirect: false
  }

  onSubmit = async e => {
    e.preventDefault();
    const res = await axios.post('http://localhost:4000/api/users/register',
     {username:this.state.username,
      email: this.state.email,
      password: this.state.password,
      language: this.state.language});

    if(res.status === 200){
      localStorage.setItem('session', JSON.stringify(res.data.user));
      this.setState({ redirect: true })
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
        <div id="register">
         <div className="container">
             <div id="register-row" className="row justify-content-center align-items-center">
                 <div id="register-column" className="col-md-6">
                     <div id="register-box" className="col-md-12">
                         <form id="register-form" className="form" onSubmit={this.onSubmit}>

                             <h3 className="text-center text-info">Sign Up</h3>

                             <div className="form-group">
                                 <label htmlFor="username" className="text-info">Username:</label><br/>
                                 <input type="text" name="username" id="username" className="form-control" onChange={this.onInputChange}/>
                             </div>

                             <div className="form-group">
                                 <label htmlFor="email" className="text-info">Email:</label><br/>
                                 <input type="email" name="email" id="email" className="form-control" onChange={this.onInputChange}/>
                             </div>

                             <div className="form-group">
                                 <label htmlFor="password" className="text-info">Password:</label><br/>
                                 <input type="password" name="password" id="password" className="form-control" onChange={this.onInputChange}/>
                             </div>

                             <div className="form-group">
                                <label htmlFor="cars">Choose the news language:</label>
                                <select onChange={this.onInputChange} id="language" name="language" className="form-group">
                                  <option value="es">Spanish</option>
                                  <option value="en">English</option>
                                  <option value="it">Italian</option>
                                  <option value="fr">French</option>
                                </select>
                             </div>

                             <div className="form-group">
                             <label htmlFor="remember-me" className="text-info"><span>Remember me</span> <span><input id="remember-me" name="remember-me" type="checkbox" /></span></label><br/>
                                <input type="submit" name="submit" className="btn btn-info btn-md" value="Register" />
                                {this.renderRedirect()}
                            </div>

                             <div id="register-link" className="text-right">
                                 <Link className="text-info" to="/login">Login here</Link>
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
