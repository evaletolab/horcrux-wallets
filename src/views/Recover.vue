<template>
  <div class="recover container">
    <!-- Shamir Secret Sharing Scheme -->
    <div class="sharing">
      <div class="col-sm-11">
          <h2>Restore your Digital Identity </h2>
          <p>Your Horcruxes are parts of your digital identity. 
            To restore it you need atleast two of them.
          </p>

      </div>
      <div class="horcrux media-display" v-for="(index) in [0,1]" :key="index">
        <div class="form-group">
          <textarea v-model="horcruxs[index]" class="phrase private-data " :placeholder="'Horcrux '+ index" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"></textarea>
        </div>    
        
        <div class="action"> 
          restore from 
          <a class="store" @click="onOpenDrawer(index,'print')">print</a>
          <a class="store" @click="onOpenDrawer(index,'vault')">vault</a>
        </div>
      </div>
      <!-- Mnemonic Language -->
      <form class="hide media-display">
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
      <div class="secret" :class="{hide:!mnemonic}">
        {{mnemonic}}
      </div>
      <div class="error" :class="{hide:!error.length}">
        {{error}}
      </div>

    </div>

    <drawer :open="drawer.print" :displayClose="true" @close="onCloseDrawer('print')">
      <h2>scan qrcode</h2>
      <qr-scan v-on:decoded="onQrScanDecoded"/>
    </drawer>

    <drawer :open="drawer.vault" :displayClose="true" @close="onCloseDrawer('vault')">
      <restore-vault @value="onHorcrux"  />
    </drawer>

  
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
    padding: 15px 5px;
    textarea {
      font-size: 19px;
      resize: none;
    }
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
      font-size: 19px;
      height: 120px;
  }
  .error {
    background: #ffdbdb;
    min-height: 60px;
    font-size: 19px;
    height: 70px;
    text-align: center;
    padding: 20px;
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
import Drawer from '@/components/Drawer.vue';
import QrScan from '@/components/QrScan.vue';
import RestoreVault from '@/components/RestoreVault.vue';

@Options({
  components: {
    Drawer, QrScan, RestoreVault
  },
})
export default class Recover extends Vue {
  horcruxs:any = [null,null];
  currentIndex = -1;
  error = "";

  drawer: any = {
    vault: false,
    print: false
  }

  get entropy() {    
    try{
      if(!this.horcruxs.length || !this.horcruxs[0] || !this.horcruxs[1]) {
        return ''
      }
      this.error = "";


      return secret.combine(this.horcruxs as secret.Shares);
    }catch(err: any){
      this.error = err.message;
    }
    return "";
  }

  get mnemonic() {
    if(!this.entropy.length){
      return "";
    }
    console.log('----DB entropy',this.entropy);
    const entropy = ethers.utils.arrayify('0x'+this.entropy);
    return $wallet.createMnemonic(entropy, 16);
  }

  onOpenDrawer(index: number,destination:string){
    this.currentIndex = index;
    this.drawer[destination]=true;
  }

  onCloseDrawer(destination:string) {
    this.drawer[destination] = false;
  }  

  onHorcrux($event:{value:string}) {
    this.horcruxs[this.currentIndex] = $event.value;
  }


  onQrScanDecoded(result:{value:string}){
    // console.log("got qrscan", result.value);
    this.horcruxs[this.currentIndex] = result.value;
    this.drawer.print = false;
  }

}
</script>
