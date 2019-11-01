import React, { Component } from 'react';
import PostDataService from '../services/PostDataService';

class PostComponent extends Component {
    constructor(props){
        super(props);

        this.state = {
            id: this.props.match.params.id,
            headline: '',
            tag: '',
            message: ''
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.backClick = this.backClick.bind(this);
    }
    componentDidMount(){
        if (this.state.id === -1){
            return
        };

        PostDataService.retrievePost(this.state.id)
        .then(response => this.setState({
            id: response.data.id,
            headline: response.data.headline,
            tag: response.data.tag,
            message: response.data.message
        }));

    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({[name]: value});
      }

    onSubmit(event){

        let post = {
            id: (this.state.id !== '-1') ? this.state.id : null,
            headline: this.state.headline,
            tag: this.state.tag,
            message: this.state.message
        }

        if (this.state.id === -1) {
            PostDataService.createPost(post)
                .then(() => this.props.history.push('/'))
        } else {
            PostDataService.updatePost(this.state.id, post)
                .then(() => this.props.history.push('/'))
        }

        event.preventDefault();
    }

    backClick(){
        this.props.history.push('/');
    }

    render() {
        let { message, tag, headline, id } = this.state
        return (
            <div className="container">
                <h3>Post</h3>
                <br/>
                <div className="container">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>
                                Id:
                            </label>
                            <input name="id" className="form-control" type="text" value={id} onChange={this.handleChange} disabled/>
                        </div>
                        <div className="form-group">
                            <label>
                                Тэг:
                            </label>
                            <input name = "tag" className="form-control" type="text" value={tag} onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <label>
                                Заголовок:
                            </label>
                            <input name = "headline" className="form-control" type="text" value={headline} onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <label>
                                Сообщение:
                            </label>
                            <textarea name = "message" className="form-control" value={message} onChange={this.handleChange} />
                        </div>
                        <input className="btn btn-primary" type="submit" value="Сохранить" />
                    </form>
                </div>
                <div className="row">
                    <button className="btn btn-success" onClick={this.backClick}>Назад</button>
                </div>
            </div>
        );
    }
}


export default PostComponent;