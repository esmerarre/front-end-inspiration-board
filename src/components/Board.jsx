import PropTypes from "prop-types";
import "./Board.css"

const Board = ({board, onBoardSelect = () => {}, onDeleteSelect = () => {}}) => {
    return (
        <div className="board-container">
            <div className="board-title" onClick={() => onBoardSelect(board)}>
                {board.title} from {board.owner}
                </div> 
            <span className="board-button" onClick={() => onDeleteSelect(board)}>x</span>
        </div>
    );
};

Board.propTypes = {
    board: PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            owner: PropTypes.string.isRequired,
        }).isRequired,
    onBoardSelect: PropTypes.func,
    onDeleteSelect: PropTypes.func,
}

export default Board;