import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './pages/Main';
import Lobby from './pages/Lobby';
import GameRoom from './pages/GameRoom';
import React from 'react';
import Auth from './utils/authCheck';

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path="/" component={Main} />
                    <Route exact path="/Lobby" component={Auth(Lobby)} />
                    <Route exact path="/GameRoom" component={Auth(GameRoom)} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
