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
            <td>{{(wallet.address)}}</td>
            <td class="private">{{address(wallet.privateKey)}}</td>
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
            <td><b>/{{index+5}}</b></td>
            <td>{{(wallet.address)}}</td>
            <td class="private">{{address(wallet.privateKey)}}</td>
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
            <td><b>/{{index+10}}</b></td>
            <td>{{(wallet.address)}}</td>
            <td class="private">{{address(wallet.privateKey)}}</td>
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

//
// btc specific
// https://forum.stacks.org/t/how-to-sign-data-with-app-private-key/6603

const bitcoin = require('../../bitcoinjs-lib');

@Options({
  components: {
  },
})
export default class Wallets extends Vue {

  mnemonic = "";
  wallets:HDNode[]|any[] = [];
  services:HDNode[]|any[] = [];
  pension:HDNode[]|any[] = [];

  // address type (Legacy, P2HS Segwit, P2WPKH Segwit) 
  // FIXME config should be centralized 
  // P2PK: "Pay To Public Key"
  // P2SH: "Pay To Script Hash"
  // P2PKH:Legacy is the original bitcoin address (1...)
  // P2PSH: Nested SegWit is an improvement on Legacy (3...); they have a 40% lesser transaction sizes
  // P2WPKH: Native SegWit (Bech32): SegWit, short for Segregated Witness (bc1...), has a 80% smaller transaction sizes
  // https://bitcoin.stackexchange.com/questions/64733/what-is-p2pk-p2pkh-p2sh-p2wpkh-eli5
  // https://www.quora.com/Can-you-differentiate-between-a-Bitcoin-and-an-Ethereum-address
  derivationOptions: any = {
    btc : {
      index: 0,
      path: "m/44'/0'/0'/0",
      b58:true
    },
    segwit : {
      index: 1,
      path: "m/84'/0'/0'/0",
      b58:true
    },
    eth : {
      index: 2,
      path: "m/44'/60'/0'/0",
      b58:false
    },
    monero : {
      index: 3,
      path: "m/44'/128'/0'/0",
      b58:true
    }
  };

  defaultDerivation = this.derivationOptions.btc;


  get isValidMnemonic() {
    return $wallet.isValidMnemonic(this.mnemonic);
  }

  address(string: string) {
    return string;
    //return (this.defaultDerivation.b58)? ethers.utils.base58.encode('0x'+string):string;
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


    const network = (wallet:HDNode) => {
      const privateKey = ethers.utils.arrayify(wallet.privateKey);
      const keyPair = bitcoin.ECPair.fromPrivateKey(Buffer.from(privateKey));    
      switch(this.defaultDerivation.index){
        case 0:// P2PK et P2PKH
        return { 
          address:bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey }).address,
          pubicKey:keyPair.publicKey.toString('hex'),
          privateKey:keyPair.toWIF()
        };
        case 1:
        return { 
          address:bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey }).address,
          pubicKey:keyPair.publicKey.toString('hex'),
          privateKey:keyPair.toWIF()
        };
        default:
        return wallet;
      }
    };

    const seed= await $wallet.getSeed(this.mnemonic);
    this.services = $wallet.createRootKey(seed,this.defaultDerivation, 5,0).map(network);
    this.wallets = $wallet.createRootKey(seed,this.defaultDerivation, 5,5).map(network);
    this.pension = $wallet.createRootKey(seed,this.defaultDerivation, 5,10).map(network);
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
