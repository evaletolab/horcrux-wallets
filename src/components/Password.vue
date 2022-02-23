<template>
  <div>
    <div>
      <label>{{ label }}</label>
      <input type="password"  @input="password = $event.target.value"
        _pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$" autocomplete="new-password" autocorrect="off" autocapitalize="off" spellcheck="false"/>
      <div class="strenght">
        <span class="pad"
          :class="{
            red: score <= 1,
            orange: score == 2,
            yellow: score == 3,
            green: score == 4,
          }"
        ></span>
        <span class="pad"
          :class="{
            gray: score <= 1,
            orange: score == 2,
            yellow: score == 3,
            green: score == 4,
          }"
        ></span>
        <span class="pad"
          :class="{
            gray: score <= 2,
            yellow: score == 3,
            green: score == 4,
          }"
        ></span>
        <span class="pad"
          :class="{
            gray: score <= 3,
            green: score == 4,
          }"
        ></span>
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
      background: #ff7171;
    }
    .orange{
      background: orange;
    }
    .yellow{
      background: greenyellow;
    }
    .green{
      background: lightgreen;
    }

    .gray{
      background: #eee;
    }

  }
</style>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

import { $wallet, Horcrux } from "../services";
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
    this.$emit('input', value);   
    this.$emit('score', this.score);   
  }
}
</script>

