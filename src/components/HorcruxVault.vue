<template>
 <div v-if="!!value.share" class="content">
    <h1>Horcrux </h1>
    <h3>{{date}} / <span class="bold">v{{value?.version}}</span> </h3>
    <p class="description">        
      Your Horcrux will be anonimously stored in our <a href="#">Vault</a> SmartContract without any needed credential. 
      It's a simple and secure space to store content.
    </p>
    <div class="secret">
      {{value?.base64}}
    </div>

    <form>
      <fieldset>
        <label for="email">Use an email to generate your the first part of the secret</label>
        <input type="email"  v-model="username" placeholder="email@g.com" id="email" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
        <password label="Complete your secret with a hard password (choose min 10 chars)" 
                  v-model="password" />

        <button @click="onPublish" class="button-primary" >Generate Vault </button>
        <button class="button-primary" >Publish </button>
      </fieldset>
    </form>

 </div>  
  
</template>

<style scoped lang="scss">
  .content{
    max-width: 700px;
    margin: auto;      
    .description,
    .version{
      border-left: 7px solid rgb(175 184 193 / 20%);
      padding-left: 10px;
      padding-top: 20px;
    }

    .secret{
      overflow-wrap: anywhere;
      text-align: left;
      margin: 10px 0;
      background: #eee;
      padding: 5px;
      width: 100%;
    }

    button{
      margin-right: 10px;
    }

    form{
    }

  }

</style>

<script lang="ts">
import { requiresWork } from '@/lib/POW';
import { stringToHEX256 } from '@/lib/utils';
import { BigNumber, ethers, Signer } from 'ethers';
import { Options, Vue } from 'vue-class-component';
import { $wallet, Horcrux } from '../services';

import Password from '@/components/Password.vue';

@Options({
  components: { Password },
  props: {
    value: {
      default: {},
      required: true,
      type: Object
    },
  }
})
export default class HorcruxVault extends Vue {

  // props
  value!:Horcrux;
  currentDate: Date = new Date();

  password = "";
  username = "";
  difficulty = BigNumber.from('0x1ffff');

  // Web3
  signer: Signer|null=null;
  account = "";
  balance = "0";


  get date() {
    return this.currentDate.toLocaleString();
  }


  async initMetamask() {
    const $window = window as any;
    if(!$window.ethereum){
      throw new Error('Please install MetaMask');
    }
    //const web3 = new Web3($window.ethereum);
    // const netId = await web3.eth.net.getId();
    // const accounts = await web3.eth.getAccounts();    
    // const metamask = await $window.ethereum.request({ method: 'eth_requestAccounts' });
    // const account = accounts[0] || metamask[0];
    //
    // initialize metamask
    const [account] = await $window.ethereum.request({ method: 'eth_requestAccounts' });
    if(!account){
      throw new Error('Please login with MetaMask');
    }
    const provider = new ethers.providers.Web3Provider($window.ethereum);
    this.signer = provider.getSigner();
    // console.log('--- DBG signer0',await this.signer.getAddress());
    // console.log('--- DBG signer1',await this.signer.getChainId());
    // console.log('--- DBG signer2',(await this.signer.getBalance()).toString());


    // To connect to the user's wallet, we have to run this method.
    // It returns a promise that will resolve to the user's address.
    this.account = account;

    //
    //load balance
    // this.balance = await web3.eth.getBalance(account);
    this.balance = (await provider.getBalance(this.account)).toString();
  }

    //
    //load contracts
  //   try {
  //     this.token = new ethers.Contract(
  //       this.Token.address,
  //       this.Token.abi,
  //       signer
  //     );
  //     this.dbank = new ethers.Contract(
  //       this.dBank.address,
  //       this.dBank.abi,
  //       signer
  //     );
  //     // this.token.on('MinterChanged',(from: any, to: any) =>{
  //     //   console.log('--- DBG MinterChanged evnt',from,to);
  //     // });
  //     // this.dbank.on('Deposit',(user: any, etherAmount: any, timeStart: any) =>{
  //     //   console.log('--- DBG deposit evnt',user,etherAmount.toString());
  //     //   this.depositedAmount = (etherAmount.toString());
  //   } catch (e) {
  //     console.log('Error', e);
  //     window.alert('Contracts not deployed to the current network')
  //   }
  // }

  async onPublish($event:Event) {
    $event.preventDefault();
    try{
      await this.initMetamask();

      //
      // proof of Work
      const seed = stringToHEX256(this.username+""+this.password);
      const nonce = '0x'+requiresWork(seed,this.difficulty)[1];

      console.log('----- POW is done: ',seed,nonce);
      window.alert('POW is done,' + seed);

      // const node = ethers.utils.HDNode.fromSeed(seed);
      // const hash =  ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(['uint256','uint256'],[seed,nonce]));
      //horcrux.create(hash,this.value.base64);

    }catch(err: any) {
      console.debug(err);
      window.alert(err.message);
    }
  }

}
</script>

