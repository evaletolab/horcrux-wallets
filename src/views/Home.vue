<template>
  <div class="home container">

    <!-- Digital identity -->
    <div class="">
        <h2>Protect your Digital Identity</h2>
        <p>
          Digital identity is a new reality, it appears complex or wird because we have no practice on that subject.
          The goal of this application is to provide a few solutions to protect your identiy without the needs of a trusted thirdparties.
        </p>
    </div>

    <!-- Mnemonic Language -->
    <form class="media-display">
        <fieldset>
          <label for="">The BIP39 Mnemonic standard </label>      
        <p>
          Mnemonic phrase constitutes all the necessary information required to recover your wallets 
          and «digital states» if your device is stolen or gets damaged. 
          In such instances, you can recover your wallets by keying in the mnemonic 
          phrase words on all wallets software that use standardised BIP39.
        </p>
          <div class="languages hide">
                  <a @click="onI18n('en')" href="#english">English</a>
                  <a @click="onI18n('jp')" href="#japanese" title="Japanese">日本語</a>
                  <a @click="onI18n('es')" href="#spanish"  title="Spanish">Español</a>
                  <a @click="onI18n('fr')" href="#chinese_simplified"  title="Chinese (Simplified)">中文(简体)</a>
                  <a @click="onI18n('fr')" href="#chinese_traditional"  title="Chinese (Traditional)">中文(繁體)</a>
                  <a @click="onI18n('fr')" href="#french"  title="French">Français</a>
                  <a @click="onI18n('it')" href="#italian"  title="Italian">Italiano</a>
                  <a @click="onI18n('ko')" href="#korean"  title="Korean">한국어</a>
                  <a @click="onI18n('cz')" href="#czech" title="Czech">Čeština</a>
                  <a @click="onI18n('po')" href="#portuguese" title="Portuguese">Português</a>
          </div>
        </fieldset>
    </form>  

    <!-- BIP39 Mnemonic -->
    <div class="mnemonic">        
        <textarea ref="textarea" @focus="onFocus" v-model="mnemonic" class="phrase private-data " autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">              
        </textarea>
        <qr class="qrcode" :message="mnemonic" v-if="seed" />

        <div class="media-display actions">
          <select  @change="onChange($event)">
            <option v-for="(option,value) in mnemonicLength" :selected="option.selected" :value="value" :key="value">{{option.label}}</option>
          </select>
          <button class="button button-outline" :disabled="isInvalidMnemonic" @click="onRetrieve">HORCRUXES</button>

          <button class="button button-outline" @click="onStart">
            <span class="initial" :class="{ hide : entropyStart }">Generate</span>
            <!-- Entropy from mouse component test -->
            <entropy-from-mouse 
              ref="entropyGen" 
              :disabled="!isInvalidMnemonic" 
              :class="{ hide : !entropyStart }" 
              :bitCount="0xFF"
              v-on:start="onEntropyStart" 
              v-on:complete="onEntropyCollected" 
              >
              Move the cursor!
            </entropy-from-mouse>

          </button>

        </div>
        <div class="media-display monero hide">
          <input type="checkbox" id="monero" @change="()=> monero = !monero">
          <label class="label-inline" for="monero">Display Monero Mnemonic</label>
          <textarea  v-model="moneroMnemonic" class="phrase private-data " :class="{hide:!monero}" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">              
          </textarea>
          <qr class="qrcode" :message="mnemonic" v-if="seed" />
        </div>

    </div>    

    <!-- BIP39 Seed -->
    <div class="form-group hide">
      <label for="seed" class="col-sm-2 control-label">BIP39 Seed</label>
      <div class="col-sm-10">
          <textarea v-model="seed" class="seed private-data " autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"></textarea>
      </div>
    </div>      
    
    <!-- BIP32 Root Key -->
    <div class="form-group hide">
      <label for="root-key" class="col-sm-2 control-label">BIP32 Root Key</label>
      <div class="col-sm-10">
          <textarea v-model="rootKey" class="root-key private-data "  autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"></textarea>
      </div>
    </div>  

    <!-- Shamir Secret Sharing Scheme -->
    <div class="sharing" :class="{hide:(!shares.length)}">
      <div class="header">
          <h2>Use Horcruxes/SSS to recover your identity</h2>
          <p>To increase the security of your identity, You can break the Menominc phrase in 3 separate pieces (called Horcruxes).
            Your need at <b>least two pieces</b> to reconstitute your identity. 
            You decide where you want to store each Horcrux. We recomend you keep them in separate places/locations. 
            We provide a few alternatives all independant of trusted thirdparties:
            <ul>
              <li>Store them on printed paper.</li>
              <li>Use our Vault SmartContract a digital and secure space to store Horcruxes.</li>
              <li>Or store them on digital pipcture with our Steganography solution.</li>
            </ul>
          </p>

      </div>
      <div class="secret" v-for="(share,index) in shares" :key="index">
        {{share}} 
        <div class="action">
          <a  class="store" @click="onHorcrux(share,'print')">print</a>
          <a  class="store" @click="onHorcrux(share,'vault')">vault</a>
          <a  class="store">Steganography</a>
        </div>
      </div>
    </div>

    <drawer :open="drawer.print" @close="onHorcrux(null,'print')">
      <horcrux-print :value="currentHorcrux" />
    </drawer>

    <drawer :open="drawer.vault" :displayClose="true" @close="onHorcrux(null,'vault')">
      <horcrux-vault :value="currentHorcrux" />
    </drawer>

  </div>
