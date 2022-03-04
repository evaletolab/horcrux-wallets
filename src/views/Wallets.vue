<template>
  <div class="wallets container">
    <div class="">
        <h2>Wallets for ETH and BTC</h2>
        <p>BIP32 Root Key and derivation path</p>
    </div>

    <!-- BIP39 Mnemonic -->
    <div class="mnemonic">        
        <textarea  v-model="mnemonic" class="phrase private-data " autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">              
        </textarea>
    </div>    



    <!-- BIP32 Root Key -->
    <div class="form-group ">
      <label for="root-key" class="col-sm-2 control-label">BIP32 Root Key</label>
      <div class="col-sm-10">
          <textarea v-model="rootKey" class="root-key private-data "  autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"></textarea>
      </div>
    </div>  

    <div class="">
      <h2>Derived Addresses for ETH and BTC</h2>
      <p>Addresses are derived from the BIP32 Extended Key. (purpose, coins, account, index)</p>

      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Public</th>
            <th>Private</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>0</td>
            <td>1CgoxANNydhjrpjfAahk8z1PUugszmd7Sh</td>
            <td>L4HoioZUtJPf...6zBXyGvJ9SLWe8BAc9J</td>
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

  textarea {
    font-size: 19px;
    resize: none;
    height: 120px;
  }


</style>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { $wallet } from '../services';

@Options({
  components: {
  },
})
export default class Wallets extends Vue {
  //
  // defaultPath ⇒ "m/44'/60'/0'/0/0"
  // - monero = 128
  // - eth = 60
  // - btc = 0
  // Bitcoin Core, MultiBit HD  ⇒ "m/0'
  // Ethereum, Ledger, Blockchain.info, Coinomi ⇒ "m/44'
  async createRootKey(seed: string){
    // const node = ethers.utils.HDNode.fromSeed(seed);
    // defaultPath ⇒ "m/44'/60'/0'/0/0"
    // const child = node.derivePath('m/0/0');
    // Get the extended public key
    // let xpub = child.neuter().extendedKey;

    // Get the extended private key
    // return child.extendedKey;
  }

}
</script>
