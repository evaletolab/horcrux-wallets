<template>
  <div class="about  container">
    <h1>Horcruxs are made with</h1>
    <ul>
      <li>Entropy</li>
      <li><a href="https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki">BIP39</a> Mnemonic</li>
      <li><a href="https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki">BIP39</a> Seed</li>
      <li><a href="https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki">BIP32</a> Root Key</li>
      <li><a href="https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki">BIP44</a> derivation path</li>
      <li>SSS (Shamir Shared Secret)</li>
      <li>Vault Solidity Smart Contract</li>
      <li>Source code with MIT on <a href="https://github.com/evaletolab/horcrux-wallets">github</a></li>
    </ul>
    <package-versions />
  </div>
</template>

<style lang="scss" scoped>
  .about{
    text-align: left;
  }
</style>


<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import PackageVersions from '@/components/PackageVersions.vue';

@Options({
  components: {
    PackageVersions
  }
})
export default class About extends Vue {

  mounted() {
    //
  }
}
</script>
