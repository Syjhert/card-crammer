import { Link } from "react-router-dom";

const Navbar = () => {
    return ( 
        <nav className="navbar">
            
            <h1>Card Crammer</h1>

            <div className="links">
                <Link to="/">Home</Link>
                <Link to="folders/create">Create</Link>
                <Link to="about">About</Link>
            </div>
        </nav>
    );
}
 
export default Navbar;