<template>
  <div class="home">

    <!-- Mnemonic Language -->
    <div class="form-group">
      <label class="col-sm-2 control-label">Mnemonic Language</label>
      <div class="col-sm-10 languages">
          <div class="form-control no-border">
              <a href="#english">English</a>
              <a href="#japanese" title="Japanese">日本語</a>
              <a href="#spanish"  title="Spanish">Español</a>
              <a href="#chinese_simplified"  title="Chinese (Simplified)">中文(简体)</a>
              <a href="#chinese_traditional"  title="Chinese (Traditional)">中文(繁體)</a>
              <a href="#french"  title="French">Français</a>
              <a href="#italian"  title="Italian">Italiano</a>
              <a href="#korean"  title="Korean">한국어</a>
              <a href="#czech" title="Czech">Čeština</a>
              <a href="#portuguese" title="Portuguese">Português</a>
          </div>
      </div>
    </div>  

    <!-- BIP39 Mnemonic -->
    <div class="form-group">
        <label for="phrase" class="col-sm-2 control-label">BIP39 Mnemonic</label>
        <div class="col-sm-10">
            <textarea v-model="mnemonic" class="phrase private-data form-control" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">              
            </textarea>
        </div>
    </div>    

    <!-- BIP39 Seed -->
    <div class="form-group">
      <label for="seed" class="col-sm-2 control-label">BIP39 Seed</label>
      <div class="col-sm-10">
          <textarea v-model="seed" class="seed private-data form-control" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"></textarea>
      </div>
    </div>      

    <!-- BIP32 Root Key -->
    <div class="form-group">
      <label for="root-key" class="col-sm-2 control-label">BIP32 Root Key</label>
      <div class="col-sm-10">
          <textarea v-model="rootKey" class="root-key private-data form-control"  autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"></textarea>
      </div>
    </div>  

    <!-- Shamir Secret Sharing Scheme -->
    <div class="sharing">
      <div class="col-sm-12">
          <h1>Shamir Secret Sharing Scheme</h1>
          <p>Require 2 parts from 3 to reconstruct the secret</p>
      </div>
      <ol class="generated">
        <li class="part">part 1, stored on username/password => smartcontract </li>
        <li class="part">part 2, stored on paper</li>
        <li class="part">part 3, stored on device (add new device feature)</li>
      </ol>
    </div>
  
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import { $wallet } from '../services';

@Options({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  mnemonic = "";
  seed = "";
  rootKey = "";
  async mounted() {
    this.mnemonic = await $wallet.createMnemonic();
    this.seed = (await $wallet.createSeed(this.mnemonic)).toString('hex');
    this.rootKey = await $wallet.createRootKey(this.seed);
  }
}
</script>
