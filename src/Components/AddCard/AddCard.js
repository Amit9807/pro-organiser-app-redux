import React, { Component } from 'react'
import Axios from 'axios';
import {Card} from 'react-bootstrap';
import DeleteIcon from '@material-ui/icons/Delete';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import {Button  } from 'react-bootstrap'
import './AddCard.css';

export default class AddCard extends Component {

    constructor(props){
        super(props);
        this.state={
            BoardId:'',
            CardTitle:'',
            Member:'',
            Description:'',
            Date:'',
            CardDate:'',            
            showCardDetails:'',
            CardTitleDetail:'',
            CardhandleClose:'',
            CardDescDetail:'',
            CardTeamDetail:'',
            CardDateDetail:'',
            showModal: false

        }
    }


    handleClose=()=>{
        this.setState({
            showModal: false
        })
    }

    handleShow=()=>{
        console.log("showModal",this.state.showModal)
        this.setState({
            showModal: true
        })
        console.log("showModal1",this.state.showModal)
    }

     CardhandleClose = () => this.setState({
         showCardDetails : false
     });
     CardhandleShow = () =>  this.setState({
        showCardDetails : true
    });


     componentDidMount(){
        this.getCardData(this.props.id);
        this.setState({
            BoardId: this.props.BoardId
        })
        
     }


     DeleteCard=(columnId)=>{
        if(window.confirm("Are you sure you want to Delete Card")){
         Axios.delete(`https://redux-pro-organizers.firebaseio.com/boardContents/${this.state.BoardId}/column/${columnId}.json`)
         .then((res)=>{
             alert("Card Deleted Succesfully");
         })
         .catch((error) => console.log("Error" + error));
        }
     }
     
 
     CardSubmit=(columnId)=>{
         Axios.post(`https://redux-pro-organizers.firebaseio.com/boardContents/${this.state.BoardId}/column/${columnId}/card.json`,{
             title: this.state.CardTitle,
             team: this.state.Member,
             description: this.state.Description,
             date: this.state.Date
         })
         .then((response)=>{
             alert("Card Data Added succesfully");
             console.log("CardSubmit",response);
             this.setState({
                 showModal: false
             })
             this.getCardData(this.props.id);
         })
         .catch((error)=>{
             console.log(error);
         })
     }
 
      getCardData=(columnId)=>{
         Axios.get(`https://redux-pro-organizers.firebaseio.com/boardContents/${this.state.BoardId}/column/${columnId}/card.json`)
         .then((response)=>{
            //  setCardData(response.data);
            this.setState({
                CardData: response.data , ...this.state.CardData
            })
         })
         .catch((err)=>{
             console.log(err);
         })
     }
     
 
      showDetail=(CardId , CardTitle, CardTeam , CardDesc , CardDate)=>{
         this.setState({CardId: CardId});
         this.setState({CardTitleDetail: CardTitle});
         this.setState({CardTeamDetail : CardTeam});
         this.setState({CardDescDetail: CardDesc});
         this.setState({CardDateDetail: CardDate});
         this.setState({showCardDetails: true})
     }


    CardArchieve=(columnId,cardIdArchive)=>{
        if(window.confirm("Are You Sure want to do Archive")){
            Axios.delete(`https://redux-pro-organizers.firebaseio.com/boardContents/${this.state.BoardId}/column/${columnId}/card/${cardIdArchive}.json`)
            .then((response)=>{
                alert("Card Deleted Succesfull");
                this.setState({
                    showCardDetails: false
                })
                this.getCardData(this.props.id);
            })
        }
    }

     Editdetail=()=>{
        this.CardhandleClose();
        this.handleShow();
        // setEditCard(true);
        this.setState({
            EditCard: true
        })
    }


