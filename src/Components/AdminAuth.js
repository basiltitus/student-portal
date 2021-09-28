import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import firebaseConfig from '../firebaseConfig.js';
import { useHistory } from 'react-router-dom';
import {Alert} from 'react-bootstrap';
import LoadingGif from "./loading.gif";
import LoadingScreen from './LoadingScreen.js';
import AdminPage from './AdminPage';
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    }

function AdminAuth (){
    const history = useHistory();
    const [authorised,setAuthorised]=useState(false);
    const [loading,setLoading]=useState(true);
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            if(user.email.includes("admin"))
            {
              var uid = user.uid;
              setLoading(false);
              setAuthorised(true);  
        }
          else{
              setLoading(false);
            setAuthorised(false);
        }
        } else {
            setLoading(false);
            history.push("/login");
        }
      });
      return (loading?
      <>
      <LoadingScreen />
      </>
       :
        authorised?<AdminPage />:<h1>Unauthorised</h1>
        
      );
    
}
export default AdminAuth;