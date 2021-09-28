import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import Admin from './Components/AdminAuth';
import Participant from './Components/ParticipantAuth';

const routing = (  
  <Router>  
    <div>
    <Route exact path="/">
    <Redirect to="/login" />
</Route>
      <Route path="/login" component={App} />  
      <Route path="/admin" component={Admin} />  
      <Route path="/participant" component={Participant} />  
    </div>  
  </Router>  
)  
ReactDOM.render(routing, document.getElementById('root'));  
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
