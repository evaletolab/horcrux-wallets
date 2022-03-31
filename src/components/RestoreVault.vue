<template>
 <div class="content">
    <h1>Restore Horcrux from Vault </h1>
    <p class="description">    
      Your Horcrux is stored safely without any thirdparties. 
      You only need to remember your secret (mail+password) to restore the encrypted Vault. 
      Also use your printed page as a rescue tip!
      <p class="info">
        This is an alpha version running on testnet Ropsten. <br/>
        Contract address : 
        <a target="_tab" :href="'https://ropsten.etherscan.io/address/'+address">{{address}}</a>
      </p>

    </p>

    <div class="media-display">
      <fieldset>
        <label for="email">Email used to restore your Horcrux</label>
        <input type="email"  v-model="username" placeholder="email@g.com" id="email" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
        <password label="Secret used to restore your Horcrux" 
                  @value="(value)=> password=value" @score="onScore"/>

        <button @click="onRestore" class="button-primary" :disabled="(score < 4)||receipt">{{computing?'Computing...':'Redeem Vault'}}</button>
      </fieldset>
    </div>


    <h3>Vault secret 🔑</h3>
    <div class="secret" :class="{hide:seed==''}">
      <p><b>Psst;</b> Compare your secret with your printed document</p>
      <span class="hideemail">{{hideUsermail}}</span><br/>
      {{seed}} 
    </div>
    <div class="published" :class="{hide:(share == '')}">
      <b>Vault content : </b>
      {{share}}
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
      border: 2px solid #eee;
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

    form{
    }

  }

</style>

<script lang="ts">
import { requiresWork } from '@/lib/POW';
import { stringToHEX256 } from '@/lib/utils';
import { BigNumber, ethers } from 'ethers';
import { Options, Vue } from 'vue-class-component';

import Password from '@/components/Password.vue';
import { xor_decrypt } from '@/lib/XOR';

@Options({
  components: { Password }
})
export default class RestoreVault extends Vue {

  // props
  currentDate: Date = new Date();

  password = "";
  username = "";
  score = 0;
  difficulty = BigNumber.from('0x1ffff');

  // Web3
  address ="0x58f25463779E44A395804C783ee01202fF442b85";
  abiRedeem = [
    "function redeem(uint256 seed, uint256 nonce) view returns(uint)"
  ];

  signer:any;
  account = "";
  balance = "0";
  receipt:any = null;
  share = "";


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

  get location (){
    return document.location.href;
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
    // const [account] = await $window.ethereum.request({ method: 'eth_requestAccounts' });
    // if(!account){
    //   throw new Error('Please login with MetaMask');
    // }
    const provider = new ethers.providers.Web3Provider($window.ethereum);
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

  async onRestore($event:Event) {
    $event.preventDefault();

    try{
      this.computing = true;
      await this.initMetamask();

      //
      // proof of Work
      this.seed = stringToHEX256(this.username+""+this.password);
      this.nonce = requiresWork(this.seed,this.difficulty)[1];
      console.log('--- DEBUG',this.seed,this.nonce);

      //
      // init contract state
      const privateKey =  ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(['uint256','uint256'],[this.seed,this.nonce]));

      const horcrux = new ethers.Contract(this.address,this.abiRedeem,this.signer);

      const result = (await horcrux.redeem(this.seed,this.nonce)).toHexString();

      const mixed = ethers.utils.arrayify(result);

      this.computing = false;

      if (mixed[0] == 0){
        this.share = "Not available";
      this.$emit("value", {value: this.share});
        return;
      }
      //
      // simple demixer
      const bytes = xor_decrypt(
        mixed,
        ethers.utils.arrayify(privateKey.substring(0,16))
      );
      this.share = ethers.utils.hexlify(bytes).replace('0x','8');


      this.$emit("value", {value: this.share});

    }catch(err) {
      console.log('--- DEBUG restore',err);
    }
    
  }

  onScore(value:number){
    this.score = value;
  }

}
</script>

