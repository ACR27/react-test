import React, { Component } from 'react';
import ProjectItem from './projectItem';

class Projects extends Component {
    deleteProject(id) {
        console.log("DELETING2");
        this.props.onDelete(id);
    }
    render() {
        let projectItems;
        if(this.props.projects) {
            projectItems = this.props.projects.map(project => {
                return <ProjectItem key={project.id} project={project} onDelete={this.deleteProject.bind(this)}/>
            });
        }

        return (
            <div className="Project">
                <h3>Projects</h3>
                <ul>
                    {projectItems}
                </ul>
            </div>
        );
    }
}

Projects.propTypes = {
    projects: React.PropTypes.array,
    onDelete: React.PropTypes.func
}

export default Projects;
