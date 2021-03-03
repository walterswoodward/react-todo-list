import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { toggleEditing } from '../../actions';
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
                <td style={{width:'300px'}}>
                    <Button 
                        type="button"
                        className="mr-2 my-1"
                        color="success"
                        style={{width:'61px'}}
                        onClick={(event) => {
                            this.handleEdit(event, {id: todos[index]['Id'],
                            description: todos[index]['Description']
                        })}}>Edit</Button>
                    <Button 
                        type="button"
                        className="mr-2 my-1"
                        color="primary"
                        onClick={(event) => {handleComplete(event, todos[index])}}
                    >Complete</Button>
                    <Button color="danger" className="my-1" onClick={(event) => {handleDelete(event, todos[index]['Id'])}}>Delete</Button>
                </td>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    return { todos: state.todos };
}

export default connect(mapStateToProps, { toggleEditing })(TodoItem);

