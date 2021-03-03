import React, { Component, Fragment } from 'react';
import { Button } from 'reactstrap';

class CompletedItem extends Component {
    render() {
        const {
            completed, // redux
            index, // parent
            handleDelete, // parent
            handleRestore // parent
        } = this.props;
        return (
            <Fragment>
                <td>{completed[index]['Description'] == '' ? 'empty' : completed[index]['Description']}</td>
                <td>
                    <Button 
                        type="button"
                        className="text-light btn btn-primary mr-2"
                        color="primary"
                        onClick={(event) => {handleRestore(event, completed[index])}}
                    >Restore</Button>
                    <Button type="button" color="danger" onClick={(event) => {handleDelete(event, completed[index]['Id'])}}>Delete</Button>
                </td>
            </Fragment>
        )
    }
}

export default CompletedItem;

