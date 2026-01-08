import './Card.css';
import PropTypes from 'prop-types';

const Card = ({id, message, likeCount, onLike = () => {}, onDelete = () => {}}) => {

    const heartColor = likeCount > 0 ? '❤️' : '🤍';

    return (
        <div className='card-item'>
            <div className='card-control-options'>
                <button className='card-item__add-likes' onClick={onLike}>+</button>
                <span>{likeCount} {heartColor}</span>
                <button className='card-item__delete' onClick={onDelete}>x</button>
            </div>
            <p className='card-item__text'>{message}</p>
        </div>
    );
};

Card.propTypes = {
    id: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
    likeCount: PropTypes.number.isRequired,
    onLike: PropTypes.func,
    onDelete: PropTypes.func,
};

export default Card;