import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './pages/Main';
import Lobby from './pages/Lobby';
import MyPage from './pages/MyPage';
import GameRoom from './pages/GameRoom';
import PlayGame from './pages/PlayGame';
import React from 'react';
import Auth from './utils/authCheck';

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path="/" component={Auth(Main, false)} />
                    <Route exact path="/Lobby" component={Auth(Lobby, true)} />
                    <Route exact path="/Info" component={Auth(MyPage, true)} />
                    <Route
                        exact
                        path="/GameRoom/:id"
                        component={Auth(GameRoom, true)}
                    />
                    <Route
                        exact
                        path="/PlayGame/:id"
                        component={Auth(PlayGame, true)}
                    />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
