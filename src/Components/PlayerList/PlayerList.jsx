import React, { useEffect, useContext, useState } from 'react';
import './PlayerList.css';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { AppContext } from '../../App';

const PlayerList = ({ setOpenPrompt }) => {
  const {
    users,
    currentUser,
    socket,
    availColors,
    setStart,
    gameStarted,
    QM,
    players,
  } = useContext(AppContext);
  const [spectators, setSpectators] = useState(null);
  const [colorModal, setColorModal] = useState(false);
  const [isShown, scoreIsShown] = useState(false);

  const handleStart = (e) => {
    if (currentUser.role === 'qm') {
      setOpenPrompt(true);
    } else {
      setStart(true);
      socket.emit('start', users);
      socket.emit('gameStart');
      socket.emit('round', 0);
      socket.emit('turn', 0);
    }
  };

  useEffect(() => {
    if (users) {
      setSpectators(users.filter((player) => player.role === 'spectator'));
    }
  }, [users]);

  const update = (e, role) => {
    setColorModal(false);
    currentUser.role = role;
    if (e.target.attributes.color.value !== '#000') {
      currentUser.color = e.target.attributes.color.value;
    }
    currentUser.id = socket.id;
    socket.emit('update', currentUser);
  };

  const sendPrompt = (category, prompt) => {
    socket.emit('prompt', { category, prompt });
  };

  // const kick = (e) => {
  //   setColorModal(false);
  //   let kickedPlayer = users.filter(
  //     (player) => player.id === e.target.attributes.playerid.value
  //   );
  //   console.log(kickedPlayer[0]);
  //   kickedPlayer[0].role = 'spectator';
  //   socket.emit('update', kickedPlayer[0]);
  // };

  // const claim = () => {
  //   currentUser.host = true;
  //   socket.emit('update', currentUser);
  // };

  return (
    <>
      {/* <button onClick={claim}>Claim Host</button> */}
      <div className='total-game-list'>
        <div className='players-list'>
          <h3 className='player-title'>Players:</h3>
          <div className='just-players'>
            {players
              ? players.map((player) => (
                  <div className='each-player' key={player.id + '1'}>
                    <div
                      style={{ background: player.color }}
                      key={player.id + '2'}
                      onMouseEnter={() => scoreIsShown(true)}
                      onMouseLeave={() => scoreIsShown(false)}
                    >
                      <span key={player.id}>
                        {`${player.username} ${player.host ? '👑' : ''}`}
                        {isShown && player.score <= 5 ? (
                          <span style={{ marginLeft: '5px' }}>
                            {'🏆'.repeat(player.score)}
                          </span>
                        ) : isShown && player.score > 5 ? (
                          <span style={{ marginLeft: '5px' }}>
                            {'🏆 x ' + player.score}
                          </span>
                        ) : null}
                      </span>
                      {player.id === currentUser.id && !gameStarted ? (
                        <span>
                          <span
                            key={player.id + '4'}
                            onClick={(e) => update(e, 'spectator')}
                            color='#000'
                            style={{
                              float: 'right',
                              marginRight: '5px',
                              cursor: 'pointer',
                            }}
                          >
                            ❌
                          </span>
                        </span>
                      ) : (
                        currentUser.host &&
                        !gameStarted && (
                          <span>
                            <span
                              key={player.id + '6'}
                              // onClick={kick}
                              playerid={player.id}
                              style={{
                                float: 'right',
                                marginRight: '5px',
                                cursor: 'pointer',
                              }}
                            >
                              ❌
                            </span>
                          </span>
                        )
                      )}
                    </div>
                  </div>
                ))
              : null}
          </div>
          {spectators && spectators.length ? (
            <div className='entire-spec-container'>
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
          ) : null}
        </div>
        <div className='playercount-and-buttons'>
          <div className='players-spec-count'>
            <div>Players in Game: {players ? players.length : 0}/10</div>
            <div>
              Number of Spectators: {spectators ? spectators.length : 0}
            </div>
          </div>
          <Stack className='join-start-buttons' direction='horizontal' gap={2}>
            {currentUser.role === 'spectator' &&
            !gameStarted &&
            players.length < 10 &&
            currentUser.username ? (
              <Button
                onClick={() => setColorModal(true)}
                variant='success'
                size='sm'
              >
                Join
              </Button>
            ) : (
              <Button variant='success' size='sm' disabled>
                Join
              </Button>
            )}
            {(currentUser.role === 'qm' || (!QM.id && currentUser.host)) &&
            !gameStarted &&
            players.length >= 3 ? (
              <Button onClick={handleStart} variant='success' size='sm'>
                Start
              </Button>
            ) : currentUser.role === 'qm' || (!QM.id && currentUser.host) ? (
              <Button disabled variant='success' size='sm'>
                Start
              </Button>
            ) : null}
          </Stack>
        </div>
        {colorModal ? (
          <div className='colorModal'>
            <div>Select your color:</div>
            <div>
              {Object.keys(availColors).map((color) => {
                return availColors[color] ? (
                  <svg key={color + 'a'} width='20' height='20'>
                    <rect
                      key={color}
                      width='20'
                      height='20'
                      color={color}
                      style={{
                        fill: color,
                        cursor: 'pointer',
                      }}
                      onClick={(e) => update(e, 'player')}
                    ></rect>
                  </svg>
                ) : (
                  <svg
                    key={color + 'a'}
                    width='20'
                    height='20'
                    style={{ opacity: '30%' }}
                  >
                    <rect
                      key={color}
                      width='20'
                      height='20'
                      color={color}
                      style={{
                        fill: color,
                      }}
                    ></rect>
                  </svg>
                );
              })}
            </div>
          </div>
        ) : null}
        <Stack className='join-qm-button' direction='horizontal' gap={2}>
          {currentUser.username &&
          currentUser.role !== 'player' &&
          !gameStarted &&
          !QM.id ? (
            <Button
              onClick={(e) => update(e, 'qm')}
              color='#000'
              variant='success'
              size='sm'
            >
              Join as Question Master
            </Button>
          ) : null}
        </Stack>
        {QM.id ? (
          <div className='question-master'>
            {`QM: ${QM.username}`}
            {QM.id === currentUser.id && !gameStarted ? (
              <span
                key={QM.id + '3'}
                onClick={(e) => update(e, 'spectator')}
                color='#000'
                style={{ cursor: 'pointer' }}
              >
                ❌
              </span>
            ) : null}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default PlayerList;
