import React, { Component } from 'react'
import {Button} from 'react-bootstrap'
import AddColumn from '../../Components/AddColumn/AddColumn'
import Axios from 'axios';
import './Boards.css'

export default class Boards extends Component {

    constructor(props){
        super(props)
        this.state={
            AddColumn:'',
            BoardId:'',
            show: false
        }
    }

     handleClose = () => this.setState({show: false});
     handleShow = () => this.setState({show: true});
    
     componentDidMount(){
         this.setState({
             BoardId:this.props.location.state.boardId
         })
         
     }
     

     DeleteBoard=()=>{
        if(window.confirm("Are you sure yo want to delete Board")){
        Axios.delete(`https://redux-pro-organizers.firebaseio.com/Boards/${this.state.BoardId}.json`)
        .then((response)=>{
            alert("Boards Delete Succesfully");
            
        })
        .catch((error)=>{
            console.log(error);
        })
      }
    }
        
     ColumnSubmit=(props)=>{
        console.log("ColumnSubmit",props);
        Axios.post(`https://redux-pro-organizers.firebaseio.com/boardContents/${this.state.BoardId}/column.json`,{
            name: this.state.AddColumn
        })
        .then((response)=>{
            console.log(response);
            alert("Column addedd succesfully");
            this.setState({
                show: false
            })
        })
        .catch((error)=>{
            console.log("Columnsubmit error",error);
        })
    }


    render() {
        return (
            <div>
                <div className="title d-flex justify-content-between mt-4">
                    <h2 className="borad-title">{this.props.match.params.boardName}</h2>
                    <Button variant="danger" onClick={this.DeleteBoard}>Delete Board</Button>
                    </div>
                    <div className="Column-Data ">
                    <AddColumn BoardId={this.props.location.state.boardId} members={this.props.location.state.members}/>
                    <div></div>
                    <button className="btn1 mt-4 mx-4 border-0" onClick={this.handleShow}>Add Column</button> 
                    </div>


        <div>
        <form >
                <div className="modal bd-example-modal-lg" tabIndex="-1" role="dialog" style={{
                   display: this.state.show ? 'block' : 'none'
                     }}>
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content ">
                        <div className="modal-header">
                            <h5 className="modal-title" style={{color: "blue"}}>Add Column</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.handleClose}>
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <label>Enter a column name:</label>
                            <input type="text" id="column_name" className="form-control" style={{width: 750}}  onChange={(e)=>{this.setState({AddColumn: e.target.value})}} value={this.state.AddColumn}/>
                        </div>
                        <div className="modal-footer">
                            <button type="button" id="CreateColumn" className="btn3 btn-primary" onClick={this.ColumnSubmit}>Add Column</button>
                        </div>
                        </div>
                    </div>
                </div>
                </form>
           
           </div>
           
            </div>
        )
    }
}