</template>
<style scoped lang="scss">
  .languages {
    a{
      padding: 0 5px;
    }
  }

  .mnemonic{
    display: flex;
    flex-wrap: wrap;
    justify-content:flex-end;
    textarea{
      font-size: 19px;
      resize: none;
      height: 120px;
      flex: 1;
      margin-right: 4px;
    }

    .qrcode {
      width: 120px!important;
      height: 120px!important;
      border: 1px solid #ddd;
    }

    .actions{
      text-align: right;
      width: 100%;
      display: flex;
      justify-content: flex-end;
      select{
        width: 100%;
        margin-left: 0;
        margin-right: 4px;
      }

      button{
        margin-right: 5px;        
      }
    }
    .monero{
      width: 100%;
      text-align: left;      
    }
  }


  .sharing{
    margin-top: 50px;
    padding-top: 50px;
    border-top: 1px solid #eee;
    .header{
      ul{
        list-style-type: disclosure-closed;
        text-align: left;
        border: 1px solid #eee;
        padding: 25px;        
        margin-top: 20px;
      }
    }

  }
  .secret{
    overflow-wrap: anywhere;
    text-align: left;
    margin: 10px 0;
    background: #eee;
    padding: 25px;
    
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
import EntropyFromMouse from '@/components/EntropyFromMouse.vue';
import Drawer from '@/components/Drawer.vue';
import HorcruxPrint from '@/components/HorcruxPrint.vue';
import HorcruxVault from '@/components/HorcruxVault.vue';
import Qr from '@/components/Qr.vue';
import { $wallet, i18n } from '../services';
import * as secret from 'secrets.js-34r7h';
import { I_MouseEntropyResult } from '@/lib/MouseEntropyEngine';

@Options({
  components: {
    EntropyFromMouse, 
    Drawer, 
    Qr,
    HorcruxPrint,
    HorcruxVault
  },
})
export default class Home extends Vue {
  private _currentHorcrux = '';

  drawer: any = {
    vault: false,
    print: false
  }

  mnemonicLength:any = {
    12:{value:16,selected:true,label:"12-word: Argent, Coinbase Wallet, Mycelium, Electrum, Ledger, Metamask, Trezor"},
    //15:{value:20,selected:false,label:""},
    18:{value:24,selected:false,label:"18-word: Ledger"},
    //21:{value:28,selected:false,label:""},
    24:{value:32,selected:false,label:"24-word: Trezor One, Ledger"}
  };
  mnemonicBytes = 16;


  entropyStart = false;
  mnemonic = "";
  seed = "";
  shares: secret.Shares = [];

  //
  // helpers for typescript
  $refs!: {
    entropyGen: EntropyFromMouse,
    textarea: HTMLInputElement
  }  



  async mounted() {
    this.entropyStart = false;
  }

  get combineShares() {
    if(!this.shares.length) {
      return ''
    }    
    return secret.combine(this.shares);
  }

  get currentHorcrux() {
    if(!this._currentHorcrux) {
      return {};
    }
    return {
      version:this._currentHorcrux.substring(0,3),
      share:this._currentHorcrux,
      base64:($wallet.b64.encode('0x'+this._currentHorcrux+'0'))
    };
  }

  get isInvalidMnemonic() {
    if(!this.mnemonic || this.mnemonic == '') {
      return true;
    }
    return !$wallet.isValidMnemonic(this.mnemonic);
  }

  async onChange($event: any) {
    this.mnemonicBytes = this.mnemonicLength[$event.target.value].value;
    this.mnemonic = await $wallet.createMnemonic($wallet.entropy,this.mnemonicBytes);
    this.seed = (await $wallet.getSeed(this.mnemonic));
    this.shares = await $wallet.createShamirSecretFromSeed();

  }

  async onEntropyCollected(entropyResult: I_MouseEntropyResult){
    console.log("entropy collected", entropyResult.bytes);
    this.entropyStart = false;

    $wallet.entropy = entropyResult.bytes;
    this.mnemonic = await $wallet.createMnemonic($wallet.entropy,this.mnemonicBytes);
    this.seed = (await $wallet.getSeed(this.mnemonic));
    this.shares = await $wallet.createShamirSecretFromSeed();

  }

  async onI18n(ln:i18n) {
    $wallet.setDefaultLang(ln,this.mnemonicBytes);
    this.mnemonic = await $wallet.createMnemonic($wallet.entropy,this.mnemonicBytes);
  }

  onEntropyStart(){
    this.entropyStart = true;
  }

  async onRetrieve(){
    this.seed = (await $wallet.getSeed(this.mnemonic));
    this.shares = await $wallet.createShamirSecretFromSeed();
  }

  onFocus() {
    if(!this.mnemonic){
      return;
    }
    this.$refs.textarea.select();
    this.$refs.textarea.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    //navigator.clipboard.writeText(this.mnemonic);

  }

  onHorcrux(share: string, destination:string) {
    // const route:any = {
    //   'print':()=> this.$refs.print,
    //   'vault':()=> this.$refs.vault,
    // }
    // route[destination]().open = true;
    // FIXME share len = 131 (odd)
    // lend village excuse sort climb muscle blue shell measure crumble divide section reason income buffalo
    this._currentHorcrux = share;
    this.drawer[destination] = !this.drawer[destination];
    console.log('---- open horcrux',destination,this.drawer[destination])
  }

  onStart() {
    this.$refs.entropyGen.start();
  }
}
</script>
