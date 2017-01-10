import React, { Component } from 'react';
import TodoItem from './todoItem';

class Todos extends Component {
    render() {
        let todoItems;
        if(this.props.todos) {
            todoItems = this.props.todos.map(todo => {
                return <TodoItem key={todo.id} todo={todo} />
            });
        }

        return (
            <div className="Project">
                <h3>Todos</h3>
                <ul>
                    {todoItems}
                </ul>
            </div>
        );
    }
}

Todos.propTypes = {
    projects: React.PropTypes.array
}

export default Todos;
