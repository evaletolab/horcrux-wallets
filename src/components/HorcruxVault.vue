<template>
 <div v-if="!!value.share" class="content">
    <h1>Horcrux </h1>
    <h3>{{date}} / <span class="bold">v{{value?.version}}</span> </h3>
    <div class="description">    
      This Horcrux is generated from <a :href="location">{{location}}</a><br/>    
      This service use Ethereum without any thirdparties. 
      You only need to choose a strong secret and publish the encrypted Vault. 
      Once it's done, we also recommand to <u>print this page as a rescue tip</u> (Ctrl+p).
      
      
      <p class="info">
        This is an alpha version running on testnet Ropsten. <br/>
        You can get free rETH there <a target="_tab" href="https://faucet.egorfine.com/">faucet</a> to test the service<br/>
        Contract address : 
        <a target="_tab" :href="'https://ropsten.etherscan.io/address/'+address">{{address}}</a>
      </p>
      

    </div>

    <div class="media-display">
      <fieldset>
        <label for="email">Use an email of your choise to generate your the first part of the secret</label>
        <input type="email"  v-model="username" placeholder="email@g.com" id="email" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
        <password label="Complete your secret with a strong password" 
                  @value="(value)=> password=value" @score="onScore"/>

        <input type="password"  v-model="confirmation" placeholder="Confirm the password" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
        <button @click="onGenerate" class="button-primary" :disabled="!isPasswordOk">{{computing?'Computing...':'Create Vault'}}   </button>
        <button @click="onPublish" class="button-primary" :disabled="(seed == '')||receipt" > {{publishing?'Publishing...':'Publish'}} </button>
      </fieldset>
    </div>
    <div class="published" :class="{hide:(!receipt)}">
      Transaction confirmed in block {{receipt?.blockNumber}} <br/>
      Gas used: {{receipt?.gasUsed.toString()}}
    </div>

    <input class="title" ref="title" type="text" placeholder="Your printed title">

    <div class="secret media-display">
      {{value?.share}}
    </div>
    <h3>Vault secret 🔑</h3>
    <div>

    </div>
    <div class="secret" :class="{hide:seed==''}">
      <p><b>Psst;</b> Print this document as a rescue tip</p>
      <span class="hideemail">{{hideUsermail}}</span><br/>
      {{seed.slice(0,8)}}... {{seed.slice(-8)}}
    </div>
 </div>  
  
</template>

<style scoped lang="scss">
  .content{
    max-width: 700px;
    margin: auto;      
    input.title {
      height: 6rem;
      font-size: 3rem;
      border-radius: 0px;
      border: 0;
      border-bottom: 1px solid #eee;
      margin-left: -10px;      
    }

    .secret{
      overflow-wrap: anywhere;
      text-align: left;
      margin: 10px 0;
      background: #eee;
      padding: 25px;
      width: 100%;
      margin-bottom: 50px;
    }
    .published{
      overflow-wrap: anywhere;
      text-align: left;
      margin: 10px 0;
      background: #ddf9cf;
      padding: 25px;
      width: 100%;      
    }

    .hideemail {
      font-family: monospace;
      font-weight: 600;
      font-size: 14px;      
    }

    button{
      margin-right: 10px;
    }
  }

</style>

<script lang="ts">
import { requiresWork } from '@/lib/POW';
import { stringToHEX256 } from '@/lib/utils';
import { BigNumber, ethers, Signer } from 'ethers';
import { Options, Vue } from 'vue-class-component';
import { Horcrux } from '../services';

import Password from '@/components/Password.vue';
import { xor_encrypt } from '@/lib/XOR';

