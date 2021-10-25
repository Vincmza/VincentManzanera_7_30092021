//libraries
import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

//components
import Header from "../header/header"
import Home from "../../pages/home"
import Post from "../../pages/new-post"
import Profile from '../../pages/profile';
import NewPost from '../../pages/new-post';

const index = () => {
    return (
        <div>
            <Router>
                <Header></Header>
                <Switch>
                    <Route path="/" exact component={Home}></Route>
                    <Route path="/post" exact component={Post}></Route>
                    <Route path="/profile" exact component={Profile}></Route>
                    <Route exact path="/new-post" component={NewPost} />
                    <Redirect to="/profile"></Redirect>
                </Switch>
            </Router>
        </div>
    );
};

export default index;