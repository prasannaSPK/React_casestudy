import * as React from 'react';
import {IEmployee} from '../model/employee';
import HrmsService from '../services/hrmsService';
import AttendanceCheck from './attendanceCheck';
import { Pie} from 'react-chartjs-2';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();
//import { Component } from 'react';


// interface IHrDashboardProps{
//     punctualCount : number;
//     tardyCount : number;    
//     absenteeCount : number;
    
//    // count : (employeeId: string, attendance: string) => void;
// }

interface IHrDashboardState{
    pageTitle : string;
    showChart : boolean; 
    employeeList : IEmployee[];
    punctualCount : number;
    tardyCount : number;    
    absenteeCount : number;
    chartData: object;
}

export class HrManagerDashboard extends React.Component<{},IHrDashboardState>{

    constructor(props: any) {
        super(props);
        this.state = {
            pageTitle : 'HR Managers Dashboard',
            employeeList : [],
            showChart : false,
            punctualCount : 0,
            tardyCount : 0,   
            absenteeCount : 0,
            chartData : {
                labels : ['Punctual','Tardy','Absentee'],
                datasets:[
                    {
                        label:'Attendance',
                        data:[0,0,0],
                    backgroundColor:[
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(25, 109, 72, 0.6)',
                    ] }
                ]
               
            }
           // filteredList : this.state.employeeList
            
            };
            this.handleChange = this.handleChange.bind(this);

}

    componentDidMount(){
    HrmsService.apiCall().subscribe((employee: IEmployee[])=>{
        //console.log(employee);
    this.setState({employeeList: employee, punctualCount: employee.filter(punctual=>punctual.attendance==='Punctual').length, tardyCount:employee.filter(tardy=>tardy.attendance==='Tardy').length,absenteeCount:employee.filter(absentee=>absentee.attendance==='Absentee').length,chartData:{
        labels : ['Punctual','Tardy','Absentee'],
        datasets:[
            {
                label:'Attendance',
                data:[employee.filter(punctual=>punctual.attendance==='Punctual').length,employee.filter(punctual=>punctual.attendance==='Tardy').length,employee.filter(punctual=>punctual.attendance==='Absentee').length],
            backgroundColor:[
                'rgba(0,255,0,1.0)',
                'rgba(255,165,0)',
                'rgba(255,0,0,0.9)',
            ] }
        ]
       
    }})
   // console.log(this.state.employeeList);
   
    }
    )
    
}

logout=()=>{
    // var x = localStorage.getItem('employee')
    alert("Thank u...have a great day :-)")
        localStorage.setItem("loggedin", "false");
        localStorage.removeItem('user');
        localStorage.removeItem('employee')
        history.push('/home')
        window.location.reload()
}

    showOrHideChart=()=>{
    this.setState({showChart:!this.state.showChart})
    }

    handleChange=(event:React.ChangeEvent<HTMLSelectElement>, _id: string)=> {
      console.log(event.target.value, _id);
      HrmsService.updateAttendance({"attendance": event.target.value,"flag":"2"},_id).subscribe(()=>console.log("success"));
       window.location.reload();
        // console.log(this.state.employeeList)
        //   let emp = this.state.employeeList.filter(employee => employee._id === _id)[0];
        //   console.log(emp);
        //   emp.attendance = event.target.value;
        //   console.log(emp);
        //   employeesservices.updateEmployee(emp, _id).subscribe(data => {
        //       console.log(data);
        //   })
        }   


        markingClass=(attendance:string)=>{
            if(attendance==="Punctual"){
                
                return "label success"
            }
            if(attendance==="Tardy"){
                
                return "label warning"
            }
            return  "label danger"
    }


    render(){
        return(
             
            <div className='panel panel-primary'>
                <h4> <i>Welcome to AdminPage:</i> {localStorage.getItem('user')}</h4>
            <div className='panel-heading'>
            <h3>{this.state.pageTitle}</h3>
            </div>

            <div className='panel-body'>
            <div className='row'>
            
            <div className='col-md-6'> </div>
            <div className='col-md-6'>
            <button className='btn n-primary' onClick={this.showOrHideChart}>
            {this.state.showChart ? 'Hide':'Show'} Chart
            </button>
            
            {this.state.showChart ? 
            <div className="chart" >
             <Pie
             options={{responsive:true}} 
             data={this.state.chartData}
             />
           </div> 
           : null}
</div>
<div style={{position: 'absolute', top: 20, right: 100, width: 100}}>
               <button onClick={this.logout}>logout</button>
           </div>
</div>  


<AttendanceCheck punctualCount={this.state.punctualCount} tardyCount={this.state.tardyCount} absenteeCount={this.state.absenteeCount}/>
<div className='table-responsive'>
{this.state.employeeList && this.state.employeeList.length ?
<table className='table'>
<thead>
<tr >
<th>Employee ID</th>
<th>First Name</th>
<th>Last Name</th>
<th>Position</th>
<th>Attendance</th>
</tr>
</thead>
<tbody>
{this.state.employeeList.map(employee=>
<tr key={employee._id}>
<td> {employee.employeeId}</td>
<td>
{employee.firstName}
</td>
<td>{employee.lastName}</td>
<td>{employee.position}</td>
<td>
<span className={this.markingClass(employee.attendance)}></span>
 <select onChange={(e) => {this.handleChange(e, employee._id)}}>
 <option>Select Option</option>
 <option value="Punctual" >Punctual</option>
<option value="Tardy">Tardy</option>
 <option value="Absentee">Absentee</option>
 </select> 

</td>

</tr>
)
}
</tbody>
</table>
: null
}
</div> 
</div>

</div>
        )
    }

}
