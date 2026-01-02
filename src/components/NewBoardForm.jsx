import { useState } from 'react';
import PropTypes from 'prop-types';
import './NewBoardForm.css';

const kDefaultsFormState = {
  title: '',
  owner: ''
};

const NewBoardForm = ({createNewBoard}) => {
  const [formData, setFormData] = useState(kDefaultsFormState); //setting up default state to back the input

  const handleChange = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    
    //as the input changes the state is updated
    setFormData((formData)=> {
      return {
        ...formData,
        [inputName]: inputValue
      };
    });
  };


  const handleSubmit = (event) => {
    event.preventDefault(); 
    createNewBoard(formData); //notifying rest of the app that there is data available 
    setFormData(kDefaultsFormState) //resets the text bar when the form is submitted
  }

  const makeControlledInput = (inputName) => {
    return (
      <input
        type="text"
        name={inputName}
        id={`input-${inputName}`}
        value={formData[inputName]}
        onChange={handleChange}
      />
    );
  };

  return (
    <form onSubmit={handleSubmit} className="board-form">
      <div>
        <label htmlFor="title">Title: </label>
        { makeControlledInput('title') }
      </div>
      <div>
        <label htmlFor="owner">Owner's Name: </label>
        { makeControlledInput('owner') }
      </div>
      <div className="submit-button-wrapper">
        <input type="submit" value="Create A New Board"/>
      </div>
    </form>
  );
};

NewBoardForm.propTypes = {
  createNewBoard: PropTypes.func
};

export default NewBoardForm;