import Navbar from './Navbar';
import Home from './Home';

function App() {
  const title = 'Welcome to Card Crammer!';
  const likes = 50;

  return (
    <div className="App">
      <Navbar />
      <div className="content">
        <Home />
        {/* <h1>{title}</h1> */}
        {/* <p>Like {likes} times</p> */}
      </div>
    </div>
  );
}

export default App;