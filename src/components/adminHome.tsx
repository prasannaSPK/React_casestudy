import * as React from 'react';
import {IEmployee} from '../model/employee';
import HrmsService from '../services/hrmsService';
import './Login.css';
// import AdminUpdates from './adminUpdates';
import './components.css';
import { Line } from 'react-chartjs-2';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

interface IEmployeeState{
    employeeList:IEmployee[];
    u:number;//users
    a:number;//active
    in:number;//inactive
    chartData: object;
    
}
export class AdminHome extends React.Component<{},IEmployeeState>{

    constructor(props:any){
        super(props);
        this.state={employeeList:[],u:0,a:0,in:0, chartData : {
            labels : ['Users','Active','InActive'],
            datasets:[
                {
                    label:'Account Status',
                    data:[0,0,0],
                backgroundColor:[
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(25, 109, 72, 0.6)',
                ] }
            ]
           
        }}
        this.handleChange = this.handleChange.bind(this);
        
    }

    // componentWillMount(){
    //     HrmsService.apiCall().subscribe((employees:IEmployee[])=>
    //     this.setState({employeeList:employees}))
    // }

    componentDidMount(){
        console.log("welcome");
        const user = localStorage.getItem('user')
        console.log(user)
        HrmsService.apiCall().subscribe((employees:IEmployee[])=>
        this.setState({employeeList:employees,u:employees.length,a:employees.filter(p=>p.activeStatus==='1').length,in:employees.filter(p=>p.activeStatus==='0'|| p.activeStatus==='' ).length,chartData: {
            labels : ['Users','Active','InActive'],
            datasets:[
                {
                    label:'Account Status',
                    data:[employees.length,employees.filter(p=>p.activeStatus==='1').length,employees.filter(p=>p.activeStatus==='0' || p.activeStatus==='' ).length],
                backgroundColor:[
                    'rgba(179, 230, 0)',
                    'rgba(0, 255, 255)',
                    'rgba(255,99,71)',
                ],
                
             }
            ]
           
        }}))
          
    }

    // updateFields=(event:any)=>{

        
    //     // this.setState({u:arr.length})
    //     // console.log(event.target.value + "" + id);
    // }

    handleChange=(event:React.ChangeEvent<HTMLSelectElement>, employeeId: string)=>{
        console.log(event.target.value);
        // if(event.target.value==="1")
        HrmsService.updateStatus({"status": event.target.value,"flag":"1"},employeeId).subscribe(()=>console.log("cool"));
        window.location.reload();
        
        // else

        //     console.log("Deactivate")
        // this.setState({id: event.target.value.split("/")[0]})     ;
       
            // console.log(employeeId);
    }

    logout=()=>{
       // var x = localStorage.getItem('employee')
        alert("thank u:Have a great day :-)")
            localStorage.setItem("loggedin", "false");
            localStorage.removeItem('user');
            localStorage.removeItem('employee')
            history.push('/home')
            window.location.reload()
    }
    defaultDisabled=(position:string)=>{
        if(position==="admin")
            return true
        return false
    }

    markingClass=(status:string)=>{
            if(status==="1"){
                
                return "label success"
            }
                
            
            return  "label danger"
    }


    render(){
        // console.log(this.state.employeeList +""+ this.state.employeeList.length);
        // {this.updateFields(this.state.employeeList)}
        
        return (
            
            
            <div> 
                <h4 > <i>Welcome to AdminPage:</i> {localStorage.getItem('user')}</h4>
                <br/>
            <div style={{position: 'absolute', top: 20, right: 100, width: 100}}>
               <button onClick={this.logout} >logout</button>
           </div>
            <div className="chart" >
             <Line
             options={{responsive:false}} 
             data={this.state.chartData}
             />
           </div> 
           <br/>
            <div className='row'> 
            <div className='col-md-2'>
             <b>Users :</b>   <input name="users" value={this.state.u} size={4} /> </div>
               <div className='col-md-2'>
               <b> Active : </b> <input  name="active" value={this.state.a} size={4}/> </div>
               <div className='col-md-2'>
              <b>InActive :</b> <input  name="inactive" value={this.state.in} size={4} />
             </div>
           </div>
           <br/> <br/>
           {/* <div>Active </div> */}

     <div className='table-responsive'>
        {this.state.employeeList && this.state.employeeList.length ?
        <table className='table'>

        <thead>
        <tr >
        {/* <th>
        <button className='btn btn-primary' onClick={this.showOrHideImage}>
        {this.state.show ? 'Hide':'Show'} Image
        </button>
        </th> */}
        <th>EmployeeId</th>
        <th>UserName</th>
        <th>Password</th>
        <th>Position</th>
        <th>Status</th>
        </tr>
        </thead>
        <tbody>
        {this.state.employeeList.map(employee=>
        <tr key={employee._id}>
        
        <td>{employee.employeeId}</td>
        <td>
        
        {employee.username }
        </td>
        <td>{ employee.password }</td>
        <td>{ employee.position }</td>
        <td >
        {/* <select disabled = 'forUsers()' onChange={(e)=> {this.handleChange(e,employee._id)}}>
                    <option >Select Here</option>
                    <option  value="0">Deactivate</option>
                 <option  value="1">Activate</option>
            
        </select> */}
        <style></style>
        <span className={this.markingClass(employee.activeStatus)}></span>
        <select disabled={this.defaultDisabled(employee.position)} onChange={(e)=> {this.handleChange(e,employee._id)}}>
                    <option >Select Here</option>
                    <option  value="0">Deactivate</option>
                 <option  value="1">Activate</option>
            
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
        )
    }
}