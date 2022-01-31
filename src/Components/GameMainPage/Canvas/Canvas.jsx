import React, {useState} from 'react';
import Sketch from 'react-p5';
import { io } from 'socket.io-client';

const Canvas = (props) => {

  const [turn, setTurn] = useState('test');

  const socket = io.connect('http://127.0.0.1:8080');

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(500, 500).parent(canvasParentRef);
    p5.background(220);

    socket.on('mouse', data => {
      p5.fill('black');
      p5.ellipse(data.x, data.y, 15, 15);
    })
  }

  const draw = (p5) => {
  }

  const mouseDragged = (p5) => {
    var data = {
      x: p5.mouseX,
      y: p5.mouseY
    }

    socket.emit('mouse', data);
    p5.ellipse(p5.mouseX, p5.mouseY, 15, 15);
  }

  const mouseReleased = p5 => {
    setTurn('ligma');
  }

  return <Sketch setup={setup} draw={draw} mouseDragged={mouseDragged} />
}

export default Canvas;