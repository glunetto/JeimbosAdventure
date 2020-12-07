
interface CharacterOptions {

   character_name: string;
   idle_frames: number;
   jump_frames: number;
   run_frames: number;
   path: String;

};

const enum STATE { IDLE, RUN, JUMP };


export default abstract class Character {

   static assets_path: string = '../assets/spritesheet/';

   current_state: STATE = STATE.IDLE;
   current_frame: number = 0;

   p5_instance: any;

   sheet_idle: Array<any> = [];
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
      this.sheet_jump = this.loadSheet('Jump', opt.path, opt.jump_frames);
      this.sheet_run = this.loadSheet('Run', opt.path, opt.run_frames);
   }

   get isIdleing(): boolean { return this.current_state === STATE.IDLE; }
   get isJumping(): boolean { return this.current_state === STATE.JUMP; }
   get isRunning(): boolean { return this.current_state === STATE.RUN; }
   get isMoving(): boolean { return this.isRunning || this.isJumping; }

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

      if (this.current_state === STATE.JUMP && this.current_frame === this.sheet_jump.length) {
         this.run();
      }
   }

   draw(): void {
      this.animate();

      let y_mod = 0;
      let img;
      switch (this.current_state) {
         case STATE.RUN:
            img = this.sheet_run[this.current_frame % this.sheet_run.length];
            break;
         case STATE.JUMP:
            img = this.sheet_jump[this.current_frame % this.sheet_jump.length];
            const b = 2 * this.p5_instance.height / this.sheet_jump.length;
            const a = - b / this.sheet_jump.length;
            y_mod = a * this.current_frame**2 + b * this.current_frame;
            break;
         case STATE.IDLE:
         default:
            img = this.sheet_idle[this.current_frame % this.sheet_idle.length];
            break;
      }

      const x = (this.p5_instance.width - img.width / 2) / 2;
      const y = this.p5_instance.height - img.height / 2 - y_mod;
      const w = img.width / 2;
      const h = img.height / 2;

      this.p5_instance.push();
      this.p5_instance.image(img, x, y, w, h);
      this.p5_instance.pop();
   }
}
