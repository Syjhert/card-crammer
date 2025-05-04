import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import darkModeIcon from '../assets/dark-mode.png';
import lightModeIcon from '../assets/light-mode.png';
import { toggleTheme } from '../redux/uiSlice';

const Navbar = ({handleLogout}) => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.ui.theme);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <nav className="h-20 w-3/4 max-w-[75rem] rounded-2xl flex items-center justify-between sticky z-10 top-0 mt-5 mx-auto px-14 py-4 bg-bg dark:bg-bg-dark shadow-md">
      <Link to="/" className="text-3xl font-bold text-primary dark:text-primary-dark">
        CardCrammer
      </Link>
      
      <div>
        {!isAuthenticated ? (
          <div className='flex items-center space-x-8'>
            <Link to="/login" className="text-xl font-bold hover:text-primary dark:hover:text-primary-dark">
              Login
            </Link>
            <Link to="/register" className="text-xl font-bold hover:text-primary dark:hover:text-primary-dark">
              Register
            </Link>
            <Link to="/about" className="text-xl font-bold hover:text-primary">
              About
            </Link>
            <img
              src={theme === "dark" ? lightModeIcon : darkModeIcon}
              className="h-8 w-8 cursor-pointer"
              onClick={() => dispatch(toggleTheme())}
            />
          </div>
        ) : (
          <div className='flex items-center space-x-8'>
            <Link to="/" className="text-xl font-bold hover:text-primary dark:hover:text-primary-dark">
              Home
            </Link>
            <Link to="/folders/create" className="text-xl font-bold hover:text-primary dark:hover:text-primary-dark">
              Create
            </Link>
            <button onClick={handleLogout} className="text-xl font-bold hover:text-primary dark:hover:text-primary-dark cursor-pointer">
              Logout
            </button>
            <img
              src={theme === "dark" ? lightModeIcon : darkModeIcon}
              className="h-8 w-8 cursor-pointer"
              onClick={() => dispatch(toggleTheme())}
            />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;