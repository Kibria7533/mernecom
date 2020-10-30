import React, { Component } from 'react';
import { BrowserRouter, Switch, NavLink, Route, Link } from 'react-router-dom'
import Adminbody from './Adminbody';
import Adminsidebar from './Adminsidebar';
import Manageusers from './Manageusers';
import Menumanage from './Menumanage';
import Uploadproduct from './Uploadproduct';
class Admin extends Component {
    constructor() {
        super();
        this.state = {
            handleSidebar: false,
        }
    }

    render() {
        return (
            <BrowserRouter>
                <div className="container-fluid" >
                    <div className="sidebar desktopnav">
                        <a className="active" href="/">Home</a>
                        <a href="/admindashboard/menus">Manage Menus</a>
                        <a href="/admindashboard/users">Manage Users</a>
                        <a href="/admindashboard/uploadproduct">Manage Products</a>
                      
                        <a href="#about">About</a>
                    </div>
                    <div className="sidebar mobilenav" style={{ paddingLeft: "100px" }}>

                        <a href="#news">News</a>
                        <a href="#contact">Contact</a>
                        <a href="#about">About</a>
                        <a href="/admindashboard/menus" >Manage Menus</a>
                    </div>
                    <div className="row">
                        <div className="mobilenav">
                            <Adminsidebar thishandleSidebar={this.state.handleSidebar} />
                        </div>
                    </div>
                    <div className="content">
                        
                        <Switch>
                        <Route exact path="/admindashboard" component={Adminbody} />
                            <Route exact path="/admindashboard/menus" component={Menumanage} />
                            <Route exact path="/admindashboard/users" component={Manageusers}/>
                            <Route exact path="/admindashboard/uploadproduct" component={Uploadproduct}/>
                        </Switch>
                        
                    </div>
                    
                </div>
            </BrowserRouter>
        );
    }
}

export default Admin;