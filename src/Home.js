import { useState } from 'react';

const Home = () => {
    const [name, setName] = useState('mario');
    const [age, setAge] = useState(25);
    const [clickTimes, setClickTimes] = useState(0);

    const handleClick = ()=>{
        setName("luigi");
        setAge(30)
        setClickTimes(clickTimes+1);
    };

    return ( 
        <div className="home">
            <h2>Homepage</h2>
            <p>Name is {name}, {age} years old</p>
            <p>You clicked {clickTimes} times!</p>
            <button onClick={handleClick}>Click me</button>
        </div>
    );
}
 
export default Home;