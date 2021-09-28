import React from "react";
import Button from 'react-bootstrap/Button';
import firebase from 'firebase';
import BatchSelector from './BatchSelector';
import "./AssignBatchCode.css"
let arr=new Array();
function AssignBatchCode(props){
    const [loading,setLoading]=React.useState(true);
   const [selectedBatchId,setSelectedBatchId]=React.useState("");
return(<table>
<tr>
<td>
<BatchSelector selectedBatchId={props.value}
 setSelectedBatchId={(val)=>{props.setSelectedBatchId(val)}}/>

</td>
<td>
    <Button onClick={props.onsave}>Save</Button>
</td>
</tr> 
    </table>
);
}
export default AssignBatchCode;