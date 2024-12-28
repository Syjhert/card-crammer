import { useState, useEffect } from 'react';
import CardList from './CardList';

const Home = () => {
    const [cards, setCards] = useState([
        { question: 'What is 1+1?', answer: "2", author: "jorosh", id: 1 },
        { question: 'What is the plant\' process of making food?', answer: "Photosynthesis", author: "nutters", id: 2 },
        { question: 'What is 2+2?', answer: "4", author: "jorosh", id: 3 },
    ])

    const handleDelete = (id)=>{
        const newCards = cards.filter((card)=>{return card.id !== id});
        setCards(newCards);
    }

    useEffect(()=>{
        console.log("Use effect ran");
        console.log("You just deleted a card");
    }, [cards])

    return (    
        <div className="home">
            <CardList cards={ cards } title={ "All Cards" } handleDelete={ handleDelete }/>
            <CardList cards={ cards.filter( (blog)=>{return blog.author === "jorosh"} ) } title={ "Jorosh Cards" } handleDelete={ handleDelete }/>
            </div>
    );
}
 
export default Home;