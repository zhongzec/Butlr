import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";
import './App.css';
import { Navigation } from 'components/Navigation';
import { HomeContainer } from 'pages/home';
import { AppContext } from 'contexts/App';
import { API_URL } from 'constants/index';
import axios from 'axios';

const API = axios.create({ baseURL: API_URL });

function App() {
  return (
    <AppContext.Provider value={{
      User: {
        username: 'Daniel'
      },
      API
    }}>
      <Router>
        {/* <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">SignUp</Link>
            </li>
          </ul>
        </div> */}

        <Switch>
          <Route exact path="/">
            <div className="App">
              <Navigation/>
              <HomeContainer />
            </div>
          </Route>
          <Route path="/login">
            login
          </Route>
          <Route path="/signup">
            signup
          </Route>
        </Switch>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
