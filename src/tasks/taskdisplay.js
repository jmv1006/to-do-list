import { useOutletContext, useParams } from "react-router-dom";

const TaskDisplay = () => {

    const [projects, addProject] = useOutletContext();

    let params = useParams();
    let index = projects.findIndex(item => item.name === (params.projectName))
    let project = projects[index];

    let projectName = project.name;

    const addTask = () => {
      project.todos.concat('Thing')
    }

    return(
        <div>
            {projectName}
            <button onClick={addTask}>Add Task</button>
        </div>
    )
}

export default TaskDisplay;