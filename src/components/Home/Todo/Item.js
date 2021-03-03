import React, { Component, Fragment } from 'react';
import { Button } from 'reactstrap';

class TodoItem extends Component {
    render() {
        const {todos, index, handleEdit, handleDelete} = this.props;
        return (
            <Fragment>
                <td>{todos[index]['Description'] == '' ? 'empty' : todos[index]['Description']}</td>
                <td>
                    <Button 
                        type="button"
                        className="text-light btn btn-primary mr-2"
                        color="primary"
                        onClick={(event) => {
                            handleEdit(event, {id: todos[index]['Id'],
                            description: todos[index]['Description']
                        })}}>Edit</Button>
                    <Button type="button" color="danger" onClick={(event) => {handleDelete(event, todos[index]['Id'])}}>Delete</Button>
                </td>
            </Fragment>
        )
    }
}

export default TodoItem;
