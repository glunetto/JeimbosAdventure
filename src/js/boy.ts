
import Character from "./character";

export default class Boy extends Character {

   constructor(p5_instance: any) {
      super(p5_instance, {
         character_name: 'boy',
         idle_frames: 15,
         dead_frames: 15,
         jump_frames: 15,
         run_frames: 15,
         path: 'boy',
      });
   }

}
