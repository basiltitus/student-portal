import React from "react";
import firebase from 'firebase';
import firebaseConfig from '../firebaseConfig.js';
import AssignBatchCode from './AssignBatchCode';
import { Button } from "react-bootstrap";
import AdminTable from "./AdminTable.js";
import  './ParticipantPage.css'
import { useHistory } from "react-router";
import LoadingScreen from './LoadingScreen'
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    }


function ParticipantPage(){
    const[user,setUser]=React.useState();
    const[loading,setLoading]=React.useState(true);
    const [refresh,setRefresh]=React.useState(false);
    const[batchCodeAssigned,setBatchCodeAssigned]=React.useState(false);
    const[batchCode,setBatchCode]=React.useState("");
    const dbRef = firebase.database().ref();
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            setUser(user);
dbRef.child("participants").child(user.uid).get().then((snapshot) => {
  if (snapshot.exists()) {
    setBatchCode(snapshot.val().batchCode);
    setBatchCodeAssigned(true);
    setLoading(false);
  } else {
      setLoading(false);
    setBatchCodeAssigned(false);
  }
}).catch((error) => {
  console.error(error);
});}
});
function AssignBatchCodeFn(){
    
        firebase.database().ref('participants/' + user.uid).set({
          email: user.email,
          batchCode:batchCode
        });
        setLoading(false);
        setBatchCodeAssigned(true);
    
}
function Logout(){
  firebase.auth().signOut().then(() => {
    useHistory.push("/");
  }).catch((error) => {
    // An error happened.
  });
}
function RemoveBatchCodeFn(){
  firebase.database().ref('participants/' + user.uid).remove();
 setBatchCodeAssigned(false);
  
}
    return(
        loading?<LoadingScreen />:
        (batchCodeAssigned?
        <div className="pageDiv">
        <div className="topBarDiv">
        <h2 className="topBarBrandName">WinWorld Academy</h2>
        <div className="topBarDivButtons">
          <Button onClick={()=>{RemoveBatchCodeFn()}}>Change Batch Group?</Button>
            <Button onClick={()=>setRefresh(!refresh)} >Refresh</Button>
            <Button variant="danger" onClick={Logout}>Logout</Button>
        </div>
        </div>
            <AdminTable batchId={batchCode} role="participant"/>
        </div>:
        <AssignBatchCode value={batchCode} 
        setSelectedBatchId={(val)=>setBatchCode(val)} onsave={AssignBatchCodeFn} />)
    );
}

export default ParticipantPage;