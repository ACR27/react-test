import React, { Component } from 'react';
import uuid from 'uuid';


class AddProject extends Component {
    constructor() {
        super();
        this.state = {
            newProject: {}
        }
    }

    static defaultProps = {
        categories: ["Web Design", "Web Dev", "Mobile Dev"]
    };

    handleSubmit(e) {
        console.log(this.refs.title.value);
        if(this.refs.title.value === '') {
            alert("TITLE IS REQUIRED");
        } else {
            this.setState({
                newProject: {
                    id: uuid.v4(),
                    title: this.refs.title.value,
                    category: this.refs.category.value
                }
            }, function() {
               console.log(this.state);
                this.props.addProject(this.state.newProject);
            });
        }
        e.preventDefault();

    }
    render() {
        let categoryOptions = this.props.categories.map(category => {
           return <option key={category} value={category}>{category}</option>
        });
        return (
            <div className="AddProject">
                <h3>Add Projects</h3>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div>
                        <label>Title</label>
                        <input type="text" ref="title"/>
                        <br/>
                    </div>
                    <div>
                        <label>Category</label>
                        <select ref="category">
                            {categoryOptions}
                        </select>
                        <br/>
                    </div>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}

AddProject.propTypes = {
    addProject: React.PropTypes.func
}

export default AddProject;
