<template>
  <div class="qrscan">
    <video ref="video"></video>  
    <button @click.stop="toggle">{{started ? 'stop': 'start'}}</button>
  </div>    
</template>


<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import QrScanner from 'qr-scanner';

@Options({
  props: {
  },
  components: { }
})
export default class QrScan extends Vue {
  qrScanner!: QrScanner;

  started = false;

  mounted(){
    const options = {
      highlightScanRegion: true,
    };

    this.qrScanner = new QrScanner(this.$refs.video as HTMLVideoElement, (result:any) => {
      console.log('decoded qr code:', result);
      this.qrScanner.stop();
      this.started = false;
      this.$emit("decoded", {value: result.data});
    }, options);
  }

  toggle(){
    this.started = !this.started;
    if(this.started){
      this.qrScanner.start();
    }else{
      this.qrScanner.stop();
    }
  }

  onDestroy(){
    if(this.started){
      this.qrScanner.stop();
    }
  }

}
</script>

<style lang="scss" scoped>
  .qrscan{
    width: 100%;
    height: 100%;
  }
</style>
