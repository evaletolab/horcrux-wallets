<template>
  <div class="recover container">
    <!-- Shamir Secret Sharing Scheme -->
    <div class="sharing">
      <div class="col-sm-11">
          <h2>Restore your Digital Identity </h2>
          <p>Your Horcrux are parts of your digital identity. 
            To restore it you need atleast two Horcruxs.
          </p>

      </div>
      <div class="horcrux" v-for="(index) in [0,1]" :key="index">
        <div class="form-group">
          <textarea v-model="horcruxs[index]" class="phrase private-data " :placeholder="'Horcrux '+ index" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"></textarea>
        </div>    
        
        <div class="action"> 
          restore from 
          <a href="" class="store">print</a>
          <a href="" class="store">vault</a>
          <a href="" class="store">cloud</a>
        </div>
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
        {{mnemonic}}
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
    min-height: 60px;
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
import { ethers } from 'ethers';

@Options({
  components: {
  },
})
export default class Recover extends Vue {
  horcruxs:any = [null,null];
  // async mounted() {
  // }

  get entropy() {    
    if(!this.horcruxs.length || !this.horcruxs[0] || !this.horcruxs[1]) {
      return ''
    }

    return secret.combine(this.horcruxs as secret.Shares);
  }

  get mnemonic() {
    if(!this.entropy.length){
      return "";
    }
    const entropy = ethers.utils.arrayify('0x'+this.entropy);
    return $wallet.createMnemonic(entropy);
  }
}
</script>
