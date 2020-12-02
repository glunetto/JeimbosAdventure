
import Character from "./character";

export default class Girl extends Character {

   constructor(p5_instance: any) {
      super(p5_instance, {
         character_name: 'girl',
         idle_frames: 16,
         run_frames: 20,
         path: 'girl',
      });
   }

}
