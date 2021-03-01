import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTodo, getTodos, toggleFetching } from '../actions';
import { Container, Row, Form, Table, Button, Label, Input, InputGroup, FormGroup, Tit} from 'reactstrap';

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

    renderList = () => {
        if (this.props.todos.length > 0) {
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
        let list = Object.keys(todos).map((todo, index) => (
            <tr key={index}>
                <th scope="row">{index}</th>
                <td>{todos[index]['Description'] == '' ? 'empty' : todos[index]['Description']}</td>
                <td>
                    <Button color="success" className="mr-2">Edit</Button>
                    <Button color="danger">Delete</Button>
                </td>
            </tr>
        ));
        return list;
    };

    componentDidMount () {
        // TODO: Find a way to do this that does not pollute every action call
        this.props.toggleFetching();
        this.props.getTodos();
        this.props.toggleFetching();
    }
    render() {
        return (
            this.props.isFetching ? <div>FETCHING</div> : 
            <Container>
                <Row>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <label htmlFor="description">Add a todo:</label>
                            <InputGroup>
                                <Input id="description" type="text" name="description" value={this.state.description} onChange={this.handleChange} />
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
        isFetching: state.isFetching
    };
}

export default connect(mapStateToProps, { addTodo, getTodos, toggleFetching })(TodosList);
