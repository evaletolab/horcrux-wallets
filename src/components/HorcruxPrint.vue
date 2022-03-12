<template>
 <div v-if="!!value.share" class="content">
    <h1>Horcrux </h1>
    <h3>{{date}} / <span class=" bold">v{{value?.version}}</span> </h3>
    <p class="description">        
      Horcrux generated from {{location}}
    </p>

    <input class="title" ref="title" type="text" placeholder="Your printed title">


    <div class="print">
      <h4 class="title">Hexadecimal</h4>
      <div class="secret">
        {{value?.share}}
      </div>
      <qr class="qrcode" :message="value.share" />
      <hr>
    </div>

 </div>  
  
</template>

<style scoped lang="scss">
  .content{
    max-width: 940px;
    margin: auto;      
    input.title {
      height: 6rem;
      font-size: 3rem;
      border-radius: 0px;
      border: 0;
      border-bottom: 1px solid #eee;
      margin-left: -10px;      
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
      width: 75%;
      display: flex;
      align-items: center;
      @media (max-width:500px) {
        width: 350px;
        margin: 5px auto;
      }
    }


    .qrcode {
      height: 150px!important;
      width: 150px!important;
      border:1px solid #ddd;
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
import Qr from './Qr.vue';

@Options({
  props: {
    value: {
      default: {},
      required: true,
      type: Object
    },
  },
  components: { Qr }
})
export default class HorcruxPrint extends Vue {

  // props
  value!:Horcrux;
  currentDate: Date = new Date();

  //
  // helpers for typescript
  $refs!: {
    title: HTMLInputElement
  }  

  mounted() {
    this.$refs.title.focus()

  }


  get date() {
    return this.currentDate.toLocaleDateString();
  }

  get location (){
    return document.location.href;
  }
}
</script>

