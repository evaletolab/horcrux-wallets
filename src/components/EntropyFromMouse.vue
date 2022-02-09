<template>
 <div>
   <progress :value="progress"></progress>
   <span><slot/></span>
 </div>
  
  
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { I_MouseEntropyResult, MouseEntropyEngine } from '@/lib/MouseEntropyEngine';

@Options({
  props: {
    bitCount: {
      default: 256,
      type: Number
    },
  }
})
export default class EntropyFromMouse extends Vue {

  // props
  bitCount!:number;

  entropyEngine!: MouseEntropyEngine;
  progress = 0;


  start() {
    document.body.addEventListener('mousemove', this.mouseMoveHandler);
    this.entropyEngine = new MouseEntropyEngine(
      this.bitCount, 
      this.onEntropyCollectionComplete.bind(this), 
      this.onEntropyCollectionProgress.bind(this)
    ); 
  }

  mouseMoveHandler(e: MouseEvent){
    const x = e.clientX; 
    const y = e.clientY; 
    this.entropyEngine.handleMouseMove(x, y);
  }

  onEntropyCollectionComplete(mouseEntropyResult: I_MouseEntropyResult){
    document.body.removeEventListener('mousemove', this.mouseMoveHandler);
    this.$emit("complete", mouseEntropyResult);
    this.progress = 0;
  }

  onEntropyCollectionProgress(progress: number){
    if(!this.progress) {
      this.$emit("start");      
    }
    this.progress = progress;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
