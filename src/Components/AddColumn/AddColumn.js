import React, { Component } from 'react'
import AddCard from '../AddCard/AddCard'
import Axios from 'axios'

export default class AddColumn extends Component {
    
    constructor(props){
        super(props);
        this.state={
            ColumnData: '',
            BoardId: this.props.BoardId
        }
    }

    GetColumnData =()=>{
        Axios.get(`https://redux-pro-organizers.firebaseio.com/boardContents/${this.state.BoardId}/column.json`)
        .then((response)=>{
            console.log("Response",response.data);
            this.setState({
                ColumnData: response.data  
            })
        })
        .catch((error)=>{
            console.log(error);
        })
    }


    componentDidMount(){
      this.GetColumnData()
    }


    render() {
        return (
            <div>
                
                   
                
                {
                 
                (this.state.ColumnData !== null) ?                
                (
                    this.GetColumnData(),
                    Object.entries(this.state.ColumnData).map((res)=>(
    
                        <AddCard class="d-flex flex-row" id={res[0]} name={res[1].name} BoardId={this.props.BoardId} members={this.props.members}  />
                     
                      ))
                 
                )
                :
                console.log("data not found")
              
            }
            </div>
        )
    }
}



