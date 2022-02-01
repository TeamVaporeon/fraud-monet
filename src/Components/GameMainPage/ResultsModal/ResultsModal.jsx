/* eslint-disable no-unused-vars */
import React, { useState, createContext, useEffect, useContext } from 'react';
import './ResultsModal.css';
import { AppContext } from '../../../App';

const ResultsModal = ({ setOpenResults, setOpenVote, setOpenFinal }) => {
  const { round, setRound } = useContext(AppContext);
  return (
    <div className='resultsModal'>
      <div className='resultsContainer'>
        <div>
          Most Voted: <span>Miso</span>
        </div>
        <div>
          Fraud Monet: <span>Miso</span>
        </div>
        <button
          onClick={() => {
            setOpenResults(false);
            setOpenVote(false);
          }}
        >
          X
        </button>
        <button>Jump to Final</button>
      </div>
    </div>
  );
};

export default ResultsModal;
