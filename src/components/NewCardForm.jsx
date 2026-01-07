import { useState } from 'react';
import PropTypes from 'prop-types';
import './NewCardForm.css';

// createNewCard will be passed as a prop. Needs to be added to App.jsx

const kDefaultsFormState = {
    message: ''
};

const NewCardForm = ({createNewCard}) => {
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
    createNewCard(formData); //notifying rest of the app that there is data available 
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
    <form onSubmit={handleSubmit} className="card-form">
      <div className="input-wrapper">
        <label htmlFor="message">Message: </label>
        { makeControlledInput('message') }
      </div>
      <div className="submit-button-wrapper">
        <input type="submit" value="Create A New Card"/>
      </div>
    </form>
  );
};

NewCardForm.propTypes = {
  createNewCard: PropTypes.func
};

export default NewCardForm;