import { useEffect, useState } from 'react';
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { addProjectToDB, db, getProjects, deleteProjectFromDB } from '../firebase';
import './maincontent.css'


const MainContent = () => {
    const [projects, addProject] = useState([]);
    const [projectNumber, setProjectNumber] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        getProjects(db).then((value) => processData(value))

        function processData(data) {
            const projectsArr = data;
            const importedProjs = projectsArr.map(addProjects);
            
            function addProjects(project) {
                let importedProj = {
                    name: project.obj.name,
                    number: project.obj.number,
                    todos: project.obj.todos
                }            
                importProject(importedProj);
                setProjectNumber(projectNumber + projectsArr.length)
            };   
        }

        console.log('maincontent mounted')
    }, [])

    useEffect(() => {
        projects.forEach((project) => {
            addProjectToDB(project);
        })
    }, [projects])


  
    const importProject = (proj) => {  
        let editedArr = projects;
        editedArr.push(proj);
        addProject([...editedArr]);
        
        if(projects.length >= 1) {
            navigate(`${projects[0].name}`)
        };
    }

    const addAProject = () => {
        const response = prompt('What is the name?')
        setProjectNumber(projectNumber + 1)
        let newProject = {
            name: response,
            todos: [],
            number: projectNumber
        };
        addProject(projects.concat(newProject))
        navigate(`/${newProject.name}`)
    }

    const deleteAProject = (projectNumber) => {
        let projectIndex = projects.findIndex((project) => project.number === projectNumber)
        let editedArr = projects;
        deleteProjectFromDB(projects[projectIndex]);
        editedArr.splice(projectIndex, 1)
        addProject([...editedArr]);

        //todo: edit this later to take you to project above deleted
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
                <button id='addProjectButton' onClick={addAProject}>Add project</button>
                {projectsDisplay}
            </div>
            <Outlet context={[projects, addProject]}/>
        </div>
    )
}

export default MainContent;