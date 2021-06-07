import React, { useState } from "react";
import { useHistory } from "react-router";
import { v4 as uuidv4 } from "uuid";
import { apiUrl, setUserName,setUserId } from "../../Containers/App";
const Signin = () => {
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory()
  const signin = async () => {
    var data = {
      userName: userName,
      password: password,
      id: uuidv4()
    }
    let request = await fetch(`${apiUrl}/auth/signin`, {
      method: "POST",
      body: JSON.stringify(data)
    });
    
    if(request.status==200){
      setUserName(data.userName)
      setUserId(data.id)
      localStorage.setItem('userName',data.userName)
      localStorage.setItem('userId',data.id)
      history.push('/todos')
    }
  };

  return (
    <form className="login-div">
      <center>SignIn</center>
      <div className="user-name-div">
        <input
          type="text"
          value={userName}
          placeholder="user name"
          onChange={(e) => {
            setuserName(e.target.value);
          }}
        ></input>
      </div>
      <div className="password-div">
        <input
          type="password"
          value={password}
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
      </div>
      <div className="login-btn">
        <button type="button" onClick={signin}>
          SignIn
        </button>
      </div>
    </form>
  );
};

export default Signin;
