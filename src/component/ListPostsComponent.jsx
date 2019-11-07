import React, { Component } from 'react';
import PostDataService from '../services/PostDataService';

class ListPostsComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            message: null
        }
        this.refreshPosts = this.refreshPosts.bind(this);
        this.updatePostClicked = this.updatePostClicked.bind(this);
        this.addPostClicked = this.addPostClicked.bind(this);
    }

    componentDidMount() {
        this.refreshPosts();
    }

    refreshPosts() {
        PostDataService.retrieveAllPosts()//HARDCODED
            .then(
                response => {
                    //console.log(response);
                    this.setState({
                        posts: response.data,
                        message: null
                    });
                }
            )
    }

    updatePostClicked(id) {
        //console.log('update ' + id)
        this.props.history.push(`/post/${id}`);
    }

    addPostClicked() {
        //console.log('add ' + id)
        this.props.history.push(`/post/create`);
    }

    render() {
        return (
            <div className="container">
                <h3>Все посты</h3>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    {
                        this.state.posts.map(
                            post =>
                                <div className="card m-2" key={post.id.toString()} onClick={() => this.updatePostClicked(post.id)}>
                                    <div className="card-header">
                                        {post.headline}
                                    </div>
                                    <div className="card-body">
                                        <div className="row"><p>{post.message}</p></div>
                                        <div className="row">

                                        </div>
                                    </div>
                                    <div className="card-footer text-muted">
                                        {post.tag}
                                    </div>
                                </div>
                        )
                    }
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addPostClicked}>Add</button>
                    </div>
                </div>

            </div>
        )
    }
}

export default ListPostsComponent