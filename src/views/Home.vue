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
        <div class="actions">
          <button class="button -button-outline">New identity</button>
        </div>
    </div>    

    <!-- BIP39 Seed -->
    <div class="form-group hide">
      <label for="seed" class="col-sm-2 control-label">BIP39 Seed</label>
      <div class="col-sm-10">
          <textarea v-model="seed" class="seed private-data form-control" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"></textarea>
      </div>
    </div>      

    <!-- Entropy from mouse component test -->
    <entropy-from-mouse v-on:complete="onEntropyCollected" :bitCount="256"/>
    
    <!-- BIP32 Root Key -->
    <div class="form-group hide">
      <label for="root-key" class="col-sm-2 control-label">BIP32 Root Key</label>
      <div class="col-sm-10">
          <textarea v-model="rootKey" class="root-key private-data form-control"  autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"></textarea>
      </div>
    </div>  

    <!-- Shamir Secret Sharing Scheme -->
    <div class="sharing">
      <div class="header">
          <h2>Store your Horcruxes/SSS</h2>
          <p>To increase the security of your identity, You can break it in 3 separate pieces (called Horcruxes).
            Your need at least two pieces to reconstitute your identity. 
            You decide where you want to store each Horcrux. We recomend you keep them in separate places/locations. 
            We provide a few alternatives:
            <ol>
              <li>Store them on printed paper.</li>
              <li>Use our Vault SmartContract a simple and secure space to store Horcruxes.</li>
              <li>Or use your private google cloud account.</li>
            </ol>
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
  .actions{
    text-align: right;
  }

  ol{
    list-style-type: decimal;
  }

  .sharing{
    margin-top: 50px;
    padding-top: 50px;
    border-top: 1px solid #eee;
    .header{

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
import EntropyFromMouse from '@/components/EntropyFromMouse.vue';
import { $wallet } from '../services';
import * as secret from 'secrets.js-34r7h';

@Options({
  components: {
    HelloWorld, EntropyFromMouse,
  },
})
export default class Home extends Vue {
  mnemonic = "";
  seed = "";
  rootKey = "";
  shares: secret.Shares = [];
  async mounted() {
    await $wallet.createEntropy();
    this.mnemonic = await $wallet.createMnemonic($wallet.entropy);
    this.seed = (await $wallet.getSeed(this.mnemonic));
    this.rootKey = await $wallet.createRootKey(this.seed);
    this.shares = await $wallet.createShamirSecretFromSeed();
  }

  get combineShares() {
    if(!this.shares.length) {
      return ''
    }
    // for (var i = 0, len = this.shares.length; i < len; i++){
    //   console.log('----',this.shares[i]);
    // }
    
    return secret.combine(this.shares);
  }

  onEntropyCollected(entropyBitStr: string){
    console.log("entropy collected", entropyBitStr);
  }
}
</script>
