import React from "react";
import { Modal,Button } from "react-bootstrap";
import firebase from "firebase";
import ReactDatePicker from "react-datepicker"
import BatchSelector from './BatchSelector';
let arr=new Array();
function StartMeetingModal(props){
   const [selectedBatchId,setSelectedBatchId]=React.useState("");
   const [startDate, setStartDate] = React.useState(new Date());
   const [trainerName,setTrainerName]=React.useState("");
   function startMeeting(){
    //  alert(startDate);
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let startDateString=startDate.toString();
    startDateString=days[startDate.getDay()]+" - "+ startDate.getDate()+" "+
    startDate.toLocaleString('default', { month: 'short' })+" "+startDate.getFullYear()+" - "+startDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    firebase.database().ref('Batches/' + selectedBatchId+"/Meeting/"+selectedBatchId+new Date().getTime()).set({
       MeetingId:selectedBatchId+new Date().getTime(),
       MeetingDateTime:startDateString,
       MeetingStatus:"inactive",
       TrainerName:trainerName,
       RecordUrl:"",
      });
    // window.open("https://3.141.108.22/"+selectedBatchId+new Date().getTime(), "_blank")
       props.handleClose();
   }
return (<Modal show={props.show} onHide={props.handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Start A Meeting</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <BatchSelector selectedBatchId={selectedBatchId} setSelectedBatchId={(val)=>setSelectedBatchId(val)}/>
    <br />Trainer Name : <input type="text" value={trainerName} onChange={(val)=>{setTrainerName(val.target.value)}} />
    <br/>Select Date And Time : <span><ReactDatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      timeInputLabel="Time:"
      dateFormat="dd/MM/yyyy h:mm aa"
      showTimeInput
      onClick={()=>{}}
      onInputClick={()=>{}}
    /></span>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={props.handleClose}>
        Close
      </Button>
      <Button variant="primary" onClick={startMeeting}>
        Save
      </Button>
    </Modal.Footer>
    </Modal>);
}
export default StartMeetingModal;