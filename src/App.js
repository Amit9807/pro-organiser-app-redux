import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
  
} from 'react-router-dom'
import './App.css';
import MainComponents from './pages/MainComponents/MainComponents'
import CreateBoards from './pages/CreateBoard/CreateBoards'
import Boards from  './pages/Boards/Boardpage'
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
       <Switch>
         <Route path="/" exact  component = {MainComponents} />
         <Route path="/createboard" component = {CreateBoards} /> 
         <Route path="/board/:boardName" component = {Boards} />
          <Route path="*" render = {() => <h3>Page not Found!</h3>} />
        </Switch>
       </Router>  
    </div>
  );
}

export default App;

