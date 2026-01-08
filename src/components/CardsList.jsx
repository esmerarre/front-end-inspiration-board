import Card from './Card';
import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import NewCardForm from './NewCardForm';
import './CardsList.css';

const kBaseUrl = import.meta.env.VITE_BACKEND_URL;

const CardsList = ({board}) => {
    const [cardsData, setCardsData] = useState([]);

    useEffect(() => {
        axios.get(`${kBaseUrl}/boards/${board.id}/cards`)
            .then(response => setCardsData(response.data))
            .catch(e => console.log(e));
        }, [board]);

    const createNewCard = message => {
        axios.post(`${kBaseUrl}/boards/${board.id}/cards`, message) 
            .then(response => 
                setCardsData(prev => [...prev, response.data]))
            .catch(e => console.log(e));
    };

    const onDeleteCard = card => {
        axios.delete(`${kBaseUrl}/cards/${card.id}`)
            .then(() => {
                setCardsData(prev => prev.filter(newCard => newCard.id !== card.id)
                );
            }).catch(e => console.log(e));
    };

    const onLikeCard = card => {
        axios.patch(`${kBaseUrl}/cards/${card.id}/like`)
            .then(() => {
                const updateCardsData = cardsData.map(prev =>
                    prev.id !== card.id ? prev : {...prev, likes: prev.likes + 1}
                );
                setCardsData(updateCardsData);
            }).catch(e => console.log(e));
    };


    const cardsList = cardsData.map(card => {
        return (
            <Card 
                key={card.id} 
                id={card.id} 
                message={card.message}
                likeCount = {card.likes}
                onLike={() => onLikeCard(card)} 
                onDelete={() => onDeleteCard(card)} />
        )
    });

    return (
        <section className='card-container'>
            <h2 id="board-title">✨✨{board.title}✨✨</h2>
            <section>
                <h3>Add a New Card!</h3>
                <NewCardForm createNewCard = {createNewCard}></NewCardForm>
            </section>
            <div className='individual-cards'>
                <ul>{cardsList}</ul>
            </div>
        </section>
    )

};

CardsList.propTypes = {
    board: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        owner: PropTypes.string.isRequired
    }).isRequired,
};

export default CardsList;