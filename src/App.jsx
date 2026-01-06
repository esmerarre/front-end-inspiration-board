import Board from './components/Board';
import CardsList from './components/CardsList';
import NewBoardForm from './components/NewBoardForm';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const kBaseUrl = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const [boardsData, setBoardsData] = useState([]);

  useEffect(() => {
    axios.get(`${kBaseUrl}/boards`)
      .then(response => setBoardsData(response.data))
      .catch (e => console.log(e))
  }, []);

  const createNewBoard = newBoard => {
    axios.post(`${kBaseUrl}/boards`, newBoard)
    .then(response => {
      setBoardsData(prev => [...prev, response.data]);
    })
    .catch(e => console.log(e));
  };

  const [selectedBoard, setSelectedBoard] = useState({
    owner: '',
    title: '',
    id: null
  });

  const selectBoard = board => {setSelectedBoard(board)};

  const boardList = boardsData.map((board) => {
    return (
      <li key={board.id}>
        <Board board={board} onBoardSelect={selectBoard} />
      </li>
    )});

  const [isBoardFormVisible, setIsBoardFormVisible] = useState(true);
  
  const toggleBoardForm = () => {
    setIsBoardFormVisible(!isBoardFormVisible);
  }

  return (
    <main>
      <h1>Spread the Love!</h1>
      <div className = "box">
      <section className="boards-container">
        <section className ="existing-boards-container">
          <h2>Choose from an Existing Board!</h2>
          <ul>{boardList}</ul>
        </section>
        <section>
          <h2>Add a New Board!</h2>
          <div id={isBoardFormVisible ? '' : 'hidden'}>
          <NewBoardForm createNewBoard = {createNewBoard}></NewBoardForm>
          </div>
          <button onClick={toggleBoardForm}>{isBoardFormVisible ? 'Hide Board Form' : 'Show Board Form'}</button>
        </section>
      </section>
      <section className="selected-boards-container">
        <section>
          <CardsList board={selectedBoard}></CardsList>
        </section>
      </section>
      </div>
    </main>
  );
}

export default App;
