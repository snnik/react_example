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

    deletePostClicked(id){
        PostDataService.deletePost(id)
            .then(
                response => {
                    this.setState({message: `Delete ${id}`})
                    this.refreshPosts()
                }
            )
    }

    updatePostClicked(id){
        //console.log('update ' + id)
        this.props.history.push(`/post/${id}`);
    }

    addPostClicked(){
        //console.log('add ' + id)
        this.props.history.push(`/post/-1`);
    }

    render() {
        return (
            <div className="container">
                <h3>All Posts</h3>
                {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Description</th>
                                <th>Tag</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.posts.map(
                                    post =>
                                    <tr key={post.id.toString()}>
                                        <td>{post.id.toString()}</td>
                                        <td>{post.headline}</td>
                                        <td>{post.tag}</td>
                                        <td><button className="btn btn-success" onClick={() => this.updatePostClicked(post.id)}>Update</button></td>
                                        <td><button className="btn btn-warning" onClick={() => this.deletePostClicked(post.id)}>Delete</button></td>
                                    </tr>
                                )
                            } 
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addPostClicked}>Add</button>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default ListPostsComponent