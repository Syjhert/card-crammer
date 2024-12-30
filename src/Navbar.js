const Navbar = () => {
    return ( 
        <nav className="navbar">
            
            <h1>Card Crammer</h1>

            <div className="links">
                <a href='/'>Home</a>
                {/* Next time, I might use react router so yeah */}
                <a href='/'>About</a>
            </div>
        </nav>
    );
}
 
export default Navbar;