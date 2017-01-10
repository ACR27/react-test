import React, { Component } from 'react';

class ProjectItem extends Component {
    deleteProject(id) {
        console.log("DELETING");
        console.log(id);
        this.props.onDelete();
    }
    render() {
        return (
            <li className="Project">
                <strong>{this.props.project.title}</strong> - {this.props.project.category} <a href="#" onClick={this.deleteProject.bind(this, this.props.project.id)}>x</a>
            </li>
        );
    }
}

ProjectItem.propTypes = {
    project: React.PropTypes.object,
    deleteProject: React.PropTypes.func
}

export default ProjectItem;
