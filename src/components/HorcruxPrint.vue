<template>
 <div v-if="!!value.share" class="content">
    <h1>Horcrux </h1>
    <h3>{{date}} / <span class="bold">v{{value?.version}}</span> </h3>
    <p class="version">
      <code>secrets.js-34r7h@2.0.1</code> is an implementation of <a href="http://en.wikipedia.org/wiki/Shamir's_Secret_Sharing" rel="nofollow">Shamir's threshold secret sharing scheme</a> in javascript.<br/>
    </p>
    <p class="description">        
      Each Horcrux is a string in the format <code>&lt;bits (0xF)>&lt;id (0xFF)>&lt;value></code> <br/>
      <code>bits</code> is the Galois field, 8 bits <br/>   
    </p>

    <div class="print">
      <h4 class="title">Hexadecimal</h4>
      <div class="secret">
        {{value?.share}}
      </div>
      <div class="qrcode"></div>
      <hr>
      <h4 class="title">Base64</h4>
      <div class="secret">
        {{value?.base64}}
      </div>
      <div class="qrcode"></div>
        

    </div>

 </div>  
  
</template>

<style scoped lang="scss">
  .content{
    max-width: 940px;
    margin: auto;      
    .description,
    .version{
      border-left: 7px solid rgb(175 184 193 / 20%);
      padding-left: 10px;
      padding-top: 20px;
    }

  }
  .print{
    display: flex;
    flex-wrap: wrap;
    -box-shadow: 0 0 92px 1px #aaa;
      
    .title{
      width: 100%;
      margin: 0;
      margin-top: 20px;      
    }

    .secret{
      overflow-wrap: anywhere;
      text-align: left;
      margin: 10px 0;
      background: #eee;
      padding: 5px;
      width: 80%;
    }
    .qrcode {
      height: 150px;
      width: 150px;
      border:1px solid #a22580;
      margin-right: 0;
      margin-left: auto;
      margin-top: 10px;
      margin-bottom: 10px;
    }
  }
</style>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { $wallet, Horcrux } from '../services';

@Options({
  props: {
    value: {
      default: {},
      required: true,
      type: Object
    },
  }
})
export default class HorcruxPrint extends Vue {

  // props
  value!:Horcrux;
  currentDate: Date = new Date();



  get date() {
    return this.currentDate.toLocaleString();
  }

}
</script>

