import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { apiUrl,setUserName,setUserId } from "../../Containers/App";
import "./auth.css";
const Login = () => {
  const history = useHistory()
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  
  const login = async (e) => 
  {
    e.preventDefault()  
    let request  = await fetch(`${apiUrl}/auth/login` , {
        method:"POST",
        body:JSON.stringify({userName:userName,password:password})
    })
    if (request.status === 200){
        let data = await request.json()
        setUserId(data.id)
        setUserName(data.userName)
        localStorage.setItem('userName',data.userName)
        localStorage.setItem('userId',data.id)
        history.push('/todos')
    }
    // console.log(request);
  };

  return (
    <form className="login-div"  onSubmit={login}>
      <center>LogIn</center>
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
          <button className="btn" type='submit'

          >Login</button>
          <a href='/auth/signin'>create account</a>
      </div>
    </form>
  );
};

export default Login;
