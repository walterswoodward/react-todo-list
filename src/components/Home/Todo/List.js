import React, { Component } from 'react';
import Editable from "./Editable.js";
import TodoItem from "./Item.js";
import { Table } from 'reactstrap';
import { deleteTodo, updateCompleted } from '../../../actions';
import { connect } from 'react-redux';

class TodoList extends Component {
    handleDelete = (event, id) => {
        event.preventDefault();
        this.props.deleteTodo(id);
    }
    handleComplete = (event, todo) => {
        console.log("From handleComplete: ", todo);
        event.preventDefault();
        this.props.updateCompleted(true, todo['Id']);
    }

    listTodos = () => {
        const { todos } = this.props;
        let list = Object.keys(todos).map((_todo, index) => (
            <tr key={index}>
                {this.props.editing && (this.props.editing.id == todos[index]['Id'])? 
                <Editable
                    index={index}
                    handleDelete={this.handleDelete}
                    handleComplete={this.handleComplete}
                /> 
                : 
                <TodoItem
                    index={index}
                    handleDelete={this.handleDelete}
                    handleComplete={this.handleComplete}
                />}
            </tr>
        ));
        return list;
    };
    render() {
        if (this.props.todos.length > 0) {
            // TODO: Make these headers clickable for ascending + descending order
            return (<Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Descriptions</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.listTodos()}
                        </tbody>
                    </Table>)
        } else {
            return (<div className="alert alert-info d-flex justify-content-center w-100">
                You don't have any todos yet. Add one above!
            </div>)
        }
    }
}

function mapStateToProps(state) {
    return {
        todos: state.todos,
        editing: state.editing
    };
}

export default connect(mapStateToProps, { deleteTodo, updateCompleted })(TodoList);
