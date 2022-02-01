/* eslint-disable no-unused-vars */
import React, { useState, createContext, useEffect, useContext } from 'react';
import './Rules.css';

const Rules = ({ setOpenRules }) => {
  // const [d, setD] = useState(null);
  return (
    <div className='rules'>
      <div className='rulesContainer'>
        <button className='ruleCloseBtn' onClick={() => setOpenRules(false)}>
          X
        </button>
        <div className='ruleText'>
          <h3>Game Rules</h3>
          <p>
            Welcome to Fraud Monet! This is a group drawing game about
            identifying fakes — without revealing to them what’s really going
            on.
          </p>

          <p>
            Every game of Fraud Monet begins with a <strong>category</strong>{' '}
            and <strong>prompt</strong>. Every player gets to know the{' '}
            <strong>category</strong>, but whichever player is the fraud this
            round doesn’t get to know the specific prompt.
          </p>

          <p>
            During each player’s turn, they must draw a{' '}
            <strong>single line</strong> on the canvas — once they lift their
            digital pen, their turn is over. If you’re a real artist, your
            objective is to indicate to the other real artists that you know
            what the prompt is, without actually revealing that prompt to the
            fake! If you’re the fraud, your job is to try to figure out what the
            real prompt is, or at least to convince the other artists that you
            do.
          </p>

          <p>
            After two rounds, it’s time to vote! You’ll have a minute to
            discuss, and then everyone will <strong>vote</strong> on who they
            think the fraud is. If they guess wrong, the fraud wins{' '}
            <strong>2 points</strong>. If they guess correctly, the fraud has{' '}
            <strong>one chance</strong> to win: if they correctly guess the
            original prompt, they also win <strong>2 points</strong>. If the
            real artists correctly guess the fraud and the fraud can’t guess the
            original prompt, then the real artists win{' '}
            <strong>1 point each</strong>.
          </p>

          <p>
            A standard match of Fraud Monet typically proceeds for 5 games, but
            you can go as long as you like. Whoever has the most points at the
            end is the winner!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Rules;
