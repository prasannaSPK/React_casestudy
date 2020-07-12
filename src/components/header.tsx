import * as React from 'react';
import './header.css';
import {BrowserRouter as Router,Link} from 'react-router-dom';

const Header:React.FC = ()=>{
    return (
        
<div className="header">
 
  <div className="header-right">
    
    {/* <Link>Home  </Link>  */}
    
    <ul><h6>Home</h6></ul>
    <ul><Link to="/reports">Reports</Link></ul>
    
    
  </div> 


</div>

    
    )
}


export default Header;