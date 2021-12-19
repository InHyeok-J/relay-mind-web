import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './pages/Main';
import Lobby from './pages/Lobby';
import GameRoom from './pages/GameRoom';
import PlayGame from './pages/PlayGame';
import React from 'react';
import Auth from './utils/authCheck';
import MyPage from './pages/MyPage';

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path="/" component={Auth(Main, false)} />
                    <Route exact path="/Lobby" component={Auth(Lobby, true)} />
                    <Route
                        exact
                        path="/GameRoom/:id"
                        component={Auth(GameRoom, true)}
                    />
                    <Route exact path="/info" component={Auth(MyPage, true)} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
