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
  
  const handleDeleteBoard = (board) => {
    axios.delete(`${kBaseUrl}/boards/${board.id}`)
    .then(()=> {
      setBoardsData(prev => prev.filter(deleteBoard => deleteBoard.id !== board.id));
    })
    .catch(e => console.log(e));
  };

  const boardList = boardsData.map((board) => {
    return (
      <li key={board.id}>
        <Board board={board} onBoardSelect={selectBoard} onDeleteSelect={handleDeleteBoard}/>
      </li>
    )});

  const [isBoardFormVisible, setIsBoardFormVisible] = useState(true);
  
  const toggleBoardForm = () => {
    setIsBoardFormVisible(!isBoardFormVisible);
  }

  return (
    <main>
      <h1>SPREAD THE LOVE!</h1>
      <div className = "box">
      <section className="boards-container">
        <section className ="existing-boards-container">
          <h2>Choose from an Existing Board!</h2>
          <ul>{boardList}</ul>
        </section>
        <section>
          <div id={isBoardFormVisible ? '' : 'hidden'}>
          <h3>Add a New Board!</h3>
          <NewBoardForm createNewBoard = {createNewBoard}></NewBoardForm>
          </div>
          <button onClick={toggleBoardForm}>{isBoardFormVisible ? '🫥' : '✏️'}</button>
        </section>
      </section>
      <section className="selected-boards-container">
        <section>
          {selectedBoard.id ? 
            <CardsList board={selectedBoard}></CardsList> : null}
        </section>
      </section>
      </div>
    </main>
  );
}

export default App;
