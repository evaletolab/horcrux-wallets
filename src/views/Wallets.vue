<template>
  <div class="wallets container">
    <div class="sharing">
      <div class="col-sm-11">
          <h2>BIP32 Wallets</h2>
          <p>BIP32 Root Key and derivation path
          </p>
      </div>
    </div>
  
  </div>
</template>
<style scoped lang="scss">
  .hide {
    display: none;
  }
  .languages {
    a{
      padding: 0 5px;
    }
  }

</style>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { $wallet } from '../services';

@Options({
  components: {
  },
})
export default class Wallets extends Vue {
  // async mounted() {
  // }

}
</script>
