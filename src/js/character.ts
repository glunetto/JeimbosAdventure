
import Obstacle from './obstacle';

export interface CharacterOptions {
   character_name: string;
   idle_frames: number;
   jump_frames: number;
   dead_frames: number;
   run_frames: number;
   path: String;

};

export const enum STATE { IDLE, RUN, JUMP, DEAD };

export default abstract class Character {

   static assets_path: string = '../assets/spritesheet/';

   current_state: STATE = STATE.IDLE;
   current_frame: number = 0;

   p5_instance: any;

   sheet_idle: Array<any> = [];
   sheet_dead: Array<any> = [];
   sheet_jump: Array<any> = [];
   sheet_run: Array<any> = [];

   character_name: String;
   speed: number;

   private loadSheet(type: String, path: String, count: number): Array<any> {
      const sheet: Array<any> = [];
      for (let i = 0; i < count; ++i) {
         sheet.push(this.p5_instance.loadImage(`${Character.assets_path}${path}/${type} (${i + 1}).png`));
      }
      return sheet;
   }

   constructor(p5_instance: any, opt: CharacterOptions) {
      this.p5_instance = p5_instance;

      this.character_name = opt.character_name;
      this.speed = 30 / opt.run_frames;

      this.sheet_idle = this.loadSheet('Idle', opt.path, opt.idle_frames);
      this.sheet_dead = this.loadSheet('Dead', opt.path, opt.dead_frames);
      this.sheet_jump = this.loadSheet('Jump', opt.path, opt.jump_frames);
      this.sheet_run = this.loadSheet('Run', opt.path, opt.run_frames);
   }

   get isIdleing(): boolean { return this.current_state === STATE.IDLE; }
   get isJumping(): boolean { return this.current_state === STATE.JUMP; }
   get isRunning(): boolean { return this.current_state === STATE.RUN; }
   get isMoving(): boolean { return this.isRunning || this.isJumping; }
   get isDead(): boolean { return this.current_state === STATE.DEAD; }

   collides(obstacle: Obstacle): boolean {
      const [img, y_mod]: [any, number] = this.computeCurrentFrameInfo();

      const x: number = (this.p5_instance.width - img.width / 2) / 2;
      const w: number = img.width / 2;

      return x < obstacle.x + obstacle.w && obstacle.x < x + w && y_mod < obstacle.h;
   }

   die(): void {
      this.current_state = STATE.DEAD;
      this.current_frame = 0;
   }

   idle(): void {
      this.current_state = STATE.IDLE;
      this.current_frame = 0;
   }

   jump(): void {
      this.current_state = STATE.JUMP;
      this.current_frame = 0;
   }

   run(): void {
      this.current_state = STATE.RUN;
      this.current_frame = 0;
   }

   animate(): void {
      if (this.p5_instance.frameCount % 3) {
         return;
      }
      ++this.current_frame;

      if (this.isJumping && this.current_frame === this.sheet_jump.length) {
         this.run();
      }
   }

   private computeCurrentFrameInfo(): [any, number] {
      let y_mod: number = 0;
      let img: any;

      switch (this.current_state) {
         case STATE.RUN:
            img = this.sheet_run[this.current_frame %= this.sheet_run.length];
            break;
         case STATE.JUMP:
            img = this.sheet_jump[this.current_frame %= this.sheet_jump.length];
            const b = 2 * this.p5_instance.height / this.sheet_jump.length;
            const a = - b / this.sheet_jump.length;
            y_mod = a * this.current_frame ** 2 + b * this.current_frame;
            break;
         case STATE.DEAD:
            img = this.sheet_dead[this.current_frame < this.sheet_dead.length ? this.current_frame : this.sheet_dead.length - 1];
            break;
         case STATE.IDLE:
         default:
            img = this.sheet_idle[this.current_frame %= this.sheet_idle.length];
            break;
      }

      return [img, y_mod];
   }

   draw(): void {
      this.animate();

      const [img, y_mod] = this.computeCurrentFrameInfo();
      const x = (this.p5_instance.width - img.width / 2) / 2;
      const y = this.p5_instance.height - img.height / 2 - y_mod;
      const h = img.height / 2;
      const w = img.width / 2;

      this.p5_instance.push();
      this.p5_instance.image(img, x, y, w, h);
      this.p5_instance.pop();
   }
}
