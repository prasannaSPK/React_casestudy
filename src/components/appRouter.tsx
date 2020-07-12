import * as React from 'react';
import {BrowserRouter as Router,Route}  from "react-router-dom";
import App from '../App';
import Reports from './reports';
import {AdminHome} from './adminHome';
import {LoginSignup} from './LoginSignup';
import {HrManagerDashboard} from './hrManagerDashboard'
import {EmployeeProfile} from './employeeProfile'
import { EditProfile } from './editProfile';

const AppRouter: React.FC = () => {
    return (
    
    <Router>
    <App>
    

    <Route
          path="/admin"
          render={() =>
            localStorage.getItem("loggedin") === "true" ? (
              <AdminHome/>
            ) : (
              <LoginSignup />
            )
          }
        />
    <Route
          path="/HRmanager"
          render={() =>
            localStorage.getItem("loggedin") === "true" ? (
              <HrManagerDashboard/>
            ) : (
              <LoginSignup />
            )
          }
        />

    <Route
          path="/employee"
          render={() =>
            localStorage.getItem("loggedin") === "true" ? (
              <EmployeeProfile/>
            ) : (
              <LoginSignup />
            )
          }
        />
    <Route path="/" exact component={LoginSignup}/>
    <Route path="/home" exact component={LoginSignup}/>
    <Route path="/reports" component={Reports}/>
    <Route path="/editProfile" component={EditProfile}/>
    <Route path="/employeeProfile" component={EmployeeProfile}/>
    {/* <Route path="/HRmanager" component={HrManagerDashboard}/> */}
    </App>
    </Router>
    
    
    
    
    )
    }
    export default AppRouter;