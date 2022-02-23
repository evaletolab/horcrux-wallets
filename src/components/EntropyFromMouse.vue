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
    document.body.addEventListener('touchmove', this.mouseMoveHandler);
    this.entropyEngine = new MouseEntropyEngine(
      this.bitCount, 
      this.onEntropyCollectionComplete.bind(this), 
      this.onEntropyCollectionProgress.bind(this)
    ); 

    document.body.classList.add('body-lock');
    this.$emit("start");      
  }

  mouseMoveHandler(e: MouseEvent|TouchEvent){
    const x = (e instanceof MouseEvent)? e.clientX : e.touches[0].clientX;
    const y = (e instanceof MouseEvent)? e.clientY : e.touches[0].clientY;
    this.entropyEngine.handleMouseMove(x, y);
  }

  onEntropyCollectionComplete(mouseEntropyResult: I_MouseEntropyResult){
    document.body.removeEventListener('mousemove', this.mouseMoveHandler);
    this.$emit("complete", mouseEntropyResult);
    this.progress = 0;
    document.body.classList.remove('body-lock');
  }

  onEntropyCollectionProgress(progress: number){
    this.progress = progress;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
