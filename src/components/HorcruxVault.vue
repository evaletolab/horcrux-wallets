<template>
 <div v-if="!!value.share" class="content">
    <h1>Horcrux </h1>
    <h3>{{date}} / <span class="bold">v{{value?.version}}</span> </h3>
    <p class="description">        
      Use our Vault SmartContract a simple and secure space to store Horcruxes.
    </p>
    <div class="secret">
      {{value?.base64}}
    </div>

    <form>
      <fieldset>
        <label for="email">email</label>
        <input type="email" placeholder="email@g.com" id="email">
        <label for="pwd">Secret password (min 8 chars)</label>
        <input type="password" placeholder="***" id="pwd" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$
">
        <button class="button-primary" >Generate Vault </button>
        <button class="button-primary" >Publish </button>
      </fieldset>
    </form>

 </div>  
  
</template>

<style scoped lang="scss">
  .content{
    max-width: 400px;
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
export default class HorcruxVault extends Vue {

  // props
  value!:Horcrux;
  currentDate: Date = new Date();



  get date() {
    return this.currentDate.toLocaleString();
  }

}
</script>

