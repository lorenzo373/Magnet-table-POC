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
  const firstStrokeBegin = {
    x: canvas.width / 2,
    y: canvas.height / 2,
  };
  const firstStrokeEnd = {
    x: STROKE_LENGTH * Math.cos(MagnetTable.angle1) + firstStrokeBegin.x,
    y: STROKE_LENGTH * Math.sin(MagnetTable.angle1) + firstStrokeBegin.y,
  };

  // Draw first stroke
  context.beginPath();
  context.moveTo(firstStrokeBegin.x, firstStrokeBegin.y);
  context.lineTo(firstStrokeEnd.x, firstStrokeEnd.y);
  context.stroke();

}, 100);

window.MagnetTable = MagnetTable;
