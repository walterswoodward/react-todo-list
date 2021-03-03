import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCompleted } from '../../actions';
import { Container, Row } from 'reactstrap';

import List from "./List";

class CompletedBody extends Component {
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
        this.props.getCompleted();
    }
    render() {
        return (
            <Container className="mt-2">
                <Row>
                    <List/>
                </Row>
            </Container>
        )
    }
}

function mapStateToProps(state) {
    return { };
}

export default connect(mapStateToProps, { getCompleted })(CompletedBody);
