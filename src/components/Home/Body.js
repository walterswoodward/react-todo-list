import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTodo, getTodos } from '../../actions';
import { Container, Row, Form, Button, Input, InputGroup, FormGroup} from 'reactstrap';

import List from "./List.js";

class HomeBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
        };
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
            description: '',
            editValue: (this.props.editing ? this.props.editing.description : '')
        });
    }

    componentDidMount () {
        this.props.getTodos();
    }
    render() {
        return (
            <Container>
                <Row>
                    <Form className="w-100" onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <InputGroup>
                                <Input className="mt-2" id="description" type="text" name="description" 
                                    value={this.state.description} 
                                    onChange={this.handleChange} 
                                    placeholder="Add a todo here..." autoFocus required/>
                            </InputGroup>
                            <Button className="my-2" type="submit" color="info">Add</Button>
                        </FormGroup>
                    </Form>
                </Row>
                <Row>
                    <List
                        handleEdit={this.handleEdit}
                        editValue={this.state.editValue}
                    />
                </Row>
            </Container>
        )
    }
}

function mapStateToProps(state) {
    return { };
}

export default connect(mapStateToProps, { addTodo, getTodos })(HomeBody);
