/* eslint-disable no-unused-vars */
import React, { useState, createContext, useEffect, useContext } from 'react';
import './Vote.css';

const Vote = ({ setOpenVote, setOpenResults }) => {
  // const [name, setName] = useState(null);
  return (
    <div className='voteModal'>
      <div className='voteContainer'>
        Vote Form
        <form className='voteForm' name='voteForm'>
          <div type='checkbox' name='check' value='xxx'>
            xxx
          </div>
        </form>
        <button
          className='voteSubmitBtn'
          type='submit'
          value='submit'
          onClick={() => setOpenResults(true)}
        >
          Submit
        </button>
        <button onClick={() => setOpenVote(false)}>X</button>
      </div>
    </div>
  );
};

export default Vote;
