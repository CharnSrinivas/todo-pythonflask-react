import React from "react";
import Authenticate from "../Compopnents/Auth/Authenticate";
import Todos from "../Compopnents/Todo/Todos";
import Login from "../Compopnents/Auth/Login";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

export var apiUrl = "http://127.0.0.1:5000/api";
///////////////   Current user Details ////////////////////////////

export var userId = "";
export var userName = "";

export function setUserId(id) {
  userId = id;
}

export function setUserName(user_name) {
  userName = user_name;
}
////////////////////////////////////////////////////////////////////////////////////

class App extends React.Component {
  constructor(){
    super();
    // To get saved log in or sigin info
    if(localStorage.getItem('userName') && localStorage.getItem('userId'))
    {
      userName=localStorage.getItem('userName')
      userId = localStorage.getItem('userId')
    }
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/auth/">
              <Authenticate />
            </Route>
            <Route path="/todos/" exact render={()=>{
              ////////// Going into todos if logged in
              
              if(userName!=='' && userId!==''){
              return  <Todos/>                
              }
              else{
                return <Login/>
              }
              ////////////////////////////////////
            }}/>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
