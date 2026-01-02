import Board from './components/Board';
// import CardList from './components/CardList';
// import NewBoardForm from './components/NewBoardForm';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const kBaseUrl = import.meta.env.BACKEND_URL;

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
    title: '',
    board_id: null
  });

  const selectBoard = board => {setSelectedBoard(board)};

  const boardList = boardsData.map((board) => {
    return (
      <li key={board.board_id}>
        <Board board={board} onBoardSelect={selectBoard} />
      </li>
    )});

  return (
    <main>
      <h1>Spread the Love!</h1>
      <section className="boards-container">
        <section>
          <h2>Add a New Board!</h2>
          <NewBoardForm createNewBoard = {createNewBoard}></NewBoardForm>
        </section>
        <section>
          <h2>Choose from an Existing Board!</h2>
          <ul>{boardList}</ul>
        </section>
      </section>
      <section className="selected-boards-container">
        <section>
          <CardList board={selectedBoard}></CardList>
        </section>
      </section>
    </main>
  );
}

export default App;
