/* global window, document, Math */
const STROKE_LENGTH = 100;
const PATTERN_CLEAR = { angle1: 1, angle2: 1 / 180 };

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const resultCanvas = document.getElementById('result-canvas');
const resultContext = resultCanvas.getContext('2d');

MagnetTable = {
  angle1: 0,
  angle2: 0.1,
};

setInterval(() => {
  // Clear canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Normalize angle
  MagnetTable.angle1 = MagnetTable.angle1 % 360;
  MagnetTable.angle2 = MagnetTable.angle2 % 360;

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

  // Draw angles
  context.font = '16px Roboto';
  context.fillText(`angle 1: ${MagnetTable.angle1}`, 10, 26);
  context.fillText(`angle 2: ${MagnetTable.angle2}`, 10, 52);

  // Draw first stroke
  context.strokeStyle = 'blue';
  context.beginPath();
  context.moveTo(firstStrokeBegin.x, firstStrokeBegin.y);
  context.lineTo(firstStrokeEnd.x, firstStrokeEnd.y);
  context.stroke();

  // Draw second stroke
  context.strokeStyle = 'darkblue';
  context.beginPath();
  context.moveTo(secondStrokeBegin.x, secondStrokeBegin.y);
  context.lineTo(secondStrokeEnd.x, secondStrokeEnd.y);
  context.stroke();

  // Draw result
  resultContext.fillStyle = 'red';
  resultContext.fillRect(secondStrokeEnd.x - 1, secondStrokeEnd.y - 1, 2, 2);

  // Draw pattern
  MagnetTable.angle1 += PATTERN_CLEAR.angle1;
  MagnetTable.angle2 += PATTERN_CLEAR.angle2;
}, 1);

window.MagnetTable = MagnetTable;
