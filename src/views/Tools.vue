<template>
  <div class="wallets container">
    <div class="">
        <h2>Create Wallet</h2>
        <p>Past your exported private key </p>
    </div>
 
    <!-- BIP39 Mnemonic -->
    <div class="private-key">        
        <textarea  :value="''" @input="updatePrivate" 
            class="phrase private-data " 
            autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">              
        </textarea>

        <div class="warning" :class="{hide:!isValidKey}">

        </div>
    </div>    

    <div class="derivation">
      <div class="mg-tabs">
        <ul >
          <li @click="onDerivation('btc')"  :class="{active:!defaultDerivation.index}">BTC (legacy)</li>
          <li @click="onDerivation('segwit')"  :class="{active:defaultDerivation.index == 1}">BTC segwit</li>
          <li @click="onDerivation('eth')" :class="{active:(defaultDerivation.index == 2)}">ETH</li>
        </ul>
      </div>
    <!-- 0x6bdbf1ddbab13acc3df525764926cd99031d9d304b78a83e31109b6cad75b240 -->
      <div v-if="isValidKey">
        <div><b>public</b> {{(wallet.address)}}</div>
        <div ><b>private</b> {{address(wallet.privateKey)}}</div>
      </div>

    </div>

    <!-- Sign Message -->
    <div class="form-group signer " v-if="isValidKey">
      <div class="col-sm-10">
          <textarea v-model="rootMessage" class="root-key private-data "  autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"></textarea>
      </div>
      <button class="" @click.stop="onSignMessage">Sign message</button>
      <div class="signed">
        {{signedMessage}}
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

  .signer{
    button{
      width: 100%;
    }
    .signed{
      width: 100%;
      overflow-wrap: anywhere;
      text-align: left;
      background: #eee;    
      padding: 8px;
    }

  }



</style>
<script lang="ts">
import { HDNode } from '@ethersproject/hdnode';
import { ethers, Wallet } from 'ethers';
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

  privateKey = "";
  rootMessage = "";
  wallet:HDNode|any= null;
  signedMessage:string|null = null;

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


  get isValidKey() {
    return $wallet.isValidPrivateKey(this.privateKey);
  }

  //
  // filter for address
  address(string: string) {
    return string;
  }

  async createWallet() {
    if(!this.isValidKey){
      return;
    }


    const network = (wallet:HDNode|Wallet) => {
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

    const hdnode= $wallet.createFromKey(this.privateKey);
    this.wallet = network(hdnode);
    return;
  }


  async updatePrivate($event:any) {
    this.privateKey = $event.target.value;
    console.log(this.privateKey,this.privateKey.length)
    await this.createWallet();
  }


  async onDerivation(token: string) {
    this.defaultDerivation = this.derivationOptions[token] || this.derivationOptions.btc;
    this.createWallet();
  }

  async onSignMessage(){
    //FIXME, for BTC use lib https://github.com/bitcoinjs/bitcoinjs-message
    this.signedMessage = await this.wallet.signMessage(this.rootMessage);
  }
}
</script>
