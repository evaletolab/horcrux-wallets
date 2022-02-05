<template>
  <div class="home container">
    <!-- Shamir Secret Sharing Scheme -->
    <div class="sharing">
      <div class="col-sm-11">
          <h2>Restore your Digital Identity </h2>
          <p>Your Horcrux are parts of your digital identity. 
            To restore your digital identity, you need atleast of two Horcrux.             
          </p>

      </div>
      <div class="horcrux" v-for="(horcrux,index) in horcruxs" :key="index">
        <div class="form-group">
          <textarea  class="phrase private-data " :placeholder="'Horcrux '+ index" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"></textarea>
        </div>    
        
        <div class="action"> 
          restore from 
          <a href="" class="store">print</a>
          <a href="" class="store">vault</a>
          <a href="" class="store">cloud</a>
        </div>
      </div>
      <div class="combine">
        {{combineShares}}
      </div>
      <!-- Mnemonic Language -->
      <form>
          <fieldset>
            <label for="">Restore BIP39 Mnemonic </label>      
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
      <div class="secret" >

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
  .horcrux,
  .secret{
    overflow-wrap: anywhere;
    text-align: left;
    margin: 10px 0;
    padding: 5px;
    .action{
      display: inline-block;
      border-left: 3px solid #ddd;
      padding-left: 5px;
      .store{
        margin: 0 3px;
        border-bottom: 1px dotted blue;
      }
    }
  }
  .secret {
    background: #eee;
    min-height: 100px;
  }
  .combine{
    overflow-wrap: anywhere;
    margin: 10px 0;
    padding: 5px;
  }

</style>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { $wallet } from '../services';
import * as secret from 'secrets.js-34r7h';

@Options({
  components: {
  },
})
export default class Recover extends Vue {
  mnemonic = "";
  entropy = "";
  shares: secret.Shares = [];
  horcruxs = [0,1,2];
  // async mounted() {
  // }

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
