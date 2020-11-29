
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

      const ball = {

         c: 255, // colore
         r: 16,  // raggio (?)
         a: 0,   // accelerazione
         v: 0,   // velocità
         x: 0,   // x posizione
         y: 0,   // y posizione

         draw() {
            p.push();
            p.fill(this.c);
            p.ellipse(this.x, this.y, this.r, this.r);
            p.pop();

            if (this.y > p.height - this.r / 2) {
               this.y = p.height - this.r / 2;
               this.v = 0;
               this.a = 0;
               this.isJumping = false;
            }
            else {
               this.y += this.v;
               this.v += this.a;
            }
         },

         grow() {
            this.r *= 2;
            this.a = 1;
         },

         shrink() {
            this.r /= 2;
            this.a = 1;
         },

         jump() {
            if (!this.isJumping) {
               this.v = -25;
               this.a = 1;
            }

            this.isJumping = true;
         },

         reset(x, y) {
            this.isJumping = false;
            this.r = 16;
            this.x = x;
            this.y = y - this.r / 2;
         }

      };

      p.keyPressed = function () {
         if (p.keyCode === p.UP_ARROW) {
            ball.jump();
         }
         else if (p.keyCode === p.LEFT_ARROW) {
            ball.shrink();
         }
         else if (p.keyCode === p.RIGHT_ARROW) {
            ball.grow();
         }
      }

      p.preload = function () { }

      p.setup = function () {
         const size = +window.getComputedStyle(canvas_container).getPropertyValue('width').replace('px', '');
         p.createCanvas(size, size / 2);
         p.clear();
         ball.reset(size / 2, size / 2);

         new ResizeObserver(() => {
            const size = +window.getComputedStyle(canvas_container).getPropertyValue('width').replace('px', '');
            p.resizeCanvas(size, size / 2);
            ball.reset(size / 2, size / 2);
         }).observe(canvas_container);
      }

      p.draw = function () {
         //p.background(0);
         p.clear();
         ball.draw();
      }

   }, canvas_container);
});
