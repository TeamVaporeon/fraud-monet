/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import Sketch from 'react-p5';
import { AppContext } from '../../../App';
import './Canvas.css';

let canva;
let y;

const Canvas = ({thingy, actualData, dummyData}) => {

  const { socket, users, setRound, round, currentUser, gameStarted } = useContext(AppContext);
  const [turn, setTurn] = useState(0);
  const [userWithId, setUserWithId] = useState();
  const [myUsers, setMyUsers] = useState();

  useEffect(() => {
    let x = currentUser;
    if (socket.id) {
      x.id = socket.id;
    }
    setUserWithId(x);
  }, [currentUser]);

  const setup = (p5, canvasParentRef) => {
    const canva = p5
      .createCanvas(props.width, props.height - 100)
      .parent(canvasParentRef);

    p5.background(255);

    canva.id('sketchpad');

    const save = p5.createButton('Download Canvas').parent(canvasParentRef);
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
      socket.emit('turn', 0);
    })

    socket.on('turn', resp => console.log(resp));
  };

  const draw = (p5) => {};

  const mouseDragged = (p5) => {
    //draw and emitting functions
    if (userWithId && userWithId.id === users[turn].id && gameStarted) {
      var data = {
        x: p5.mouseX,
        y: p5.mouseY,
        px: p5.pmouseX,
        py: p5.pmouseY,
        color: socket.auth.user.color
      };
      socket.emit('mouse', data);
      p5.stroke(socket.auth.user.color);
      p5.strokeWeight(10);
      p5.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY);
    } else if (!gameStarted) {
      var data = {
        x: p5.mouseX,
        y: p5.mouseY,
        px: p5.pmouseX,
        py: p5.pmouseY,
        color: socket.auth.user.color
      };
      socket.emit('mouse', data);
      p5.stroke(socket.auth.user.color);
      p5.strokeWeight(10);
      p5.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY);
    }
  }

  const windowResized = p5 => {
    console.log(users);
    console.log('state: ' + JSON.stringify(userWithId));
    p5.resizeCanvas(thingy.offsetWidth, thingy.offsetHeight-100)
    p5.background(255);
  }

  //on start, clear canvas and only pass mouseDragged to current player (also increment round on start)
  //need to attach an emitter to start button which will then trigger these changes
  return <Sketch setup={setup} mouseDragged={mouseDragged} windowResized={windowResized} />
}

export default Canvas;
