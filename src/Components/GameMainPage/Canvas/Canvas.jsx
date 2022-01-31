import React from 'react';
import Sketch from 'react-p5';

const Canvas = (props) => {

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(500, 500).parent(canvasParentRef);
    p5.background(173, 151, 205);
  }

  const draw = (p5) => {
    if (p5.mouseIsPressed) {
      p5.strokeWeight(10);
      p5.stroke('red');
      p5.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY);
    }
  }
  return <Sketch setup={setup} draw={draw} />
}

export default Canvas;