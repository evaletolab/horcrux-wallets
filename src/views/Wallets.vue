<template>
  <div class="wallets container">
    <div class="">
        <h2>Derived Wallets from your Mnemonic</h2>
        <p>Past your Mnemonic phrase to generate the derived addresses you want</p>
    </div>
 
    <!-- BIP39 Mnemonic -->
    <div class="mnemonic">        
        <textarea  :value="''" @input="updateMnemonic" class="phrase private-data " autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">              
        </textarea>

        <div class="warning" :class="{hide:!isValidMnemonic}">

        </div>
    </div>    



    <!-- BIP32 Root Key -->
    <div class="form-group hide">
      <label for="root-key" class="col-sm-2 control-label">BIP32 Root Key</label>
      <div class="col-sm-10">
          <textarea v-model="rootKey" class="root-key private-data "  autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"></textarea>
      </div>
    </div>  

    <div class="derivation">
      <h3>Derived Addresses</h3>
      <p>
        BIP32 Root Key and derivation path BIP44 are the standards used to create your wallets.
        The following addresses are derived from your Mnemonic.
      </p>

    <div class="mg-tabs">
      <ul >
        <li @click="onDerivation('btc')"  :class="{active:!defaultDerivation.index}">BTC</li>
        <li @click="onDerivation('segwit')"  :class="{active:defaultDerivation.index == 1}">BTC segwit</li>
        <li @click="onDerivation('eth')" :class="{active:(defaultDerivation.index == 2)}">ETH</li>
      </ul>
      <h3>Day-to-day expenses</h3>
      <table>
        <thead>
          <tr>
            <th style="width:80px">index</th>
            <th>Public</th>
            <th style="width:100%">Private</th>
          </tr>
        </thead>        
        <tbody>
          <tr v-for="(wallet,index) in services" :key="index">
            <td><b>/{{index}}</b></td>
            <td>{{formatB58(wallet.address)}}</td>
            <td class="private">{{formatB58(wallet.privateKey)}}</td>
          </tr>
        </tbody>
      </table>      
      <h3>Slot for your bank</h3>
      <p>Secure your financial activities</p>
      <table>
        <thead>
          <tr>
            <th style="width:80px">index</th>
            <th>Public</th>
            <th style="width:100%">Private</th>
          </tr>
        </thead>        
        <tbody>
          <tr v-for="(wallet,index) in wallets" :key="index">
            <td><b>{{index+5}}</b></td>
            <td>{{formatB58(wallet.address)}}</td>
            <td class="private">{{formatB58(wallet.privateKey)}}</td>
          </tr>
        </tbody>
      </table>      

      <h3>Slot for your pension fund</h3>
      <p>Secure your retirement</p>
      <table>
        <thead>
          <tr>
            <th style="width:80px">index</th>
            <th>Public</th>
            <th style="width:100%">Private</th>
          </tr>
        </thead>        
        <tbody>
          <tr v-for="(wallet,index) in pension" :key="index">
            <td><b>{{index+10}}</b></td>
            <td>{{formatB58(wallet.address)}}</td>
            <td class="private">{{formatB58(wallet.privateKey)}}</td>
          </tr>
        </tbody>
      </table>      


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


  textarea {
    font-size: 19px;
    resize: none;
    height: 120px;
  }

  .derivation{
    text-align: left;
    table{
      font-size: 14px;
    }
    .private{
      overflow: hidden;
      max-width: 300px;
      text-overflow: ellipsis;
    }

    ul{
      border-bottom: 1px solid #ddd;
      margin-bottom: 30px;
      li{
        border: 1px solid #ccc;
        border-right-color: white;
        border-bottom-color: white;
        border-top-color: white;

        &.active {
          background: #666;
          color: white;
          border: 1px solid #666!important;          
        }
      }    
    }

  }



</style>
<script lang="ts">
import { HDNode } from '@ethersproject/hdnode';
import { ethers } from 'ethers';
import { Options, Vue } from 'vue-class-component';
import { $wallet } from '../services';

@Options({
  components: {
  },
})
export default class Wallets extends Vue {

  mnemonic = "";
  wallets:HDNode[] = [];
  services:HDNode[] = [];
  pension:HDNode[] = [];

  // FIXME config should be centralized 
  derivationOptions: any = {
    btc : {
      index: 0,
      path: "m/44'/0'/0'/0/0",
      b58:true
    },
    segwit : {
      index: 1,
      path: "m/84'/0'/0'/0/0",
      b58:true
    },
    eth : {
      index: 2,
      path: "m/44'/60'/0'/0/0",
      b58:false
    },
    monero : {
      index: 3,
      path: "m/44'/128'/0'/0/0",
      b58:true
    }
  };

  defaultDerivation = this.derivationOptions.btc;


  get isValidMnemonic() {
    return $wallet.isValidMnemonic(this.mnemonic);
  }

  formatB58(string: string) {
    return (this.defaultDerivation.b58)? ethers.utils.base58.encode(string):string;
  }
  //
  // defaultPath ⇒ "m/44'/60'/0'/0/0"
  // - monero = 128
  // - eth = 60
  // - btc = 0
  // Bitcoin Core, MultiBit HD  ⇒ "m/0'
  // Ethereum, Ledger, Blockchain.info, Coinomi ⇒ "m/44'
  async createWallets() {
    if(!this.isValidMnemonic){
      return;
    }

    const seed= await $wallet.getSeed(this.mnemonic);
    this.wallets = $wallet.createRootKey(seed,this.defaultDerivation, 5);
    this.services = $wallet.createRootKey(seed,this.defaultDerivation, 5,5);
    this.pension = $wallet.createRootKey(seed,this.defaultDerivation, 5,10);
    return;
  }

  async updateMnemonic($event:any) {
    this.mnemonic = $event.target.value;
    await this.createWallets();
  }

  async onDerivation(token: string) {
    this.defaultDerivation = this.derivationOptions[token] || this.derivationOptions.btc;
    this.createWallets()
  }
}
</script>
