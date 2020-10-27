import React, { Component } from 'react'
import {Form} from 'react-bootstrap';
import './CreateBoard.css'
import axios from 'axios';


export default class CreateBoards extends Component {

    constructor(props){
         super(props);
        this.state={
            name:"",
            team:'',
            board:''
        }
    }

   create=(e)=>{
    e.preventDefault();
    
                axios.post('https://redux-pro-organizers.firebaseio.com/Boards.json', {
                        name: this.state.name,
                        team: this.state.team,
                        board: this.state.board
                     })
                    .then(response=>{
                        console.log(response);
                    })
   }

    render() {
        return (
            <div>
                 <h2 className="board-title mt-4 ">Create a Boards</h2>
                  <Form className="form2 mx-sm-5 mt-sm-4" onSubmit={this.create}>
                        <div className="form-group">
                            <label className="label2 d-flex justify-content-start" >Enter a name of your board</label>
                            <input type="text" id="name" class="form-control col-sm-8" value={this.state.name}  onChange={(e)=>{this.setState({name: e.target.value})}} placeholder="e.g Agile sprint Board" />
                        </div>
                        <div className="form-group ">
                            <label className="d-flex justify-content-start">Add your team member</label>
                            <input type="text" id="team" class="form-control col-sm-8" value={this.state.team}  onChange={(e)=>{this.setState({team: e.target.value})}}  placeholder="Add Your Team(seprate commas)"   />
                        </div>
                        
                        <div className="form-group">
                            <label className="d-flex justify-content-start">Enter the type of your board</label>
                            <input type="text" id="type" class="form-control col-sm-8" value={this.state.board}  onChange={(e)=>{this.setState({board: e.target.value})}} placeholder="e.g design Board" />
                        </div>
                      
                        <button type="submit" class="btn btn-primary mx-sm-3 d-flex justify-content-start" id="CreateBoard">Create</button>
                </Form>

            </div>
        )
    }
}




