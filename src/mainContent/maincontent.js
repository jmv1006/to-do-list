import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './maincontent.css'

const MainContent = () => {

    const [projects, addProject] = useState([]);
    const [projectNumber, setProjectNumber] = useState(0);

    const addAProject = () => {
        const response = prompt('What is the name?')
        setProjectNumber(projectNumber + 1)
        let newProject = {
            name: response,
            todos: [],
            number: projectNumber
        };
        
        addProject(projects.concat(newProject))
    }


    const projectsDisplay = projects.map((project) => 
        <Link to={`/tasks/${project.name}`} key={project.number}>
            <div key={project.number}>{project.name}</div>
        </Link>
    );


    return(
        <div id='mainContentContainer'>
            <div id='projectsDisplay'>
                <button onClick={addAProject}>Add project</button>
                {projectsDisplay}
            </div>
            <Outlet context={[projects, addProject]}/>
        </div>
    )
}

export default MainContent;