import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { addTodo, getTodos, deleteTodo, updateTodo, addRedirect, toggleEditing } from '../../actions';
import { Container, Row, Form, Table, Button, Input, InputGroup, FormGroup} from 'reactstrap';

class ListBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            editValue: (this.props.editing ? this.props.editing.description : '')
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
        this.props.addTodo(this.state.description);
        this.setState({
            description: ''
        });
    }

    handleDelete = (event, id) => {
        event.preventDefault();
        this.props.deleteTodo(id);
    }

    handleEdit = (event, todo) => {
        event.preventDefault();
        this.setState({
            editValue: todo.description
        });
        this.props.toggleEditing(todo);
    }

    handleUpdate = (event, id) => {
        event.preventDefault();
        this.props.updateTodo(this.state.editValue, id);
        this.props.toggleEditing(false);
    }

    renderList = () => {
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
                            {this.listTodos(this.props.todos)}
                        </tbody>
                    </Table>)
        } else {
            return (<div className="alert alert-info d-flex justify-content-center w-100">
                You don't have any todos yet. Add one using the form above.
            </div>)
        }
    }

    listTodos = (todos) => {
        let list = Object.keys(todos).map((_todo, index) => (
            <tr key={index}>
                {this.props.editing && this.props.editing.id == todos[index]['Id']?<Fragment>
                    <td>
                        <Form onSubmit={(event) => {this.handleUpdate(event, todos[index]['Id'])}}>
                            <Input id="editValue" name="editValue" value={this.state.editValue} 
                                onChange={this.handleChange}
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
                            color="danger" 
                            onClick={(event) => {this.handleDelete(event, todos[index]['Id'])}}
                        >Delete</Button>
                    </td>
                </Fragment>
                :<Fragment>
                <td>{todos[index]['Description'] == '' ? 'empty' : todos[index]['Description']}</td>
                <td>
                    <Button 
                        type="button"
                        className="text-light btn btn-primary mr-2"
                        color="primary"
                        onClick={(event) => {this.handleEdit(event, {id: todos[index]['Id'], description: todos[index]['Description']})}}>Edit</Button>

                    <Button type="button" color="danger" onClick={(event) => {this.handleDelete(event, todos[index]['Id'])}}>Delete</Button>
                </td>
                </Fragment>}
            </tr>
        ));
        return list;
    };

    componentDidMount () {
        if(this.props.history.location.pathname == this.props.redirect) {
            this.props.addRedirect('');
            console.log('MATCH FOUND')
        };
        this.props.getTodos();
    }
    render() {
        return (
            <Container>
                <Row>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <InputGroup>
                                <Input className="mt-2" id="description" type="text" name="description" value={this.state.description} onChange={this.handleChange} autoFocus/>
                            </InputGroup>
                            <Button className="my-2" type="submit" color="info">Add</Button>
                        </FormGroup>
                    </Form>
                </Row>
                <Row>
                    {this.renderList()}
                </Row>
            </Container>
        )
    }
}

function mapStateToProps(state) {
    return {
        todos: state.todos,
        redirect: state.redirect,
        editing: state.editing
    };
}

export default connect(mapStateToProps, { addTodo, getTodos, deleteTodo, updateTodo, addRedirect, toggleEditing })(ListBody);
