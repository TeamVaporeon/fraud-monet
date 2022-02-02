/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import Sketch from 'react-p5';
import { AppContext } from '../../../App';
import './Canvas.css';

const Canvas = ({thingy, actualData, dummyData}) => {

  const [turn, setTurn] = useState(0);
  const { socket, users, setRound, round, currentUser } = useContext(AppContext);

  const setup = (p5, canvasParentRef) => {

    const canva = p5.createCanvas(thingy.offsetWidth, thingy.offsetHeight - 100).parent(canvasParentRef);
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
      //increment turn when mouse is released
      if (turn === users.length && round !== 3) {
        //if on last player, go back to first player and increment round
        setTurn(0);
        setRound(round + 1);
      } else {
        setTurn(turn + 1);
      }
    });
  };

  const draw = (p5) => {};

  const mouseDragged = (p5) => {
    //draw and emitting functions
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

  const windowResized = p5 => {
    console.log(users);
    console.log('state: ' + JSON.stringify(currentUser));
    p5.resizeCanvas(thingy.offsetWidth, thingy.offsetHeight-100)
    p5.background(255);
  }

  //on start, clear canvas and only pass mouseDragged to current player (also increment round on start)
  //need to attach an emitter to start button which will then trigger these changes

  return <Sketch setup={setup} draw={draw} mouseDragged={mouseDragged} windowResized={windowResized}/>
}

export default Canvas;