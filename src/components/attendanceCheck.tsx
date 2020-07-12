import * as React from 'react';
import './Login.css';

interface AttendanceUpdateProps{
    punctualCount : number;
    tardyCount : number;    
    absenteeCount : number;
    
}

const AttendanceCheck:React.FC<AttendanceUpdateProps>=(props)=>{

    return(

        <div className='row'> 
            <div className='col-md-2'>
             <b> Punctual :</b>  <input type='text' value={props.punctualCount}  size={4} /> </div>
               <div className='col-md-2'>
              <b> Tardy :</b> <input type='text' value={props.tardyCount} size={4} /> </div>
               <div className='col-md-2'>
              <b>Absentee : </b> <input type='text' value={props.absenteeCount}  size={4}/>  <br/> <br/>
             </div>
           </div>
           

    )
}

export default AttendanceCheck;