import React from "react";
import firebase from 'firebase';
import LoadingScreen from './LoadingScreen'
let arr=new Array();

function BatchSelector(props){
    const [Loading,setLoading]=React.useState(true);
    // React.useEffect(() => {
    const post = firebase.database().ref().child('Batches');
    post.once('value', snap => {
     arr=[];
     arr.push("Select Batch");
        snap.forEach(child => {
        //   console.log(child);
           arr.push(child.key);
        });
        setLoading(false);
        OptionsForBatchId();
    });
    // });
    // console.log("hey"+arr);
    function OptionsForBatchId(){
        return arr.map(function (mark, i) {
            // console.log(mark);
            return <option
                key={mark}
                value={mark}>{mark}
            </option>
        });
       }
return Loading?<LoadingScreen />:<div>Select Batch : <select value={props.selectedBatchId}
onChange={(e)=>props.setSelectedBatchId(e.target.value)}>{OptionsForBatchId()}</select></div>
}

export default BatchSelector;