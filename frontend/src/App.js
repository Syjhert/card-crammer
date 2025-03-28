import Navbar from './Navbar';
import Home from './Home';
import About from './About';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateFolder from './Folder/CreateFolder';
import ViewFolder from './Folder/ViewFolder';
import { useEffect } from 'react';
import { fetchFolders } from './redux/reducer';
import EditFolder from './Folder/EditFolder';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(fetchFolders());
  }, [dispatch])

  return (
    <Router basename="/card-crammer">
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="folders">
              <Route path="create" element={<CreateFolder/>}/>
              <Route path="view/:id" element={<ViewFolder/>}/>
              <Route path="edit/:id" element={<EditFolder/>}/>
            </Route>
            <Route path="/about" element={<About/>}/>       
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;