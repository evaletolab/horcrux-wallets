<template>
<div class="container">
  <div ref="target" class="target"></div>
</div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { MouseEntropyEngine } from '@/lib/MouseEntropyEngine';

@Options({
  props: {
    msg: String
  }
})
export default class EntropyFromMouse extends Vue {

  entropyEngine: MouseEntropyEngine = new MouseEntropyEngine(256, this.onEntropyCollectionComplete); 

  get target(): HTMLElement{
    return this.$refs.target as HTMLElement;
  }

  mounted(){
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

  onEntropyCollectionComplete(binaryString:string){
    console.log("entropy collection complete", binaryString, binaryString.length);
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .target {
    width:256px;
    height: 256px;
    background-color: grey;
  }
</style>
