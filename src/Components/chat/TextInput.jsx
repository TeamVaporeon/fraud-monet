import React from 'react';

const TextInput = (props) => {
  const handleSubmit = () => {

  };

  return (
    <div id="input-container">
      <form id="input-form" action="">
        <div className="input-group">
          <input id="input-message" autoComplete="off" type="text" placeholder="Message..." aria-label="Message..."/>
          <span className="input-group-btn-span">
            <button className="input-group-button" type="submit" onClick={handleSubmit}>
              Send
            </button>
          </span>
        </div>
      </form>
    </div>
  );
};

export default TextInput;