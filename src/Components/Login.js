import React from 'react';
import './login.css'
import firebase from 'firebase';
import firebaseConfig from '../firebaseConfig.js';
import Button from 'react-bootstrap/Button';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

if (!firebase.apps.length) {
firebase.initializeApp(firebaseConfig);}
function Login() {
    const [userName,setUserName]=React.useState("");
const [password,setPassword]=React.useState("");
const [invalid,setInvalid]=React.useState("");
const [loading,setLoading]=React.useState(false);

function loginFn(){
    setLoading(true);
    firebase.auth().signInWithEmailAndPassword( userName, password)
  .then((userCredential) => {
    // Signed in 
    setLoading(false);
    setUserName("success");
    // ...
  })
  .catch((error) => {
    setPassword("");
    setInvalid("Invalid User Credentials");
    setLoading(false);
    const errorCode = error.code;
    const errorMessage = error.message;
  });
}
function forgetPassword(){
    setLoading(true);
    if(userName==""){
        setInvalid("Enter your Email ID")
        setLoading(false);
        return; 
    }
    firebase.auth().sendPasswordResetEmail(userName)
        .then(function() {
            setLoading(false);
          setInvalid("Password reset link sent !");
        })
        .catch(function(error) {
            setLoading(false);
            setInvalid("Account doesn't exists");
        });
}
    return (
        
        <div class="loginScreen">
    <div class="row row-size">
        <div class="col-md-6 d-none d-lg-block">
            <img src='https://i.im.ge/2021/08/05/hFbha.png' id="imgLogin" />
        </div>
        <div class="col-md-6 col-sm-12">
            <div id="loginFormDiv" class="card">
                <div id="loginForm" class="card-body">
                    <h2>
                        Win World
                    </h2>
                    <p>
                        Welcome back! Please login to your account.
                    </p>
                    
                        <input type="email" class="form-control formInput" placeholder="Username" name="UserName" value={userName} onChange={(val)=>{setUserName(val.target.value)}} />
                        <input type="password" class="form-control formInput" placeholder="Password" name="Password" value={password} onChange={(val)=>setPassword(val.target.value)} />
                        <div className="forgetButton"><Button variant="link" onClick={forgetPassword} > Forgot Your Password?</Button></div>
                        <div class="d-grid gap-2 d-md-block">
                            <button class="btn btn-primary formSubmit" id="btn-one" onClick={()=>{loginFn();}}>{loading?'Loading....':'Login'}</button>
                        </div>
                        <span>{invalid}</span>
                </div>
            </div>
        </div>
    </div>
</div>

//         <center>
//         <div class="col-md-12 col-lg-10 outerFrame">
//         <div class="wrap d-md-flex">
//         {/* <div class="img" style="background-image: url({Background});"> 
//         </div> */}
//         <img class="img" src={Background} />
//         <div class="login-wrap p-4 p-md-5">
//         <div class="d-flex">
//         <div class="w-100">
//         <h1 >WinWorld</h1>
//         <h3 class="mb-4 signinHeading">Sign In</h3>
//         </div>
//         </div>
//         <div class="signin-form">
//         <div class="form-group mb-3">
//         <label class="label" for="name">Username</label>
//         <input type="text" class="form-control" placeholder="Username" required="" onChange={(val)=>setUserName(val.target.value)} value={userName} />
//         </div>
//         <div class="form-group mb-3">
//         <label class="label" for="password">Password</label>
//         <input type="password" class="form-control" placeholder="Password" required=""  onChange={(val)=>setPassword(val.target.value)} value={password} />
//         </div>
//         <div class="form-group">
//         <button class="form-control btn btn-primary rounded submit px-3" onClick={()=>loginFn()}>Sign In</button>
//         </div>
//         </div>
//         <p class="text-center">Need help? <a data-toggle="tab" href="#signup">Contact Us</a></p>
//         </div>
//         </div>
//         </div>
// </center>
    );
}
export default Login;
