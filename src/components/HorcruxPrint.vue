<template>
 <div v-if="!!value.share" class="content">
    <h1>Horcrux </h1>
    <h3>{{date}} / <span class="bold">v{{value?.version}}</span> </h3>
    <p class="version hide">
      <code>secrets.js-34r7h@2.0.1</code> is an implementation of <a href="http://en.wikipedia.org/wiki/Shamir's_Secret_Sharing" rel="nofollow">Shamir's threshold secret sharing scheme</a> in javascript.<br/>
    </p>
    <p class="description">        
      Horcrux generated from {{location}}
    </p>

    <div class="print">
      <h4 class="title">Hexadecimal</h4>
      <div class="secret">
        {{value?.share}}
      </div>
      <div class="qrcode"></div>
      <hr>        

    </div>

 </div>  
  
</template>

<style scoped lang="scss">
  .content{
    max-width: 940px;
    margin: auto;      
    .description,
    .version{
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
      padding: 25px;
      width: 80%;
      display: flex;
      align-items: center;
      @media (max-width:500px) {
        width: 350px;
        margin: 5px auto;
      }
    }
    .qrcode {
      height: 150px;
      width: 150px;
      border:1px solid #a22580;
      margin-right: 0;
      margin-left: auto;
      margin-top: 10px;
      margin-bottom: 10px;
      @media (max-width:500px) {
        width: 350px;
        height: 350px;
        margin: auto;
      }

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

  get location (){
    return document.location.href;
  }
}
</script>

