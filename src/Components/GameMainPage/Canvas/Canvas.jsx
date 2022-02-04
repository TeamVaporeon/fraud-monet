/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import Sketch from 'react-p5';
import { AppContext } from '../../../App';
import './Canvas.css';

let canva;

const Canvas = ({ thingy }) => {
  const {
    socket,
    players,
    setRound,
    round,
    currentUser,
    gameStarted,
    setStart,
  } = useContext(AppContext);
  // const [turn, setTurn] = useState(0);
  const [userWithId, setUserWithId] = useState();

  useEffect(() => {
    let x = currentUser;
    if (socket.id) {
      x.id = socket.id;
    }
    setUserWithId(x);
  }, [currentUser]);

  const setup = (p5, canvasParentRef) => {
    const turndiv = p5.createDiv('Current turn:').parent(canvasParentRef);
    turndiv.style('font-weight', 'bold');
    turndiv.style(
      'text-shadow',
      '1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000'
    );
    turndiv.style('color', 'rgb(72, 20, 114)');

    const canva = p5
      .createCanvas(thingy.offsetWidth, thingy.offsetHeight - 24)
      .parent(canvasParentRef);

    p5.background(255);
    p5.storeItem('turn', 0);

    canva.id('sketchpad');

    const save = p5.createButton('Download Canvas').parent(canvasParentRef);
    save.id('downloadBtn');
    //download button
    save.mouseClicked(() => {
      p5.saveCanvas(canva, 'our drawing', 'jpg');
    });
    //load live drawings
    socket.on('mouse', (data) => {
      p5.stroke(data.color);
      p5.strokeWeight(10);
      p5.line(data.x, data.y, data.px, data.py);
    });

    canva.mouseReleased(() => {
      let turn = p5.getItem('turn');
      if (
        JSON.parse(
          sessionStorage.getItem('gameStarted') &&
            socket.id === JSON.parse(sessionStorage.getItem('users'))[turn].id
        )
      ) {
        socket.emit('turn', p5.getItem('turn') + 1);
        if (
          p5.getItem('turn') ===
          JSON.parse(sessionStorage.getItem('users')).length - 1
        ) {
          turndiv.html(
            'Current turn: ' +
              JSON.parse(sessionStorage.getItem('users'))[0].username
          );
          turndiv.style(
            'color',
            JSON.parse(sessionStorage.getItem('users'))[0].color
          );
        } else {
          turndiv.html(
            'Current turn: ' +
              JSON.parse(sessionStorage.getItem('users'))[
                p5.getItem('turn') + 1
              ].username
          );
          turndiv.style(
            'color',
            JSON.parse(sessionStorage.getItem('users'))[p5.getItem('turn') + 1]
              .color
          );
        }
      }
    });

    socket.on('turn', (newTurn) => {
      if (newTurn === JSON.parse(sessionStorage.getItem('users')).length) {
        p5.storeItem('turn', 0);
        socket.emit('round', Number(sessionStorage.getItem('round')) + 1);
        turndiv.html(
          'Current turn: ' +
            JSON.parse(sessionStorage.getItem('users'))[p5.getItem('turn')]
              .username
        );
        turndiv.style(
          'color',
          JSON.parse(sessionStorage.getItem('users'))[p5.getItem('turn')].color
        );
      } else {
        p5.storeItem('turn', newTurn);
        turndiv.html(
          'Current turn: ' +
            JSON.parse(sessionStorage.getItem('users'))[p5.getItem('turn')]
              .username
        );
        turndiv.style(
          'color',
          JSON.parse(sessionStorage.getItem('users'))[p5.getItem('turn')].color
        );
      }
    });

    socket.on('gameStart', () => {
      p5.resizeCanvas(thingy.offsetWidth, thingy.offsetHeight - 24);
      p5.background(255);
      turndiv.html(
        'Current turn: ' +
          JSON.parse(sessionStorage.getItem('users'))[p5.getItem('turn')]
            .username
      );
      turndiv.style(
        'color',
        JSON.parse(sessionStorage.getItem('users'))[p5.getItem('turn')].color
      );
    });
  };

  const mouseDragged = (p5) => {
    //draw and emitting functions
    if (
      userWithId &&
      userWithId.id === players[p5.getItem('turn')].id &&
      gameStarted &&
      round < 2
    ) {
      var data = {
        x: p5.mouseX,
        y: p5.mouseY,
        px: p5.pmouseX,
        py: p5.pmouseY,
        color: currentUser.color,
      };
      socket.emit('mouse', data);
      p5.stroke(currentUser.color);
      p5.strokeWeight(10);
      p5.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY);
    } else if (!gameStarted) {
      var data = {
        x: p5.mouseX,
        y: p5.mouseY,
        px: p5.pmouseX,
        py: p5.pmouseY,
        color: currentUser.color,
      };
      socket.emit('mouse', data);
      p5.stroke(currentUser.color);
      p5.strokeWeight(10);
      p5.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY);
    }
  };

  const windowResized = (p5) => {
    p5.resizeCanvas(thingy.offsetWidth, thingy.offsetHeight - 24);
    p5.background(255);
  };

  //on start, clear canvas and only pass mouseDragged to current player (also increment round on start)
  //need to attach an emitter to start button which will then trigger these changes
  return (
    <Sketch
      setup={setup}
      mouseDragged={mouseDragged}
      windowResized={windowResized}
    />
  );
};

export default Canvas;
