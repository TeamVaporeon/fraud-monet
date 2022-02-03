/* eslint-disable no-unused-vars */
import React, { useState, createContext, useEffect, useContext } from 'react';
import './ResultsModal.css';
import { AppContext } from '../../../App';

const ResultsModal = ({ setOpenResults, setOpenVote, setOpenFinal }) => {
  const { round, setRound } = useContext(AppContext);
  return (
    <div className='resultsModal'>
      <div className='resultsContainer'>
        <h3 className='resultsTitle'> Vote Results</h3>
        <div className='resultsText'>
          <div>
            Most Voted: <span>Miso</span>
          </div>
          <div>
            Fraud Monet: <span>Miso</span>
          </div>
        </div>
        <button
          className='resultsBtn'
          onClick={() => {
            // setOpenVote(false);
            setOpenResults(false);
            setOpenFinal(true);
          }}
        >
          Show Final Scores
        </button>
      </div>
    </div>
  );
};

export default ResultsModal;
