import { Outlet, useOutletContext } from "react-router-dom";
import '../mainContent/maincontent.css'

const Tasks = () => {
    const [projects, addProject] = useOutletContext();

    return(
        <div id='taskContainer'>
            <Outlet context={[projects, addProject]}/>
        </div>
    )
}

export default Tasks;