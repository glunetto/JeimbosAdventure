
'use strict';

// resources
require('./index.scss');

// modules
const Bulma = require('./bulma.js');

// main events
window.addEventListener('DOMContentLoaded', Bulma.setupNavbar);

window.addEventListener('load', async function init() {
   const canvas_container = document.getElementById('canvas-container');

   Bulma.setupModals();

   new p5((p) => {

      p.preload = function () { }

      p.setup = function () {
         const size = +window.getComputedStyle(canvas_container).getPropertyValue('width').replace('px', '');
         p.createCanvas(size, size / 2);
         p.background(255);

         new ResizeObserver(() => {
            const size = +window.getComputedStyle(canvas_container).getPropertyValue('width').replace('px', '');
            p.resizeCanvas(size, size / 2);
         }).observe(canvas_container);
      }

      p.draw = function () {
         p.background(0);
      }

   }, canvas_container);
});
