import React, { Fragment, useEffect, useState ,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../../action/UserAction";
import Loader from "../layout/loading/loader";
import "./LoginSignUp.css"
import { Link } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import { useNavigate } from "react-router-dom"

const LoginUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginEmail, setloginEmail] = useState(null)

  const [loginPassword, setloginPassword] = useState(null)
    
  const [user, setuser] = useState({
    name:"",
    email:"",
    password:"",
  })
  const {name,email,password} = user
  // avatar preview
  const [avatar, setavatar] = useState("")
  const [avatarPreview, setavatarPreview] = useState("/logo192.png")
  
  //use of selector
  const { loading,isAuthenticated } = useSelector((state) => state.user);

 
//use reff
 
 const switcherTab =  useRef(null)
 const loginTab = useRef(null)
 const registerTab = useRef(null)

 const loginSubmit = (e)=>{
  e.preventDefault()
  dispatch(login(loginEmail,loginPassword))
  
  if(isAuthenticated){
    navigate('/account')
  }
  console.log("submitted successfully")
 }

 const registerSubmit = (e)=>{
  e.preventDefault();

  const myForm = new FormData();

  myForm.set("name", name);
  myForm.set("email",email);
  myForm.set("password",password);
  myForm.set("avatar",avatar);
  console.log("registerForm Submitted")
  dispatch(register(myForm))
 }


 const registerDataChange = (e)=>{
  if(e.target.name === "avatar"){
    const reader = new FileReader();

    reader.onload =   () =>{
      if(reader.readyState ===2){
        setavatarPreview(reader.result);
        setavatar(reader.result)
      }

    }
    reader.readAsDataURL(e.target.files[0]);

  }
  else{
    setuser({...user,[e.target.name]:e.target.value})
  }
 }

  //switcherTabs
  const switchTabs = (e,tab)=>{
    if(tab === "login"){
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm")
      loginTab.current.classList.remove("shiftToLeft")
      
    }
    if(tab === "register"){
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm")
      loginTab.current.classList.add("shiftToLeft")
    }
  }
   
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
              <div>
                <div className="login_signUp_toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>Login</p>
                  <p onClick={(e) => switchTabs(e, "register")}>Register</p>
                </div>
                <button ref={switcherTab}></button>
              </div>
              <form className="loginForm"  ref={loginTab} onSubmit={loginSubmit}>
                <div className="loginEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setloginEmail(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setloginPassword(e.target.value)}
                  />
                </div>
                <Link to={"/password/forgot"}> Forgot Password </Link>

                <input type="submit" value="login" className="loginBtn" />
              </form>
              <form
                action=""
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
                className="signUpForm"
              >
                <div className="signUpName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUppassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>
                <div id="registerImage">
                  <img src={avatarPreview} alt=" Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <input
                  type="submit"
                  
                  className="signUpBtn"
                  
                  value="submit"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default LoginUser;
