import React from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom'
import axios from 'axios';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import Profile from './components/Profile';
import HotSpots from './components/HotSpots';
import Pending from './components/Pending';
import Matches from './components/Matches';
import Signup from './components/Signup';
import Login from './components/Login';
import Interests from './components/Interests';


class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      username: "",
      isLoggedIn: false,
    }

    this.gateKeeper = this.gateKeeper.bind(this);
  }

  gateKeeper() {
    this.setState({
      isLoggedIn: !this.state.isLoggedIn,
    })
  }

  render() {
    const { isLoggedIn } = this.state;
    return (
      <div className="App" >
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="#home">3rd-Wheel</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
        { 
          isLoggedIn ? 
          <Nav className="top-bar">
            <NavDropdown title="Your Card" id="basic-nav-dropdown">
              <Link className="dropdown-item" to="/profile" >Profile</Link>
              <Link className="dropdown-item" to="/interests" >Interests</Link>
            </NavDropdown>
            <Link className="nav-link" to="/hotspots" >Hot Spots</Link>
            <Link className="nav-link" to="/matches" >Matches</Link>
            <Link className="nav-link" to="/pending" >Pending</Link>
            {/*  // Make this sign out user and relocate them to sign in
              <Link className="nav-link" to="/signin" >Sign out</Link> */}
          </Nav>
          : 
          <Nav className="top-bar">
            <Link className="nav-link" to="/signup" >Sign up</Link>
            <Link className="nav-link" to="/login" >Log in</Link>
          </Nav>
        }
          </Navbar.Collapse>
        </Navbar>
        { 
          isLoggedIn ? 
            <Switch>
              <Route exact path="/" render={() => {
                <Redirect to="/profile" />
              }} />
              <Route path="/matches" component={Matches} />
              <Route path="/interests" component={Interests} />
              <Route path="/hotspots" component={HotSpots} />
              <Route path="/pending" component={Pending} />
              <Route path="/profile" component={Profile} />
            </Switch>
          :
            <Switch>
              <Route exact path="/" render={() => (
                <Redirect to="/signup"/>
              )} />
              <Route path="/signup" component={(props) => <Signup {...props} gateKeeper={this.gateKeeper} isLoggedIn={isLoggedIn} />} />
              <Route path="/login" component={Login} />
            </Switch>
        }
      </div>
    )
  }
}

export default App;