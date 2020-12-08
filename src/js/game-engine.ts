
import Obstacle from './obstacle';

import Character from './character';
import Robot from './robot';
import Girl from './girl';
import Boy from './boy';

export const enum SECTION { CHARACTER_SELECTION, LEVEL, GAME_OVER };

export default class GameEngine {

   section: SECTION = SECTION.CHARACTER_SELECTION;

   p5_instance: any;

   characters: Array<Character> = [];
   current_character: number = 0;

   obstacles: Array<Obstacle> = [];

   constructor(p5_instance: any) {
      this.p5_instance = p5_instance;

      this.characters = [new Boy(this.p5_instance), new Girl(this.p5_instance), new Robot(this.p5_instance)];
   }

   get isPlaying(): boolean { return this.section === SECTION.LEVEL || this.section == SECTION.GAME_OVER; }

   get isMoving(): boolean { return this.characters[this.current_character].isMoving; }

   get speed(): number { return this.characters[this.current_character].speed; }

   private keyPressed_characterSelection(): void {
      switch (this.p5_instance.keyCode) {
         case 32:
            this.section = SECTION.LEVEL;
            this.characters[this.current_character].run();
            break;
         case this.p5_instance.RIGHT_ARROW:
            ++this.current_character;
            this.current_character %= this.characters.length;
            this.characters[this.current_character].idle();
            break;
         case this.p5_instance.LEFT_ARROW:
            if (--this.current_character < 0) {
               this.current_character = this.characters.length - 1;
            }
            this.characters[this.current_character].idle();
            break;
         default:
            break;
      }
   }

   private keyPressed_level(): void {
      switch (this.p5_instance.keyCode) {
         case 32:
            this.section = SECTION.CHARACTER_SELECTION;
            this.characters[this.current_character].idle();
            break;
         case this.p5_instance.UP_ARROW:
            this.characters[this.current_character].jump();
            break;
         default:
            break;
      }
   }

   private ketPressed_gameOver(): void {
      if (this.p5_instance.keyCode == 32) {
         this.section = SECTION.CHARACTER_SELECTION;
         this.characters[this.current_character].idle();
      }
   }

   keyPressed(): void {
      switch (this.section) {
         case SECTION.CHARACTER_SELECTION:
            this.keyPressed_characterSelection();
            break;
         case SECTION.LEVEL:
            this.keyPressed_level();
            break;
         case SECTION.GAME_OVER:
            this.ketPressed_gameOver();
            break;
      }
   }

   draw(): void {
      if (!this.obstacles.length || this.obstacles[this.obstacles.length - 1].isHalfWayOut) {
         this.obstacles.push(new Obstacle(this.p5_instance));
      }

      for (let i = this.obstacles.length - 1; i >= 0; --i) {
         if (this.obstacles[i].isOutOfScreen) {
            this.obstacles.splice(i, 1);
            continue;
         }

         if (this.isMoving) {
            this.obstacles[i].x -= this.speed;
         }
         this.obstacles[i].draw();

         if (this.characters[this.current_character].collides(this.obstacles[i])) {
            this.characters[this.current_character].die();
            this.section = SECTION.GAME_OVER;
            this.obstacles = [];
            break;
         }
      }

      this.characters[this.current_character].draw();
   }

}
