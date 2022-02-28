import { Outlet } from 'react-router-dom';
import Header from '../header/header';
import MainContent from '../mainContent/maincontent';
import './app.css'

function App() {

  return (
    <div className="App">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;