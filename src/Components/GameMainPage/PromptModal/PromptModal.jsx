/* eslint-disable no-unused-vars */
import React, { useState, createContext, useEffect, useContext } from 'react';
import { AppContext } from '../../../App';
import './PromptModal.css';

const PromptModal = ({ setOpenPrompt, socket }) => {
  const [category, setCategory] = useState('');
  const [prompt, setPrompt] = useState('');
  const { setStart, users } = useContext(AppContext);

  const handleSubmit = (event, c, p, socket, cb) => {
    event.preventDefault();
    socket.emit('prompt', { category: c, prompt: p });
    setStart(true);
    socket.emit('start', users);
    socket.emit('gameStart');
    socket.emit('round', 0);
    socket.emit('turn', 0);
    cb(false);
  };

  const randomSubmit = (event, cb) => {
    event.preventDefault();
    setStart(true);
    socket.emit('start', users);
    socket.emit('gameStart');
    socket.emit('round', 0);
    socket.emit('turn', 0);
    cb(false);
  };
  return (
    <div className='prompts'>
      <div className='promptContainer'>
        <div className='promptTop'>
          <h3 className='promptTitle'>Enter a Category and Prompt!</h3>
          <br />
          <br />
          <form
            className='promptForm'
            onSubmit={(event) =>
              handleSubmit(event, category, prompt, socket, setOpenPrompt)
            }
          >
            <p>Pick a Category!</p>
            <span style={{ fontSize: 'x-small' }}>
              This should be fairly broad
            </span>
            <span style={{ fontSize: 'x-small' }}>
              (i.e. 'Pokemon', 'Anime Character', 'Sport', etc.)
            </span>
            <input
              type='text'
              onChange={(e) => setCategory(e.target.value)}
              required
            />
            <br />
            <br />
            <p>Pick a Related Prompt!</p>
            <span style={{ fontSize: 'x-small' }}>
              This should be specific, but not too specific--Remember, you want
              the FRAUD to win!
            </span>
            <span style={{ fontSize: 'x-small' }}>
              (i.e. "Bulbasaur", but NOT "Bulbasaur using vine whip on a
              Vaporeon while wearing shades")
            </span>
            <input
              type='text'
              onChange={(e) => setPrompt(e.target.value)}
              required
            />
            <br />
            <br />
            <button type='submit' className='promptSubmitBtn'>
              Submit
            </button>
            <br />
            <button
              className='promptSubmitBtn'
              onClick={(event) => randomSubmit(event, setOpenPrompt)}
            >
              Random
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PromptModal;
