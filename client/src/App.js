import React from 'react'
import {BrowserRouter,Link,Route,Switch} from 'react-router-dom';
// import './App.css';
import Register from './components/user/Register';
import Login from './components/user/Login'
import axios from 'axios'

class App extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      isAuthenticated: false 
    }
  }
  // handle page reloading, if the user is logged in, continue to login
  componentDidMount() {
    if(localStorage.getItem('token')) {
      this.setState(() => ({ 
        isAuthenticated: true 
      }))
    }
  }

  handleAuthentication = (boolean) => {
    this.setState(() => ({
      isAuthenticated: boolean
    }))
  }

  render() {
    return(
      <BrowserRouter>
      
        <div className="container">
          
          <div className="pt-5">
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
              <ul className="navbar-nav mr-auto">
                
                  <div className="navitems1">
                    <li className="nav-item"><Link to="/users/register">Register</Link></li>
                    <li className="nav-item ml-5"><Link to="/users/login">Login</Link></li>
                  </div>
                
              </ul>
            </nav>

          </div>
          <Switch>
          <Route path="/users/register" component={ Register } />
          <Route path="/users/login" render={(props) => {
              return <Login {...props} handleAuthentication={this.handleAuthentication} />
          }} />
          
          <Route path="/users/logout" render={(props) => {
              axios.delete('http://localhost:3005/users/logout', {
                headers: {
                  'x-auth': localStorage.getItem('token')
                }
                })
                .then(response => {
                  props.history.push('/users/login')
                  this.setState(() => ({
                    isAuthenticated: false
                  }))
                  localStorage.removeItem('token')
                })
              }} />
        </Switch>
        </div>
      </BrowserRouter>  
    )
  }
}

export default App;
