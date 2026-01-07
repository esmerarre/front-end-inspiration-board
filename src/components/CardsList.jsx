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

    const onDelete = card => {
        axios.delete(`${kBaseUrl}/cards/${card.card_id}`)
            .then(() => {
                setCardsData(prev => prev.filter(newCard => newCard.card_id !== card.card_id)
                );
            }).catch(e => console.log(e));
    };

    const onLike = card => {
        axios.put(`${kBaseUrl}/cards/${card.card_id}/like`)
            .then(() => {
                const updateCardsData = cardsData.map(prev => {
                    prev.card_id !== card.card_id ? prev : {...prev, likesCount: prev.likesCount + 1}
                });
                setCardsData(updateCardsData);
            }).catch(e => console.log(e));
    };


    const cardsList = cardsData.map(card => {
        return (
            <Card 
                key={card.card_id} 
                id={card.card_id} 
                message={card.message} 
                card={card} 
                onLike={onLike} 
                onDelete={onDelete} />
        )
    });

    return (
        <section className='card-container'>
            <h2>{board.title}</h2>
            <section>
                <h2>Add a New Card!</h2>
                <NewCardForm createNewCard = {createNewCard}></NewCardForm>
            </section>
            <div className='individual-card'>
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