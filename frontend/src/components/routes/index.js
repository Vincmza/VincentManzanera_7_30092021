//libraries
import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

//components
import Home from "../../pages/home"
import Post from "../../pages/post"
import Profile from '../../pages/profile';

const index = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/" exact component={Home}></Route>
                    <Route path="/post" exact component={Post}></Route>
                    <Route path="/profile" exact component={Profile}></Route>
                    <Redirect to="/"></Redirect>
                </Switch>
            </Router>
        </div>
    );
};

export default index;