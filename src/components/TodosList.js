import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTodo, getTodos, deleteTodo } from '../actions';
import { Container, Row, Form, Table, Button, Input, InputGroup, FormGroup} from 'reactstrap';

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
        this.props.addTodo(this.state.description);
        this.setState({
            description: ''
        });
    }

    handleDelete = (event, id) => {
        event.preventDefault();
        this.props.deleteTodo(id);
    }

    renderList = () => {
        if (this.props.todos.length > 0) {
            // TODO: Make these headers clickable for ascending + descending order
            return (<Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Id</th>
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
                <th scope="row">{todos[index]['Id']}</th>
                <td>{todos[index]['Description'] == '' ? 'empty' : todos[index]['Description']}</td>
                <td>
                    <Button type="button" color="success" className="mr-2">Edit</Button>
                    <Button type="button" color="danger" onClick={(event) => {this.handleDelete(event, todos[index]['Id'])}}>Delete</Button>
                </td>
            </tr>
        ));
        return list;
    };

    componentDidMount () {
        this.props.getTodos();
    }
    render() {
        return (
            this.props.isFetching ? <div>FETCHING</div> : 
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
        todos: state.todos
    };
}

export default connect(mapStateToProps, { addTodo, getTodos, deleteTodo })(TodosList);
