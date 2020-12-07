
'use strict';

// resources
require('../assets/scss/index.scss');

// modules
import Bulma from './bulma/bulma';
import GameEngine from './js/game-engine';

// type definitions
declare const ResizeObserver: any;
declare const p5: any;

// main events
(() => {
   Bulma.setupNavbar();
   Bulma.setupModals();
})();

window.addEventListener('load', async function init() {
   const canvas_container: HTMLDivElement = document.getElementById('canvas-container')! as HTMLDivElement;

   new p5((p: any) => {

      const engine = new GameEngine(p);

      const bg_overlap: number = 5;

      let dynamic_background: any;
      let static_background: any;
      let x: number = 0;

      p.keyPressed = function () {
         engine.keyPressed();
      }

      p.preload = function () {
         dynamic_background = p.loadImage('../assets/img/dynamic-bg.jpg');
         static_background = p.loadImage('../assets/img/static-bg.jpg');
      }

      p.setup = function () {
         const size = +window.getComputedStyle(canvas_container).getPropertyValue('width').replace('px', '');
         p.createCanvas(size, size / 2);

         new ResizeObserver(() => {
            const size = +window.getComputedStyle(canvas_container).getPropertyValue('width').replace('px', '');
            p.resizeCanvas(size, size / 2);
         }).observe(canvas_container);
      }

      p.draw = function () {
         p.clear();

         if (!engine.isPlaying) {
            p.image(static_background, 0, 0, p.width, p.height);
         }
         else {
            p.image(dynamic_background, x - dynamic_background.width + bg_overlap, 0, dynamic_background.width, p.height);
            p.image(dynamic_background, x, 0, dynamic_background.width, p.height);
            p.image(dynamic_background, x + dynamic_background.width - bg_overlap, 0, dynamic_background.width, p.height);
            if (engine.isMoving) {
               x -= engine.speed;
               if (--x < p.width - 2 * dynamic_background.width + bg_overlap) {
                  x = p.width - dynamic_background.width - bg_overlap;
               }
            }
         }

         engine.draw();
      }

   }, canvas_container);
});

//*/
