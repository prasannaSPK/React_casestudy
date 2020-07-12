import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'



export class App extends React.Component<{},{}> {

public render(){
return (
// {this.props.children}  it means we are accessing all the children of Header
<div className="container-fluid">
  {/* <Header/> */}
 {this.props.children}  

</div>


);
}
}

export default App;