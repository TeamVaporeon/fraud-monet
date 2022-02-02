/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import Sketch from 'react-p5';
import { AppContext } from '../../../App';
import './Canvas.css';

const Canvas = (props) => {
  const { socket, gameStarted } = useContext(AppContext);

  const setup = (p5, canvasParentRef) => {
    const canva = p5
      .createCanvas(props.width, props.height - 100)
      .parent(canvasParentRef);
    p5.background(255);

    canva.id('sketchpad');

    const save = p5.createButton('Download').parent(canvasParentRef);
    save.mouseClicked(() => {
      p5.saveCanvas(canva, 'our drawing', 'jpg');
    });
    socket.on('mouse', (data) => {
      p5.stroke('black');
      p5.strokeWeight(10);
      p5.line(data.x, data.y, data.px, data.py);
    });
  };

  const draw = (p5) => {};

  const mouseDragged = (p5) => {
    var data = {
      x: p5.mouseX,
      y: p5.mouseY,
      px: p5.pmouseX,
      py: p5.pmouseY,
    };
    socket.emit('mouse', data);
    p5.stroke('black');
    p5.strokeWeight(5);
    p5.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY);
  };

  const windowResized = (p5) => {
    p5.resizeCanvas(props.width, props.height - 100);
  };

  return (
    <Sketch
      setup={setup}
      draw={draw}
      mouseDragged={mouseDragged}
      windowRezied={windowResized}
    />
  );
};

export default Canvas;
