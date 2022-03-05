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
    </div>    



    <!-- BIP32 Root Key -->
    <div class="form-group hide">
      <label for="root-key" class="col-sm-2 control-label">BIP32 Root Key</label>
      <div class="col-sm-10">
          <textarea v-model="rootKey" class="root-key private-data "  autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"></textarea>
      </div>
    </div>  

    <div class="derivation">
      <h3>Derived Addresses for ETH and BTC</h3>
      <p>
        BIP32 Root Key and derivation path. 
        The following addresses are derived from your Mnemonic.
      </p>

    <div class="mg-tabs">
      <ul >
        <li @click="defaultDerivation=0"  :class="{active:!defaultDerivation}">BTC</li>
        <li @click="defaultDerivation=60" :class="{active:(defaultDerivation == 60)}">ETH</li>
      </ul>
      <h3>Protect your online services</h3>
      <p>Your Mail, Social, Admin, Customers, etc. security</p>
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
            <td><b>{{index}}</b></td>
            <td>{{wallet.address}}</td>
            <td class="private">{{wallet.privateKey}}</td>
          </tr>
        </tbody>
      </table>      
      <h3>Be your bank</h3>
      <p>Your financial secutiry</p>
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
            <td>{{wallet.address}}</td>
            <td class="private">{{wallet.privateKey}}</td>
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
      font-size: 13px;
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
import { Options, Vue } from 'vue-class-component';
import { $wallet } from '../services';

@Options({
  components: {
  },
})
export default class Wallets extends Vue {

  defaultDerivation = 0;
  mnemonic = "";
  wallets:HDNode[] = [];
  services:HDNode[] = [];
  //
  // defaultPath ⇒ "m/44'/60'/0'/0/0"
  // - monero = 128
  // - eth = 60
  // - btc = 0
  // Bitcoin Core, MultiBit HD  ⇒ "m/0'
  // Ethereum, Ledger, Blockchain.info, Coinomi ⇒ "m/44'
  async createWallets() {
    const seed= await $wallet.getSeed(this.mnemonic);
    this.wallets = $wallet.createRootKey(seed,this.defaultDerivation, 5);
    this.services = $wallet.createRootKey(seed,this.defaultDerivation, 5,5);
    return this.wallets;
  }

  async updateMnemonic($event:any) {
    this.mnemonic = $event.target.value;
    if(this.mnemonic.length<40){
      return;
    }
    await this.createWallets();
  }
}
</script>
