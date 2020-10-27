import React,{Component} from 'react'
import { Link} from 'react-router-dom'
import {Navbar} from 'react-bootstrap';
import "./Headers.css"

export default class Header extends Component{
    render(){
        return(
            <div>
           <Navbar className="Navbar">
             <a  href="#"  className="mx-sm-5" style={{color: "white"}}>Pro-Organizer</a>
             <Navbar.Toggle />
             <Navbar.Collapse className="justify-content-end">
             <Navbar.Text className="Nav-link" >
             <a href="#login"  className="mx-sm-3"><Link to="/"  style={{color: "white"}}>Home</Link></a>
             <a href="#login" className="mx-sm-3"><Link to="/CreateBoard" style={{color: "white"}}>Create a Board</Link></a>
             </Navbar.Text>
            </Navbar.Collapse>
            </Navbar>
            </div>
        )
    }

}



