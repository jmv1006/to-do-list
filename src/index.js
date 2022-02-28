import React from 'react';
import ReactDOM from 'react-dom';
import App from './mainApp/App';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Tasks from './tasks/tasks'
import TaskDisplay from './tasks/taskdisplay'
import NoTasks from './tasks/notasks';
import MainContent from './mainContent/maincontent';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route path='/' element={<MainContent />}>
          <Route path="/" element={<Tasks />} >
            <Route path='/' element={<NoTasks />} />
            <Route path=':projectName' element={<TaskDisplay />} />
          </Route>
        </Route>
      </Route>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

