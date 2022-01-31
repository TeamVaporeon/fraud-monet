import React from 'react';
import Sketch from 'react-p5';
import { io } from 'socket.io-client';

const Canvas = (props) => {

  const socket = io.connect('http://127.0.0.1:8080');

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(500, 500).parent(canvasParentRef);
    p5.background(220);

    socket.on('mouse', data => {
      console.log(data);
      p5.strokeWeight(10);
      p5.line(data.x, data.y, data.px, p5.py);
    })
  }

  const draw = (p5) => {
  }

  const mouseDragged = (p5) => {
    var data = {
      x: p5.mouseX,
      y: p5.mouseY,
      px: p5.pmouseX,
      py: p5.pmouseY
    }

    socket.emit('mouse', data);
    p5.strokeWeight(10);
    p5.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY);
  }

  return <Sketch setup={setup} draw={draw} mouseDragged={mouseDragged} />
}

export default Canvas;