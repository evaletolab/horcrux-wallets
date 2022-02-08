<template>
<div class="container">
  <progress :value="progress"></progress>
</div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { MouseEntropyEngine } from '@/lib/MouseEntropyEngine';

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

  mounted(){
    this.entropyEngine = new MouseEntropyEngine(
      this.bitCount, 
      this.onEntropyCollectionComplete.bind(this), 
      this.onEntropyCollectionProgress.bind(this)
    ); 

    document.body.addEventListener('mousemove', this.mouseMoveHandler);
  }

  onDestroy(){
    document.body.removeEventListener('mousemove', this.mouseMoveHandler);
  }

  mouseMoveHandler(e: MouseEvent){
    const x = e.clientX; 
    const y = e.clientY; 
    this.entropyEngine.handleMouseMove(x, y);
  }

  onEntropyCollectionComplete(binaryString: string){
    this.$emit("complete", {entropyBitStr: binaryString});
  }

  onEntropyCollectionProgress(progress: number){
    this.progress = progress;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
