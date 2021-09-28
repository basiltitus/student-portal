import React from "react";
import {Button} from 'react-bootstrap'; 
import AddBatchModal from './AddBatchModal';
import StartMeetingModal from "./StartMeetingModal";
import AdminTable from "./AdminTable";
import BatchSelector from "./BatchSelector";
import './AdminPage.css'
import firebase from 'firebase'
import { useHistory } from "react-router";
function AdminPage(){
  const [selectedBatchId,setSelectedBatchId]=React.useState("");
    const [showAddBatch, setShowAddBatch] = React.useState(false);
    const[refresh,setRefresh]=React.useState(false);
    const [showStartMeeting,setShowStartMeeting]=React.useState(false);
  const handleClose = () => setShowAddBatch(false);
  const handleShowAddbatch = () => setShowAddBatch(true);
  const handleCloseMeeting = () => setShowStartMeeting(false);
  function Logout(){
    firebase.auth().signOut().then(() => {
      useHistory.push("/");
    }).catch((error) => {
      // An error happened.
    });
  }
  console.log(selectedBatchId);
    return (
        <div className="pageDiv">
        <div className="topBar">
        <h2 className="topBarBrandName">WinWorld Academy</h2>
        <div className="topBarButtons">

        <Button variant="primary" onClick={handleShowAddbatch}>
        Add a new batch
      </Button>
      <Button variant="primary" onClick={setShowStartMeeting}>
        Start a new Meeting
      </Button>
      
      <Button onClick={()=>{window.open("https://console.firebase.google.com/project/winworld-dbcf1/authentication/users")}} >Add User </Button>
      <Button variant="danger" onClick={Logout}>Logout</Button>
      </div>
      </div>
      <br />
      <div className="batchSelectorDiv">
      <table>
      <tr><td>
        <BatchSelector selectedBatchId={selectedBatchId} setSelectedBatchId={(val)=>{ setSelectedBatchId(val);}}/>
        </td>
        <td>
        <Button className="refreshButton" size='sm' onClick={()=>setRefresh(!refresh)} >Go</Button>
        </td>
        </tr>
        </table>
        </div>
            <AdminTable batchId={selectedBatchId} role="admin" />
        <StartMeetingModal show={showStartMeeting} handleClose={handleCloseMeeting} />
        <AddBatchModal show={showAddBatch} handleClose={handleClose} />
        </div>
    );
}
export default AdminPage;