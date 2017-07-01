const requestAnimationFrame = require('./request-animation-frame');

function init() {
  function initCanvas() {
    const ctx = document.getElementById('home-canvas').getContext('2d'),
          cW = window.innerWidth,
          cH = window.innerHeight,
          canvasBG = '#fefefe',
          color = {r: 25, g: 25, b: 255},
          minSize = 5,
          maxSize = 50,
          shapes = [];

    ctx.canvas.width = cW;
    ctx.canvas.height = cH;

    function drawCanvas() {
      ctx.clearRect(0, 0, cW, cH);
      ctx.fillStyle = canvasBG;
      ctx.fillRect(0, 0, cW, cH);
    }

    function randomSize(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function randomX() {
      return Math.floor(Math.random() * cW);
    }

    function randomY() {
      return Math.floor(Math.random() * cH);
    }

    function randomTime() {
      return Math.random() * 3 * 1000;
    }

    function showBG() {
      return Math.round(Math.random());
    }

    function randomShape() {
      let shape = {
        x: randomX(),
        y: randomY(),
        s: randomSize(minSize, maxSize),
        showBG: showBG(),
        o: 1,
      };

      shapes.push(shape);
    }

    function drawShapes() {
      for(let i = 0; i < shapes.length; i++) {
        if(shapes[i].showBG == true) {
          ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${shapes[i].o})`;
          ctx.fillRect(shapes[i].x, shapes[i].y, shapes[i].s, shapes[i].s);
        } else {
          ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${shapes[i].o})`;
          ctx.strokeRect(shapes[i].x, shapes[i].y, shapes[i].s, shapes[i].s);
        }
        shapes[i].o -= 0.02;
        if(shapes[i].o <= 0) { shapes.splice(i, 1); }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, cW, cH);
      drawShapes();
      requestAnimationFrame(animate);
    }

    drawCanvas();
    requestAnimationFrame(animate);

    (function loop() {
      let t = randomTime();
      setTimeout(() => {
        randomShape();
        loop();
      }, t);
    })();

  }

  $(window).on('load', initCanvas);
  $(window).on('resize', initCanvas);
}

module.exports = {
  init
};
