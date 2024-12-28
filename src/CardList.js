const CardList = ({cards, title, handleDelete}) => {

    return ( 
        <div className="card-list">
            <h1>{ title }</h1>
            {cards.map(( card )=>(
                <div className="card-preview" key={ card.id }>
                    <h2>{ card.question }</h2>
                    <p>{ card.answer }</p>
                    <p>Written by: { card.author }</p>
                    <button onClick={ ()=>handleDelete(card.id) }>Delete Card</button>
                </div>
            ))}
        </div>
     );
}
 
export default CardList;