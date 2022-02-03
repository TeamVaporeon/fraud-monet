/* eslint-disable no-unused-vars */
import React, { useState, createContext, useEffect, useContext } from 'react';
import './PromptModal.css';

const handleSubmit = (c, p, cb) => {
  console.log({category: c, prompt: p});
  cb(false);
}

const PromptModal = ({ setOpenPrompt }) => {
  const [category, setCategory] = useState('');
  const [prompt, setPrompt] = useState('');
  return (
    <div className='prompts'>
      <div className='promptContainer'>
        <div className='promptTop'>
          <h3 className='promptTitle'>Enter a Category and Prompt!</h3>
          <br/>
          <br/>
          <form className="promptForm" onSubmit={() => handleSubmit(category, prompt, setOpenPrompt)}>
            <p>Pick a Category!</p>
            <input type="text" onChange={(e) => setCategory(e.target.value)} required/>
            <br/>
            <br/>
            <p>Pick a Related Prompt!</p>
            <input type="text" onChange={(e) => setPrompt(e.target.value)} required/>
            <br/>
            <br/>
            <button type="submit"className='promptSubmitBtn' >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PromptModal;
