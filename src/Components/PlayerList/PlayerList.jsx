import React, { useEffect, useContext, useState } from 'react';
import './PlayerList.css';
import Button from 'react-bootstrap/Button';
import { AppContext } from '../../App';
import { Socket } from 'socket.io-client';

const PlayerList = () => {
  const { users, currentUser, socket, availColors } = useContext(AppContext);
  const [players, setPlayers] = useState(null);
  const [spectators, setSpectators] = useState(null);
  const [colorModal, setColorModal] = useState(false);

  useEffect(() => {
    if (users) {
      setPlayers(users.filter((player) => player.role === 'player'));
      setSpectators(users.filter((player) => player.role === 'spectator'));
      // setHost(users.filter((player) => player.host === true));
    }
  }, [users]);

  const join = (e) => {
    setColorModal(false);
    currentUser.role = 'player';
    currentUser.color = e.target.attributes.color.value;
    currentUser.id = socket.id;
    socket.emit('update', currentUser);
  };

  // startTest() {
  //   console.log('Game Started!');
  // }

  return (
    <>
      <div className='total-game-list'>
        <div className='players-list'>
          <h3 className='player-title'>Players:</h3>
          <div className='just-players'>
            {players
              ? players.map((player, index) => (
                  <div className='each-player' key={index}>
                    <div style={{ background: player.color }}>
                      {`${player.username} ${player.host ? '👑' : ''}`}
                    </div>
                  </div>
                ))
              : null}
          </div>
          <h3 className='spec-title'>Spectators:</h3>
          <div className='just-specs'>
            {spectators
              ? spectators.map((spec, index) => (
                  <div className='each-spectator' key={index}>
                    <div>{spec.username}</div>
                  </div>
                ))
              : null}
          </div>
        </div>
        <div className='playercount-and-buttons'>
          <div className='players-spec-count'>
            <div>Players in Game: {players ? players.length : 0}/10</div>
            <div>
              Number of Spectators: {spectators ? spectators.length : 0}
            </div>
          </div>
          <div className='join-start-buttons'>
            {currentUser.role === 'spectator' ? (
              <Button
                onClick={() => setColorModal(true)}
                variant='success'
                size='sm'
              >
                Join
              </Button>
            ) : (
              <Button disabled>Join</Button>
            )}
            {currentUser.host ? (
              <Button onClick={null} variant='success' size='sm'>
                Start
              </Button>
            ) : null}
          </div>
          {colorModal ? (
            <div className='colorModal'>
              {availColors.map((color) => {
                return (
                  <svg width='20' height='20'>
                    <rect
                      width='20'
                      height='20'
                      color={color}
                      style={{ fill: color }}
                      onClick={join}
                    ></rect>
                  </svg>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default PlayerList;
