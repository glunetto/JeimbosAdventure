
export default class Obstacle {

   p5_instance: any;
   x: number;

   w: number = Math.random() * 10;
   h: number = Math.random() * 100;

   constructor(p5_instance: any) {
      this.p5_instance = p5_instance;
      this.x = p5_instance.width;
   }

   get isOutOfScreen(): boolean { return this.x + this.w < 0; }
   get isHalfWayOut(): boolean { return this.x + this.w < this.p5_instance.width / 2; }

   draw(): void {
      this.p5_instance.push();
      this.p5_instance.fill(33);
      this.p5_instance.rect(this.x, this.p5_instance.height - this.h, this.w, this.h);
      this.p5_instance.pop();
   }

};