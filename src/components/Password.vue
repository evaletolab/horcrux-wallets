<template>
  <div>
    <div>
      <label>{{ label }}</label>
      <input type="password"  @input="password = $event.target.value"
        _pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$" autocomplete="new-password" autocorrect="off" autocapitalize="off" spellcheck="false"/>
      <div class="strenght">
        <span class="green" :class="{hide:(score!==4)}">Strength: Strong!</span>
        <span class="yellow" :class="{hide:(score!==3)}">Strength: Medium!</span>
        <span class="orange" :class="{hide:(score!==2)}">Strength: Weak!</span>
        <span class="red" :class="{hide:(score!==1)}">Your password must be at least 6 characters long.</span>
      </div>

    </div>
  </div>
</template>

<style scoped lang="scss">
  input{
    margin-bottom: 3px!important;
  }

  .strenght{
    margin-bottom: 15px!important;
    display: flex;
    justify-content: space-between;
    .pad{
      width: 24.5%;
      height: 4px;
      border-radius: 3px;
      display: block;    
    }
    .red{
      color: #ff7171;
    }
    .orange{
      color: orange;
    }
    .yellow{
      color: rgb(136, 202, 38);
    }
    .green{
      color: rgb(102, 168, 102);
    }

    .gray{
      color: rgb(141, 140, 140);
    }

  }
</style>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

import zxcvbn from 'zxcvbn-typescript';

//
// two ways binding 
// https://www.digitalocean.com/community/tutorials/how-to-add-v-model-support-to-custom-vue-js-components
@Options({
  props: {
    label: {
      default: "",
      required: true,
      type: String,
    },
    value: {
      type: String,
    },
  },
})
export default class Password extends Vue {
  score = 0;
  label!: string;
  value!: string;

  get password() {
    return this.value;
  }
  set password(value) {
    this.score = zxcvbn(value||'').score;
    this.$emit('value', value);   
    this.$emit('score', this.score);   
  }
}
</script>

