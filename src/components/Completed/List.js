import React, { Component } from 'react';
import TodoItem from "./Item.js";
import { Table } from 'reactstrap';
import { deleteCompleted, restoreTodo } from '../../actions';
import { connect } from 'react-redux';

class TodoList extends Component {
    handleDelete = (event, id) => {
        event.preventDefault();
        this.props.deleteCompleted(id);
    }
    handleRestore = (event, todo) => {
        console.log("From handleRestore: ", todo);
        event.preventDefault();
        this.props.restoreTodo(false, todo['Id']);
    }

    listTodos = () => {
        const { completed } = this.props;
        let list = Object.keys(completed).map((_todo, index) => (
            <tr key={index}>
                <TodoItem
                    index={index}
                    handleDelete={this.handleDelete}
                    handleRestore={this.handleRestore}
                    completed={completed}
                />
            </tr>
        ));
        return list;
    };
    render() {
        if (this.props.completed.length > 0) {
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
                No completed todos found
            </div>)
        }
    }
}

function mapStateToProps(state) {
    return {
        completed: state.completed
    };
}

export default connect(mapStateToProps, { deleteCompleted, restoreTodo })(TodoList);
