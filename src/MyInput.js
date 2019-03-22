import React, { useState } from 'react';

function MyInput(props) {
  const [inputIsPristine, setInputIsPristine] = useState(true);
  const [number, setNumber] = useState(0);

  const { min } = props;
  const inputIsValid = number >= min;
  const inputHasError = !inputIsPristine && !inputIsValid;

  const handleChange = event => {
    setInputIsPristine(false);
    setNumber(event.target.value);
  };

  return (
    <form>
      <label htmlFor="input-number">Number: </label>
      <input
        id="input-number"
        type="number"
        value={number}
        onChange={handleChange}
      />
      {inputHasError && (
        <div data-testid="error-msg">The number you entered is invalid</div>
      )}
      <button data-testid="submit-btn" type="submit" disabled={!inputIsValid}>
        Submit!
      </button>
    </form>
  );
}

MyInput.defaultProps = {
  min: 1,
};

export default MyInput;
