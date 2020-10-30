import React, { Component } from 'react'
import OffCanvas from 'react-aria-offcanvas'
import { Link } from 'react-router-dom'
 
const Navigation = () => (
  <nav id="menu">
    <ul>
      <li>
        <Link to="/logout">Your Profile</Link>
      </li>
      
      <li>
      <Link to="/logout" >Become A Member?</Link>
      </li>
      <li>
      <a href="/logout">Log Out</a>
      </li>
    </ul>
  </nav>
)
 
export default class Rightsidenavigation extends Component {
  constructor(props){
    super()
   this.state = {
      isOpen:props.open,
    }
  }
componentWillReceiveProps(props){
  if(props.open)
 this.setState({isOpen:true});
 else
 this.setState({isOpen:false});

}
 
  open = () => {
    
    this.setState({ isOpen: true })
  }
 
  close = (props) => {
    this.setState({ isOpen: false })
    this.props.setOpen()
  }
 
  render() {
    return (
      <div>
        
        <OffCanvas
          isOpen={this.state.isOpen}
          onClose={this.close}
          labelledby="menu-button"
          position="right"
         
        >
          <button  style={{"marginTop": "63px",
   "marginRight": "-89px"}} onClick={this.close}>Close</button>
          <Navigation/>
        </OffCanvas>
      </div>
    )
  }
}