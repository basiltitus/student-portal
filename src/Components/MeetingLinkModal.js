import React from 'react'
import { Modal,Button } from 'react-bootstrap';

function MeetingLinkModal(props) {
    
    return (
      <>  
        <Modal show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Recorded URL</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          Add Recorded URL : <input type="url" value={props.recordUrl} onChange ={(val)=>props.changeRecordUrl(val.target.value)} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={props.save} disabled={props.recordUrl==""}>
              Save 
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
  export default MeetingLinkModal;