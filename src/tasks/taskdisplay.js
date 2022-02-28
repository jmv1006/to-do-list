import { useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import './tasks.css'

const TaskDisplay = () => {

    const [projects, addProject] = useOutletContext();
    const [taskNumber, addTaskNumber] = useState(0);

    let params = useParams();
    let projectIndex = projects.findIndex(item => item.name === (params.projectName))
    let project = projects[projectIndex];

    let projectName = project.name;

    const addTask = () => {
        addTaskNumber(taskNumber + 1);
        let inputtedTask = prompt('What is the task?')
        let editedArr = projects;

        let task = {
            taskName: inputtedTask,
            number: taskNumber
        }
        editedArr[projectIndex].todos.push(task);
        addProject([...editedArr])
    }

    const todos = project.todos.map((task, index) => 
        <div key={task.number}>{task.taskName}</div>
    )

    return(
        <div id='taskDisplay'>
            <div className="projName">{projectName}</div>
            <div className="todosContainer">{todos}</div>
            <button onClick={addTask}>Add Task</button>
        </div>
    )
}

export default TaskDisplay;