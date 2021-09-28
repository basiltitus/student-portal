import React from 'react';
import './login.css'
import firebase from 'firebase';
import firebaseConfig from '../firebaseConfig.js';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';

if (!firebase.apps.length) {
firebase.initializeApp(firebaseConfig);
}

function Login() {
    const [userName,setUserName]=React.useState("");
const [password,setPassword]=React.useState("");
const [invalid,setInvalid]=React.useState("");
const [loading,setLoading]=React.useState(false);
const history = useHistory();
function loginFn(){
    setLoading(true);
    firebase.auth().signInWithEmailAndPassword( userName, password)
  .then((userCredential) => {
    // Signed in 
    setLoading(false);
    if(userName.includes("admin"))
    history.push("/admin");
    else
    history.push("/participant");
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
        
        {/* https://i.im.ge/2021/08/05/hFbha.png */}
            <img src='https://i.im.ge/2021/08/05/hFbha.png' id="imgLogin" />
        </div>
        <div class="col-md-6 col-sm-12">
            <div id="loginFormDiv" class="card">
                <div id="loginForm" class="card-body">
                    <h2>
                        Win World Academy
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
    );
}
export default Login;
