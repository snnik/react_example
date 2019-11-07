import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ListPostsComponent from './ListPostsComponent';
import PostComponent from './PostComponent';
import CreatePostComponent from './CreatePostComponent';

class DemoApp extends Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <h1>Пример блога</h1>
                    <Switch>
                        <Route path="/" exact component={ListPostsComponent} />
                        <Route path="/post/create" component={CreatePostComponent} />
                        <Route path="/post/:id" component={PostComponent} />
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default DemoApp