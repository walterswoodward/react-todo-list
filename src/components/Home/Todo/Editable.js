import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { updateTodo, toggleEditing } from '../../../actions';
import { Form, Button, Input } from 'reactstrap';

class TodoEditable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editValue: (this.props.editing ? this.props.editing.description : '')
        };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleUpdate = (event, id) => {
        event.preventDefault();
        this.props.updateTodo(this.state.editValue, id);
        this.props.toggleEditing(false);
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
                <td>
                    <Form onSubmit={(event) => {this.handleUpdate(event, todos[index]['Id'])}}>
                        <Input id="editValue" name="editValue" value={this.state.editValue} onChange={this.handleChange}
                            autoFocus>
                        </Input>
                    </Form>
                </td>
                <td>
                    <Button 
                        type="button"
                        className="text-light btn btn-primary mr-2"
                        color="success"
                        onClick={(event) => {this.handleUpdate(event, todos[index]['Id'])}}
                    >Save</Button>
                    <Button 
                        type="button"
                        className="text-light btn btn-primary mr-2"
                        color="primary"
                        onClick={(event) => {handleComplete(event, todos[index])}}
                    >Complete</Button>
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


function mapStateToProps(state) {
    return {
        todos: state.todos,
        editing: state.editing
    };
}

export default connect(mapStateToProps, { updateTodo, toggleEditing })(TodoEditable);