//
// FIXME modal connectors are to expensive
import Web3Modal from "web3modal";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import WalletConnect from "@walletconnect/web3-provider";

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
  confirmation = "";
  username = "";
  score = 0;
  difficulty = BigNumber.from('0x1ffff');

  // Web3
  address ="0x58f25463779E44A395804C783ee01202fF442b85";
  abi =[
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "source",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "horcrux",
          "type": "uint256"
        }
      ],
      "name": "create",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]

  signer:any;
  account = "";
  balance = "0";
  receipt:any = null;
  publishing = false;


  //
  // POW
  nonce = "";
  seed = "";
  computing = false;

  get date() {
    return this.currentDate.toLocaleDateString();
  }

  get hideUsermail() {
    let hidden = "";
    let indexOfMail = this.username.indexOf("@");
    if(indexOfMail == -1 ) {
      indexOfMail = (this.username.length / 2)|0;
    }
    for (let i = 0; i < this.username.length; i++) {
      if(i == 0 ||
         i == indexOfMail - 1 ||
         i == indexOfMail ||
         i == indexOfMail + 1 ||
         i == this.username.length - 1){
        hidden+= this.username[i];
      } else{
        hidden += "*";
      }
    }
    return hidden;
  }

  get isPasswordOk() {
    return (this.score >= 4)&&!this.receipt&&(this.confirmation==this.password)&&(this.confirmation!='')&&this.username!=''
  }

  get location (){
    return document.location.href;
  }

  async metamaskdisconnect () {
    const $window = window as any;
    await $window.ethereum.request({
      method: "wallet_requestPermissions",
      params: [{
          eth_accounts: {}
      }]
    });
  }  

  async initMetamask() {
    const $window = window as any;
    // if(!$window.ethereum){
    //   throw new Error('Please install MetaMask');
    // }
    
    const providerOptions = {
      walletlink: {
        package: CoinbaseWalletSDK, 
        options: {
          appName: "Horcrux",
        }
      },
      walletconnect: {
        package: WalletConnect, 
        options: {
          infuraId: "27e484dcd9e3efcfd25a83a78777cdf1"
        }
      }
    };
    const web3Modal = new Web3Modal({
      cacheProvider: true, // optional
      providerOptions // required
    });

    const instance = await web3Modal.connect();

    const provider = new ethers.providers.Web3Provider(instance);

    provider.on("connect", (info: { chainId: number }) => {
      console.log('--DBUG provider:connect',info);
    });

    const [account] = await provider.send("eth_requestAccounts", []);
    if(!account){
      throw new Error('Please login with MetaMask');
    }

    this.signer = provider.getSigner();


    console.log('--- DBG signer0',await this.signer.getAddress());
    console.log('--- DBG signer1',account);


    // To connect to the user's wallet, we have to run this method.
    // It returns a promise that will resolve to the user's address.
    this.account = account;

    //
    //load balance
    // this.balance = await web3.eth.getBalance(account);
    this.balance = (await this.signer.getBalance()).toString();
    console.log('--- DBG balance',this.balance);
  }

  async onGenerate($event:Event) {
    $event.preventDefault();
    //
    // proof of Work
    this.computing = true;
    const POW = () => {
      return new Promise((resolve)=>{
        setTimeout(()=>{
          this.seed = stringToHEX256(this.username+""+this.password);
          this.nonce = requiresWork(this.seed,this.difficulty)[1];
          this.computing = false;
        },100);
      })
    }
    await POW();
  }

  async onPublish($event:Event) {
    $event.preventDefault();
    try{
      this.receipt = null;
      this.publishing = true;
      await this.initMetamask();

      //
      // init contract state
      const privateKey =  ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(['uint256','uint256'],[this.seed,this.nonce]));
      const hash = ethers.utils.keccak256(privateKey);

      //
      // simple mixer
      const share = this.value.share;
      console.log('--- DEBUG share',share);
      let bytes = xor_encrypt(
        ethers.utils.arrayify('0x'+share),
        ethers.utils.arrayify(privateKey.substring(0,16))
      );
      const mixed = ethers.utils.hexlify(bytes);
      console.log('--- DEBUG mixed',mixed);
      
      const horcrux = new ethers.Contract(this.address,this.abi,this.signer);

      console.log('---- DEBUG create',hash,mixed);
      const tx = await horcrux.create(hash,mixed);

      console.log(`Transaction hash: ${tx.hash}`);

      this.receipt = await tx.wait();
      this.publishing = false;
      console.log(`Transaction confirmed in block ${this.receipt.blockNumber}`);
      console.log(`Gas used: ${this.receipt.gasUsed.toString()}`);
      await this.metamaskdisconnect();
    }catch(err: any) {
      window.alert(err.message);
      this.publishing = false;
      console.debug(err);
    }
  }

  onScore(value:number){
    this.score = value;
  }

}
</script>

