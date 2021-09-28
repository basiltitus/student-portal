import React, { Component, useEffect } from 'react'
import { Button,Table } from 'react-bootstrap';
import firebase from 'firebase';
import StartMeetingModal from './StartMeetingModal';
import './AdminTable.css'
import MeetingLinkModal from './MeetingLinkModal'
import { scryRenderedDOMComponentsWithTag } from 'react-dom/test-utils';
let arr=new Array();
function AdminTable(props){
    const[Loading,setLoading]=React.useState(true);
    const[Refresh,setRefresh]=React.useState(false);
    const[showMeetingLinkModal,setShowMeetingLinkModal]=React.useState(false);
    const [recordUrl,setRecordUrl]=React.useState("");
    const [saveMeetingId,setSaveMeetingID]=React.useState("");
    var ref= firebase.database().ref('Batches/'+props.batchId+'/Meeting');
    function RerenderTable(){
         ref.on('value', (snapshot) => {
            arr=[];
            snapshot.forEach((childSnapshot) => {
              var childKey = childSnapshot.key;
              var childData = childSnapshot.val();
              arr.push(childData);
            });
            arr.reverse();
          });
        }
      
    // React.useEffect(() => {
      
    ref.on('child_changed', (data) => {
      setRefresh(!Refresh);
      RerenderTable();
    });  
      // React.useEffect(() => {
       
      ref.on('child_added', (data) => {
        
      });
      // });
      // useEffect(() => {
        RerenderTable();
      // }, [])
    function StartMeeting(meetingId){
        var db = firebase.database();
        // alert(props.batchId);
        db.ref("Batches/"+props.batchId+"/Meeting/"+meetingId).update({ MeetingStatus: "active" });
        setLoading(!Loading);
        window.open("https://3.141.108.22/"+meetingId, "_blank");
    }
    function StopMeeting(meetingId){
        var db = firebase.database();
        // alert(props.batchId);
        setLoading(!Loading);
        db.ref("Batches/"+props.batchId+"/Meeting/"+meetingId).update({ MeetingStatus: "expired" });
    }
    function startMeetingParticipant(meetingId){
      window.open("https://3.141.108.22/"+meetingId, "_blank");
  }
    function renderTableItems(){
      
      if(arr.length===0){
        return <h5>No Meetings Scheduled!</h5>
      }
      function deleteMeeting(meetingId){
        var db = firebase.database();
        db.ref("Batches/"+props.batchId+"/Meeting/"+meetingId).remove();
        setLoading(!Loading);

      }
      function SaveMeetingRecording(MeetingId){
        if(recordUrl==="")
        {window.open("https://www.dropbox.com/home/Apps/JitsiMeetWinWorld/Recordings", "_blank");
        setSaveMeetingID(MeetingId)
          setShowMeetingLinkModal(true);}
          else{
            firebase.database().ref("Batches/"+props.batchId+"/Meeting/"+MeetingId).update({ MeetingStatus: "recording available",recordUrl:recordUrl });
            setRecordUrl("");
          }
      }
      function PlayRecording(MeetingId){
        firebase.database().ref().child("Batches").child(props.batchId).child("Meeting").child(MeetingId).once("value", function (snapshot) {
            const recordUrl=snapshot.val().recordUrl;
            window.open(recordUrl, "_blank");
          });
        
      }

return   arr.map((element) =>{
        console.log(element);
return <tr>
<td><b>{element.TrainerName}</b></td>
<td>{element.MeetingDateTime}</td>
<td>{element.MeetingStatus}</td>
<td>
<Button 
onClick={()=>{if(element.MeetingStatus=="inactive"&&props.role==="admin")
StartMeeting(element.MeetingId);
else if(props.role==="admin"&&element.MeetingStatus==="active"){
    StopMeeting(element.MeetingId);
}else if(props.role==="admin"&&element.MeetingStatus==="expired"){
  SaveMeetingRecording(element.MeetingId);
}
if(props.role==="participant"&&(element.MeetingStatus=="inactive"||element.MeetingStatus=="active")){
return startMeetingParticipant(element.MeetingId);
}else if(props.role==="participant"&&element.MeetingStatus==="recording available"){
  PlayRecording(element.MeetingId)
}
}}
disabled={props.role==="participant"?element.MeetingStatus=="expired"||element.MeetingStatus=="inactive":element.MeetingStatus=="recording available"}
>
{element.MeetingStatus=="inactive"&&props.role==="admin"&&"Start"}
{element.MeetingStatus=="active"&&props.role==="admin"&&"Stop"}
{element.MeetingStatus=="expired"&&props.role==="admin"&&'Add Recording'}
{element.MeetingStatus=="recording available"&&props.role==="admin"&&'Link Added'}
{element.MeetingStatus=="inactive"&&props.role==="participant"&&"Upcoming"}
{element.MeetingStatus=="active"&&props.role==="participant"&&"Join"}
{element.MeetingStatus=="expired"&&props.role==="participant"&&'Expired'}
{element.MeetingStatus=="recording available"&&props.role==="participant"&&'Play Recording'}
</Button>
</td>

{props.role==="admin"&&<td><Button variant="danger" onClick={()=>deleteMeeting(element.MeetingId)}>Delete</Button></td>}
</tr>
        });
    }
return <div>
<Table striped bordered hover responsive className="meetingTable">
<thead>
    <tr>
      <th>Trainer Name</th>
      <th>Time</th>
      <th>Status</th>
      <th>Action</th>
      {props.role==="admin"&&<th>Delete</th> }
    </tr>
  </thead>
  <tbody>
{renderTableItems()}
  </tbody>
  </Table>
  <MeetingLinkModal handleClose={()=>setShowMeetingLinkModal(false)} show={showMeetingLinkModal}
    recordUrl={recordUrl} changeRecordUrl={(val)=>setRecordUrl(val)} save={()=>{firebase.database().ref("Batches/"+props.batchId+"/Meeting/"+saveMeetingId).update({ MeetingStatus: "recording available",recordUrl:recordUrl });
            setShowMeetingLinkModal(false);
            setRecordUrl("");}
            }
  />
</div>

}
export default AdminTable;
