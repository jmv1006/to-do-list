import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { getProjects } from "../firebase";
import './tasks.css'

const TaskDisplay = () => {

    const [projects, addProject] = useOutletContext();
    const [taskNumber, addTaskNumber] = useState(0);


    useEffect(() => {
        console.log('task display mounted')
    }, [])

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

    const deleteATask = (taskNumber) => {
        let editedArr = projects;
        let taskIndex = editedArr[projectIndex].todos.findIndex((task) => task.number === taskNumber);
        editedArr[projectIndex].todos.splice(taskIndex, 1);
        addProject([...editedArr]);
    }

    const editATask = (taskNumber) => {
        let newTask = prompt('What is the updated name?');
        let editedArr = projects;
        let taskIndex = editedArr[projectIndex].todos.findIndex((task) => task.number === taskNumber);
        editedArr[projectIndex].todos[taskIndex].taskName = newTask;
        addProject([...editedArr]);
    }



    const todos = project.todos.map((task) => 
        <div key={task.number} className="todo">
            <div>{task.taskName}</div>
            <div id='buttonsContainer'>
                <button onClick={() => deleteATask(task.number)}>Delete Task</button>
                <button onClick={() => editATask(task.number)}>Edit Task</button>
            </div>
        </div>
    );

    return(
        <div id='taskDisplay'>
            <div className="projName">{projectName}</div>
            <div className="todosContainer">{todos}</div>
            <button onClick={addTask}>Add Task</button>
        </div>
    )
}

export default TaskDisplay;