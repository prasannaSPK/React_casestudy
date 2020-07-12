import * as React from 'react';
import {IEmployee} from '../model/employee';
import HrmsService from '../services/hrmsService';
import './Login.css';
import { createBrowserHistory } from 'history';
import Header from './header';
import {BrowserRouter as Link} from 'react-router-dom';


const history = createBrowserHistory();

interface IEmployeestate{
    
    EmployeeList:IEmployee[];
    password:string,
    id:string
    formdata:{username:string,password:string,employeeId:string,firstName:string,lastName:string,position:string,activeStatus:string,attendance:string}
    
}

export class EmployeeProfile extends React.Component<{},IEmployeestate>{
    constructor(props: any){
        super(props);
        this.state = {
            EmployeeList : [],
            password:'',
            id:'',
            formdata:{username:'',password:'',employeeId:'',firstName:'',lastName:'',position:'',activeStatus:'',attendance:''},
        }
    }

    componentDidMount(){
        // let formdata = {...this.state.formdata}
        HrmsService.apiCall().subscribe((emp: IEmployee[])=>{
        let employee: IEmployee[] = emp.filter(p=>p.username.indexOf(String(localStorage.getItem('user')))!==-1)
        this.setState({id:employee[0]._id,formdata:{username:employee[0].username,password:employee[0].password,employeeId:employee[0].employeeId,firstName:employee[0].firstName,lastName:employee[0].lastName,position:employee[0].position,activeStatus:employee[0].activeStatus,attendance:employee[0].attendance}})
        }
        
        )
           
    }

  

logout=()=>{
    // var x = localStorage.getItem('employee')
    alert("Thank u...h've a great day :-)")
        localStorage.setItem("loggedin", "false");
        localStorage.removeItem('user');
        localStorage.removeItem('employee')
        history.push('/home')
        window.location.reload()
}


  render(){
   

    return(
        
    <div><Header></Header>
        
        
        <h1>Welcome to Employee Page</h1>
    <div style={{position: 'absolute', top: 20, right: 100, width: 100}}>
               <button onClick={this.logout}>logout</button>
           </div>
              
              <br/> <br/>
            <b> Username : {this.state.formdata.username}  <br/> <br/>
              First Name : {this.state.formdata.firstName}  <br/> <br/>
              Last Name : {this.state.formdata.lastName}    <br/> <br/>
              Employee ID : {this.state.formdata.employeeId}  <br/> <br/>
              Position : {this.state.formdata.position}   </b> <br/> <br/>
             
              <button > <Link to="/editProfile">Edit Profile</Link>
              </button>  

           
    </div>
    );
            
    }

  
}