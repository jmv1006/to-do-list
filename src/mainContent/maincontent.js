import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { addProjectToDB, db, getProjects, updateProjectInDB } from '../firebase';
import { doc, updateDoc } from "firebase/firestore";
import './maincontent.css'
import { setDoc } from 'firebase/firestore/lite';



const MainContent = () => {
    const [projects, addProject] = useState([]);
    const [projectNumber, setProjectNumber] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        getProjects(db).then((value) => processData(value))

        function processData(data) {
            const projectsArr = data;
            const importedProjs = projectsArr.map(addProjects)
            
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
    }, [])

    useEffect(() => {
        projects.forEach((project) => {
            //updateProjectInDB(project);
        })

        console.log('changed')

    }, [projects])

    
  
    const importProject = (proj) => {  
        let editedArr = projects;
        editedArr.push(proj);
        addProject([...editedArr]);
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
        addProjectToDB(newProject);
    }

    const deleteAProject = (projectNumber) => {
        let projectIndex = projects.findIndex((project) => project.number === projectNumber)
        let editedArr = projects;
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
                <button onClick={addAProject}>Add project</button>
                {projectsDisplay}
            </div>
            <Outlet context={[projects, addProject]}/>
        </div>
    )
}

export default MainContent;