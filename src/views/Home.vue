<template>
  <div class="home container">

    <!-- Digital identity -->
    <div class="">
        <h2>Protect your Digital Identity </h2>
        <p>Learn to protect your digital identity</p>
    </div>

    <!-- Mnemonic Language -->
    <form>
        <fieldset>
          <label for="">BIP39 Mnemonic </label>      
          <div class="languages">
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
        </fieldset>
    </form>  

    <!-- BIP39 Mnemonic -->
    <div class="form-group">
        <div class="col-sm-10">
            <textarea v-model="mnemonic" class="phrase private-data form-control" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">              
            </textarea>
        </div>
    </div>    

    <!-- BIP39 Seed -->
    <div class="form-group hide">
      <label for="seed" class="col-sm-2 control-label">BIP39 Seed</label>
      <div class="col-sm-10">
          <textarea v-model="seed" class="seed private-data form-control" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"></textarea>
      </div>
    </div>      

    <!-- BIP32 Root Key -->
    <div class="form-group hide">
      <label for="root-key" class="col-sm-2 control-label">BIP32 Root Key</label>
      <div class="col-sm-10">
          <textarea v-model="rootKey" class="root-key private-data form-control"  autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"></textarea>
      </div>
    </div>  

    <!-- Shamir Secret Sharing Scheme -->
    <div class="sharing">
      <div class="col-sm-11">
          <h1>Store your Horcruxs/SSS</h1>
          <p>Your Horcrux are parts of SSS (Shamir Shared Secret) derived from your secret mnemonic. 
            You can decide where you want to store each Horcrux. 
            We provide some solutions for you. 
            1) Store them in a secure place as a printed paper, 
            2) Use our Vault SmartContract a simple and secure space where Horcrux are stored, 
            3) Or use your private google cloud account. 
          </p>

      </div>
      <div class="secret" v-for="(share,index) in shares" :key="index">
        {{share}} 
        <div class="action">
          <a href="" class="store">print</a>
          <a href="" class="store">vault</a>
          <a href="" class="store">cloud</a>
        </div>
      </div>
      <div class="combine">
        {{combineShares}}
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
  .secret{
    overflow-wrap: anywhere;
    text-align: left;
    margin: 10px 0;
    background: #eee;
    padding: 5px;
    .action{
      display: inline-block;
      border-left: 3px solid #ddd;
      .store{
        margin: 0 3px;
        border-bottom: 1px dotted blue;
      }
    }
  }
  .combine{
    overflow-wrap: anywhere;
    margin: 10px 0;
    padding: 5px;
  }

</style>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import { $wallet } from '../services';
import * as secret from 'secrets.js-34r7h';

@Options({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  mnemonic = "";
  seed = "";
  rootKey = "";
  shares: secret.Shares = [];
  async mounted() {
    this.mnemonic = await $wallet.createMnemonic();
    this.seed = (await $wallet.getSeed(this.mnemonic));
    this.rootKey = await $wallet.createRootKey(this.seed);
    this.shares = await $wallet.createShamirSecretFromSeed(this.seed);
    console.log('-->',secret.extractShareComponents(this.shares[0]))
  }

  get combineShares() {
    if(!this.shares.length) {
      return ''
    }
    for (var i = 0, len = this.shares.length; i < len; i++){
      console.log('----',this.shares[i]);
    }
    
    return secret.combine(this.shares);
  }
}
</script>
