import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './maincontent.css'

const MainContent = () => {

    const [projects, addProject] = useState([]);
    const [projectNumber, setProjectNumber] = useState(0);
    const navigate = useNavigate();

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

    const deleteAProject = (projectNumber) => {
        let projectIndex = projects.findIndex((project) => project.number === projectNumber)
        let editedArr = projects;
        editedArr.splice(projectIndex, 1)
        addProject([...editedArr]);

        if(projects.length >= 1) {
            let firstProject = projects[0]
            navigate(`/${firstProject.name}`)
        } else {
            navigate('/')
        }
    }


    const projectsDisplay = projects.map((project) => 
        <div key={project.number} className='projectNameContainer'>
            <Link to={`/${project.name}`} key={project.number}>
                <div key={project.number}>{project.name}</div>
            </Link>

            <button onClick={() => deleteAProject(project.number)} className='deleteProjectButton'>delete project</button>
        </div>
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