import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTodo, getTodos, toggleFetching } from '../actions';
class TodosList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: ''
        };

        // These are necessary in order to access/change state from within
        // this.handleChange and this.handleSubmit
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.toggleFetching();
        this.props.addTodo(this.state.description);
        this.setState({
            description: ''
        })
        this.props.toggleFetching();
    }

    listTodos = (todos) => {
        let list = Object.keys(todos).map((todo, index) => (
            <div className='card__wrap' key={index}>
                {todos[index]['Description'] == '' ? 'empty' : todos[index]['Description']}
            </div>
        ));
        return list;
    };

    componentDidMount () {
        this.props.toggleFetching();
        this.props.getTodos();
        this.props.toggleFetching();
    }
    render() {
        return (
            this.props.isFetching ? <div>FETCHING</div> : 
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="description">Add a todo:</label>
                    <input id="description" type="text" name="description" value={this.state.description} onChange={this.handleChange} />
                    <button type="submit">Add</button>
                    {this.listTodos(this.props.todos)}
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        todos: state ? state.todos : ['state is dead'],
        isFetching: state.isFetching
    };
}

export default connect(mapStateToProps, { getAll, addTodo, getTodos, toggleFetching })(TodosList);
