import Navbar from './Navbar';
import Home from './Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {


  return (
    <Router basename="/card-crammer">
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path={'/'} element={<Home />} />
            <Route path={'/create/folder'} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;