     CardEdit=(columnId ,CardId)=>{
        if(window.confirm("Are you sure to Edit card")){
            Axios.put(`https://redux-pro-organizers.firebaseio.com/boardContents/${this.state.BoardId}/column/${columnId}/card/${CardId}.json`,{
                title :  this.state.CardTitleDetail,
                team : this.state.CardTeamDetail,
                description :  this.state.CardDescDetail,
                date: this.state.CardDateDetail
            })
            .then((response)=>{
                alert("Card Edited Succesfully");
                this.handleClose();
                this.AxiosgetCardData(this.props.id);
                // setEditCard(false);
                this.setState({
                    EditCard: false
                })
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    }


    render() {
        return (
            <div>
             {this.getCardData(this.props.id)}
                    <div className="mt-4 d-flex flex-row" >
                        <Card className="Card mt-4 mx-3" style={{ width: '18rem' }} >
                        <Card.Body >
                            <Card.Title key={this.props.id} className="d-flex justify-content-between">
                                {this.props.name}
                                <a onClick={()=>{this.DeleteCard(this.props.id)}} ><DeleteIcon style={{color : "red"}}></DeleteIcon></a>   
                            </Card.Title>
                            <Card.Text>
                            {
                        
                            this.state.CardData ? 
                            Object.entries(this.state.CardData).map((res)=>(
                                <Card className="mt-4 " >
                                <Card.Body key={res[0]}>
                                <Card.Title > {res[1].title}</Card.Title>
                                <Card.Text className="d-flex justify-content-between">
                                <FormatListBulletedIcon onClick={(e)=> this.showDetail(
                                    res[0],
                                    res[1].title,
                                    res[1].team,
                                    res[1].description,
                                    res[1].date
                                )}  
                               /> 
                                
                                <span className="cardMembers">{res[1].team.charAt(0)}</span>
                                
                                </Card.Text>
                                </Card.Body>
                                </Card>
                                ))
                                :
                                <div>
                                    <p>No Task is Added</p>
                                </div>
                            }
                            </Card.Text>
                            <Card.Link > <Button  variant="light" size="lg" block onClick={this.handleShow } >Add a Card</Button></Card.Link>
                        </Card.Body>
                        </Card>  
                        </div>
                        <div>

                        <form className="AddCard">
                        <div className="modal bd-example-modal-lg" tabIndex="-1" role="dialog" style={{
                        display: this.state.showModal ? 'block' : 'none'
                        }}>
                        <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content ">
                        <div className="modal-header">
                            <h5 className="modal-title" style={{color: "blue"}}>{this.state.EditCard ? "Edit Card" : "Add Card"}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.handleClose}>
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <label>Enter a title for your task</label>
                            <input type="text" id="title" className="form-control" style={{width: 750}}   value={this.state.EditCard ? this.state.CardTitleDetail : this.state.CardTitle} onChange={this.state.EditCard ? (e)=>{this.setState({CardTitleDetail: e.target.value})} : (e)=>{this.setState({CardTitle : e.target.value})} } placeholder={this.state.EditCard ? this.state.CardTitleDetail : "eg Add a new Card"} ></input>
                        </div>
                        <div className="modal-body">
                            <label>Choose members for this task (select multiple if needed)</label>
                            <select  id="membersList" name="membersList" className="form-control" style={{width: 750}}  value={this.state.EditCard ? this.state.CardTeamDetail : this.state.Member} ><br />
                            {<option value={this.state.EditCard ? this.state.CardTeamDetail : this.state.CardTeamDetail} key={this.state.CardTeamDetail} onChange={this.onSelectChange} >{this.state.CardTeamDetail}</option>}
                            </select>
                            </div>  
                            <div className="modal-body">
                            <label>Add the description for your task</label>
                            <input type="text" id="description" className="form-control" style={{width: 750}}  onChange={this.state.EditCard ? (e)=>{this.setState({CardDescDetail: e.target.value})} : (e)=>{this.setState({Description : e.target.value})}} value={this.state.EditCard ? this.state.CardDescDetail : this.state.Description} placeholder="Add your description here" />
                        </div>   
                        <div className="modal-body">
                            <label>select the due-date for this task </label>
                            <input type="date" id="due_date" className="form-control" style={{width: 750}}  onChange={this.state.EditCard ? (e)=>{this.setState({CardDateDetail: e.target.value})} : (e)=>{this.setState({Date: e.target.value})} } value={this.state.EditCard ? this.state.CardDateDetail : this.state.Date}/>
                        </div>
                        <div className="modal-footer">
                        {
                            this.state.EditCard ? 
                           <button type="button" id="CreateCard" className="btn3 btn-primary" onClick={()=>{this.CardEdit(this.props.id , this.state.CardId)}}>Edit Cart</button>
                            :
                            <button type="button" id="CreateCard" className="btn3 btn-primary" onClick={()=>{this.CardSubmit(this.props.id)}}>Add Cart</button>
                        }
                        </div>
                        </div>
                        </div>
                        </div>
                        </form>
                        </div>
                        <div>
                        <form className="CardShowDetails">
                        <div className="modal bd-example-modal-lg" tabIndex="-1" role="dialog" style={{
                        display: this.state.showCardDetails ? 'block' : 'none'
                        }}>
                        <div className="modal-dialog modal-lg" role="document">

                        <div className="modal-content ">
                        <div className="modal-header">
                            <h5 className="modal-title" >{this.state.CardTitleDetail}</h5>
                            <button type="button " className="close" data-dismiss="modal" aria-label="Close" onClick={this.CardhandleClose}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <div className="modal-footer">
                            <button type="button" id="CreateColumn" className="btn3 btn-primary" onClick={this.Editdetail}>Edit</button>
                            <button type="button" id="CreateColumn" className="btn3 btn-danger" onClick={()=>{this.CardArchieve(this.props.id, this.state.CardId)}}>Archive</button>
                            </div>
                        </div>
                        <div className="modal-body">
                                <h4>Description</h4><br/>
                                <span>{this.state.CardDescDetail}</span>
                        </div>
                        <div className="modal-body">
                            <h4>Members</h4><br />
                                <span>{this.state.CardTeamDetail}</span>
                        </div>
                        <div className="modal-body">
                                <h4>Date</h4><br />
                                <span>{this.state.CardDateDetail}</span>
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








