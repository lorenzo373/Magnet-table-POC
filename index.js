/* global window, document, Math */
const STROKE_LENGTH = 100;

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

MagnetTable = {
  angle1: 0,
  angle2: 0,
};

setInterval(() => {
  // Clear canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Calculate positions
  const angle1 = MagnetTable.angle1 * Math.PI / 180;
  const angle2 = MagnetTable.angle2 * Math.PI / 180;
  const firstStrokeBegin = {
    x: canvas.width / 2,
    y: canvas.height / 2,
  };
  const firstStrokeEnd = {
    x: STROKE_LENGTH * Math.cos(angle1) + firstStrokeBegin.x,
    y: STROKE_LENGTH * Math.sin(angle1) + firstStrokeBegin.y,
  };
  const secondStrokeBegin = firstStrokeEnd;
  const secondStrokeEnd = {
    x: STROKE_LENGTH * Math.cos(angle2 + angle1) + secondStrokeBegin.x,
    y: STROKE_LENGTH * Math.sin(angle2 + angle1) + secondStrokeBegin.y,
  };

  // Draw first stroke
  context.strokeStyle = 'blue';
  context.beginPath();
  context.moveTo(firstStrokeBegin.x, firstStrokeBegin.y);
  context.lineTo(firstStrokeEnd.x, firstStrokeEnd.y);
  context.stroke();

  // Draw second stroke
  context.strokeStyle = 'red';
  context.beginPath();
  context.moveTo(secondStrokeBegin.x, secondStrokeBegin.y);
  context.lineTo(secondStrokeEnd.x, secondStrokeEnd.y);
  context.stroke();
}, 100);

window.MagnetTable = MagnetTable;
