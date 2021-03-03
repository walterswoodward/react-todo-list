import React, { Component, Fragment } from 'react';
import { Form, Button, Input } from 'reactstrap';

class EditableItem extends Component {
    render() {
        const {todos, index, handleUpdate, handleDelete, handleChange, editValue} = this.props;
        return (
            <Fragment>
                <td>
                    <Form onSubmit={(event) => {handleUpdate(event, todos[index]['Id'])}}>
                        <Input id="editValue" name="editValue" value={editValue} 
                            onChange={handleChange}
                            autoFocus>
                        </Input>
                    </Form>
                </td>
                <td>
                    <Button 
                        type="button"
                        className="text-light btn btn-primary mr-2"
                        color="success"
                        onClick={(event) => {handleUpdate(event, todos[index]['Id'])}}
                    >Save</Button>
                    <Button 
                        type="button" 
                        color="danger" 
                        onClick={(event) => {handleDelete(event, todos[index]['Id'])}}
                    >Delete</Button>
                </td>
            </Fragment>
        )
    }
}

export default EditableItem;


