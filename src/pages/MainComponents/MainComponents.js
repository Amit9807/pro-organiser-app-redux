import React, { Component } from 'react'
import Axios from 'axios';
import Boardpage from '../Boards/Boardpage'
import { Link } from "react-router-dom";
import Headers from '../../Components/Headers/Headers'
import './MainComponents.css';


export default class MainComponents extends Component {

    constructor(props)
    {
        super(props)
        this.state={
            data:'',
            name:'',
            boardContent:'',
            board: false
        }
    }

    componentDidMount()
    {
        Axios.get('https://redux-pro-organizers.firebaseio.com/Boards.json')
        .then(res=>{
            const Boards=res.data;
            this.setState({
                boardContent: Boards
            })
        })

    }


    render() {
        return (
            <div>
                <Headers />

                {
                (this.state.boardContent !== null) ? 
                (
                   Object.entries(this.state.boardContent).map((res)=>(
                  <Link
                    to={{
                      pathname: "/board/" + res[1].name,
                      state: {
                        type: res[1].type,
                        members: res[1].team,
                        boardId: res[0],
                      },
                    }}
                  >
                    <div className="mt-4 " style={{display : "inline-block"}} key={res[1].name}>
                     <button className="MainComp mx-4 mt-4 ">{res[1].name}</button>
                    </div>
                  </Link>
                   ))
                )
                :
                (
                    <p className="mx-sm-4 mt-4" >You haven't created any boards. Kindly click on the 'Create Board' button in the navigation bar to create a board.</p>
                      
                )
            }

            </div>
        )
    }
}

