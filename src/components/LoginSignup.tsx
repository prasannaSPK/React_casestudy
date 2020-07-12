import * as React from 'react';
import {IEmployee} from '../model/employee';
import HrmsService from '../services/hrmsService';
import './Login.css';
// import {Link,withRouter, RouteComponentProps, Route, Redirect,Switch} from 'react-router-dom';
// import {AdminHome} from './adminHome';

import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

interface IEmployeestate{
    
    EmployeeList:IEmployee[];
    username:string;
    password: string;
    // fields:any;
    // check:boolean;
    formdata:{username:string,password:string,employeeId:string,firstName:string,lastName:string,position:string,activeStatus:string,attendance:string}
    
}

export class LoginSignup extends React.Component<{},IEmployeestate>{
    constructor(props: any){
        super(props);
        this.state = {
            EmployeeList : [],
            username:"",
            password:"",
            formdata:{username:'',password:'',employeeId:'',firstName:'',lastName:'',position:'',activeStatus:'',attendance:''}
            
        }
        this.handleInputChange=this.handleInputChange.bind(this);
        this.handleSignup=this.handleSignup.bind(this);
        this.ValidatePwdMatching = this.ValidatePwdMatching.bind(this)
    }

        componentDidMount(){
            HrmsService.apiCall().subscribe((employees: IEmployee[])=>
            this.setState({EmployeeList:employees})
            )
        }

        // onClick={(event) => this.handleClick(event)}


      
        handleSubmit=(event:any)=> {
            
            event.preventDefault();
            // console.log(this.state.username);
              let employee = this.state.EmployeeList.filter(emp => emp.username === this.state.username && emp.password === this.state.password);
              console.log(employee);
              if(employee.length > 0){
                // history.push('/welcome',state:{'abc':'welcome'})
                // history.push( '/welcome',{ 'page_id': 1, 'user_id': 5 });
                // window.location.reload();
                // return <Redirect to={{ pathname: "/welcome" }} />;
            //    return  <Redirect to="/welcome" />
                // 
                // <Route path='/register' component={AdminHome} />
                localStorage.setItem('loggedin',"true");
                localStorage.setItem('user',this.state.username)
                // localStorage.setItem('employee',this.state.formdata.firstName)
                if(employee[0].position==="admin"){
                    history.push('/admin');
                    window.location.reload()
                }
                else if(employee[0].position==="MANAGER"){
                    history.push('/HRmanager');
                    window.location.reload()
                }
                else if(employee[0].position==="EMPLOYEE"){
                    history.push('/employee');
                    window.location.reload()
                }
                else{
                    alert("something wrong!!..try again")
                    this.setState({username:"",password:""})
                }
                
                  
                
              }
              else{
                alert("enter correct credentials")
               this.setState({username:"",password:""})
              }
            
            
          }

          handleSignup=(event:any)=>{
                event.preventDefault();
                HrmsService.postEmployee(this.state.formdata).subscribe(()=>console.log("sign up successfull"));
                alert("successfully registered!!");
                window.location.reload();
                // let formdata = {...this.state.formdata} 
                // formdata.username=""
                // formdata.password=""
                // formdata.employeeId=""
                // formdata.firstName=""
                // formdata.lastName=""
                // formdata.position=""
                // this.setState({formdata})
                
          }

        ValidatePwdMatching=(event:any)=>{
            let x = event.target
            
            let cnfpwd;
            

            if(x.name==='cnfpwd'){
                cnfpwd=x.value;
                if(this.state.formdata.password!==cnfpwd)
                    alert("password didn't match")
            }
                
            
                
        }
    
        handleInputChange=(event:any)=>{         
           
            let formdata = {...this.state.formdata} 

            const x=event.target;
            
            if(x.name==="username")
                this.setState({username:x.value})
               
            if(x.name==="password")
                this.setState({password:x.value})


            if(x.name==='u_name'){
                
                formdata.username = x.value;
                this.setState({formdata})
            }

            if(x.name==='pwd'){
                
                formdata.password = x.value;
                this.setState({formdata})
            }
            if(x.name==='empId'){
                
                formdata.employeeId = x.value;
                this.setState({formdata})
            }

            if(x.name==='f_name'){
                
                formdata.firstName = x.value;
                this.setState({formdata})
            }
            
            
            if(x.name==='l_name'){
                
                formdata.lastName = x.value;
                this.setState({formdata})
            }
            
            else{// here we set state for signup part
                console.log(x.value);
                
                formdata.position = x.value;
                this.setState({formdata})
            }
        }


render(){

    return(
        
    <div>
                  
            <form  onSubmit={this.handleSubmit} >
            
            <h1> Welcome to HRMS </h1> <br/>
            <fieldset>
            <h4>Login to your account</h4>
                    Enter your username: <br/>
                    <input
                    type='text'
                    name='username'
                    onChange={this.handleInputChange}
                    value={this.state.username}/> <br/> <br/>
                        Enter your password: <br/>
                        <input
                            type='password'
                            name='password'
                            onChange={this.handleInputChange} value={this.state.password}
                        />
                                <br/> <br/>
                        <button type="submit" value="Login" >Login</button>
                        </fieldset>
            </form>
            <hr/>
            
            <form onSubmit={this.handleSignup}>
            <h5>Don't have an account? Sign Up</h5>
           <fieldset>
          Enter Username: <br/>
                <input type="text" name="u_name" onBlur={this.handleInputChange} defaultValue={this.state.formdata.username} required/>
            <br/> <br/>
             Enter Password:    <br/>
       <input  id="pwd"
                            type='password'
                            name='pwd'
                            onBlur={this.handleInputChange} defaultValue={this.state.formdata.password}  required/> 
                        <br/> <br/> 
              
              Confirm Password   <br/><input 
                            type='password'
                            name='cnfpwd'
                          onBlur={this.ValidatePwdMatching} defaultValue={this.state.password}  required
                        />
                <br/><br/> 
                Enter your Employee ID: <br/>
                <input  type="text" name="empId" onBlur={this.handleInputChange} defaultValue={this.state.formdata.employeeId} required/>
                <br/><br/> 
                Enter your First name:  <br/>
                <input  type="text" name="f_name" onBlur={this.handleInputChange} defaultValue={this.state.formdata.firstName}  required/>
                <br/><br/> 
               Enter your Last name:  <br/>
                <input type="text"  name="l_name" onBlur={this.handleInputChange} defaultValue={this.state.formdata.lastName} required/>
                <br/><br/> 
                <select  onChange={this.handleInputChange}> 
                <option>Select your position</option>  
                <option value="EMPLOYEE">EMPLOYEE</option>
                <option value="admin">ADMIN</option>
                <option value="MANAGER">MANAGER</option>
                </select>
                <br/><br/>
                 <button type="submit" value="Submit" >Sign Up</button>
                 </fieldset>
            </form>
 
        
    </div>
    

    );
            
    }

}