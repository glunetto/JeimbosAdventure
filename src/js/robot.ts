
import Character from "./character";

export default class Robot extends Character {

   constructor(p5_instance: any) {
      super(p5_instance, {
         character_name: 'robot',
         jump_frames: 10,
         dead_frames: 10,
         idle_frames: 9,
         run_frames: 8,
         path: 'robot',
      });
   }

}
