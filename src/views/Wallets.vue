<template>
  <div class="wallets container">
    <div class="">
        <h2>Wallets for ETH and BTC</h2>
        <p>BIP32 Root Key and derivation path</p>
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

    <div class="">
      <h2>Derived Addresses for ETH and BTC</h2>
      <p>Addresses are derived from the BIP32 Extended Key. (purpose, coins, account, index)</p>

      <h2>HOT</h2>
      <table>
        <thead>
          <tr>
            <th>index</th>
            <th>Public</th>
            <th>Private</th>
          </tr>
        </thead>        
        <tbody>
          <tr v-for="(wallet,index) in wallets" :key="index">
            <td>{{index}}</td>
            <td>{{wallet.address}}</td>
            <td class="private">{{wallet.privateKey}}</td>
          </tr>
        </tbody>
      </table>      
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

  .private{
    overflow: hidden;
    max-width: 300px;
    text-overflow: ellipsis;
  }

  textarea {
    font-size: 19px;
    resize: none;
    height: 120px;
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

  mnemonic = "";
  wallets:HDNode[] = [];
  //
  // defaultPath ⇒ "m/44'/60'/0'/0/0"
  // - monero = 128
  // - eth = 60
  // - btc = 0
  // Bitcoin Core, MultiBit HD  ⇒ "m/0'
  // Ethereum, Ledger, Blockchain.info, Coinomi ⇒ "m/44'
  async createWallets() {
    const seed= await $wallet.getSeed(this.mnemonic);
    this.wallets = $wallet.createRootKey(seed);
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
