import React from "react";
import { Modal,Button } from "react-bootstrap";
import firebase from 'firebase';
function AddBatchModal(props){
    const [batchName,setBatchName]=React.useState("");
    const [batchId,setBatchId]=React.useState("");
    function AddBatch(){
            firebase.database().ref('Batches/' + batchId).set({
              batchName:batchName,
              batchId:batchId,
              Meeting:{
              }
            });
            // firebase.database().ref('Batches/' + batchId).push("")
            props.handleClose();
        }
    
return  <Modal show={props.show} onHide={props.handleClose}>
<Modal.Header closeButton>
  <Modal.Title>Add Batch</Modal.Title>
</Modal.Header>
<Modal.Body>
   Batch Name : <input type="text"value={batchName} onChange={(val)=>setBatchName(val.target.value)} />
   <br/>
   Batch ID : <input type="text" value={batchId} onChange={(val)=>setBatchId(val.target.value)} /> 
</Modal.Body>
<Modal.Footer>
  <Button variant="secondary" onClick={props.handleClose}>
    Close
  </Button>
  <Button variant="primary" onClick={AddBatch}>
    Add
  </Button>
</Modal.Footer>
</Modal>
}
export default AddBatchModal;