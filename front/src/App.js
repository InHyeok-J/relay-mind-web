import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { testDataAction } from "./module/test";
import Main from './pages/Main';
import Lobby from './pages/Lobby';
import GameRoom from "./pages/GameRoom";
import React from "react";

function App() {
  const dispatch = useDispatch();
  // const { test , error } = useSelector((state) => state.test);
/*
  async function testClick() {
    try{
      await dispatch(
          testDataAction()
      )
    }catch (er){
      console.error(er)
      alert("zz")
    }
  }*/

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/Lobby" component={Lobby} />
          <Route exact path="/GameRoom" component={GameRoom} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
