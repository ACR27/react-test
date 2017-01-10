import React, { Component } from 'react';

class TodoItem extends Component {
    render() {
        return (
            <li className="Project">
                {this.props.todo.title}
            </li>
        );
    }
}

TodoItem.propTypes = {
    project: React.PropTypes.object
}

export default TodoItem;
