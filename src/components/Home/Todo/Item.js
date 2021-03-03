import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { toggleEditing } from '../../../actions';
import { Button } from 'reactstrap';

class TodoItem extends Component {
    handleEdit = (event, todo) => {
        event.preventDefault();
        this.setState({
            editValue: todo.description
        });
        this.props.toggleEditing(todo);
    }

    render() {
        const {
            todos, // redux
            index, // parent
            handleDelete, // parent
            handleComplete // parent
        } = this.props;
        return (
            <Fragment>
                <td>{todos[index]['Description'] == '' ? 'empty' : todos[index]['Description']}</td>
                <td>
                    <Button 
                        type="button"
                        className="text-light btn btn-primary mr-2"
                        color="success"
                        onClick={(event) => {
                            this.handleEdit(event, {id: todos[index]['Id'],
                            description: todos[index]['Description']
                        })}}>Edit</Button>
                    <Button 
                        type="button"
                        className="text-light btn btn-primary mr-2"
                        color="primary"
                        onClick={(event) => {handleComplete(event, todos[index])}}
                    >Complete</Button>
                    <Button type="button" color="danger" onClick={(event) => {handleDelete(event, todos[index]['Id'])}}>Delete</Button>
                </td>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    return { todos: state.todos };
}

export default connect(mapStateToProps, { toggleEditing })(TodoItem);

