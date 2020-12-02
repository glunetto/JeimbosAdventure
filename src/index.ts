
'use strict';

// resources
require('../assets/scss/index.scss');

// modules
import Bulma from './bulma/bulma';

import Character from './js/character';
import Robot from './js/robot';
import Girl from './js/girl';
import Boy from './js/boy';

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

      const bg_overlap: number = 5;

      const characters: Array<Character> = [new Boy(p), new Girl(p), new Robot(p)];
      let current_character: number = 0;

      let dynamic_background: any;
      let static_background: any;

      let playing: boolean = false;
      let x: number = 0;

      p.keyPressed = function () {
         switch (p.keyCode) {
            case p.RIGHT_ARROW:
               characters[current_character].run();
               playing = true;
               break;
            case p.LEFT_ARROW:
               x = 0;
               playing = false;
               ++current_character;
               current_character %= characters.length;
               characters[current_character].idle();
               break;
            case p.DOWN_ARROW:
               characters[current_character].idle();
               break;
            default:
               break;
         }
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

         if (!playing) {
            p.image(static_background, x, 0, p.width, p.height);
         }
         else {
            p.image(dynamic_background, x - dynamic_background.width + bg_overlap, 0, dynamic_background.width, p.height);
            p.image(dynamic_background, x, 0, dynamic_background.width, p.height);
            p.image(dynamic_background, x + dynamic_background.width - bg_overlap, 0, dynamic_background.width, p.height);
            if (characters[current_character].isRunning) {
               x -= characters[current_character].speed;
               if (--x < p.width - 2 * dynamic_background.width + bg_overlap) {
                  x = p.width - dynamic_background.width - bg_overlap;
               }
            }
         }

         characters[current_character].draw();
      }

   }, canvas_container);
});

//*/
