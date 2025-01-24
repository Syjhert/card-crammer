import Navbar from './Navbar';
import Home from './Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {

  const baseURL = '/card-crammer';

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route exact path={baseURL + '/'} element={<Home />} />
            <Route exact path={baseURL + '/create/folder'} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;