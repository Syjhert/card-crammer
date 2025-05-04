import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFolders } from './redux/folderSlice';

import Navbar from './components/Navbar';
import Home from './Home';
import Landing from './Landing';
import Login from './Login';
import Register from './Register';
import About from './About';
import PrivateRoute from './components/PrivateRoute';
import CreateFolder from './Folder/CreateFolder';
import ViewFolder from './Folder/ViewFolder';
import EditFolder from './Folder/EditFolder';

function App() {
  const theme = useSelector((state) => state.ui.theme);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.reload();
  };

  // Set the theme on the body element for tailwind theme setting
  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
          dispatch(fetchFolders());
      }
  }, [dispatch, navigate]);

  return (
    <div className="App flex flex-col items-center">
      <Navbar handleLogout={handleLogout}/>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />

        <Route element={<PrivateRoute />}>
            <Route path="/folders" element={<Home />} />
            <Route path="/folders/create" element={<CreateFolder />} />
            <Route path="/folders/view/:id" element={<ViewFolder />} />
            <Route path="/folders/edit/:id" element={<EditFolder />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;