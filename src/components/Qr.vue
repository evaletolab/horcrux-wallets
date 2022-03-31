<template>
    <canvas ref="canvas"></canvas>    
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import QRCode from 'qrcode';

@Options({
  props: {
    message: {
      type: String
    },
  }
})
export default class Qr extends Vue {

  message!: string;

  mounted() {
    QRCode.toCanvas(this.$refs.canvas, this.message, function (error:any) {
      if (error) console.error(error);
    });
  }
}
</script>