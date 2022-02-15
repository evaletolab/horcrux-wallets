<template>
<!--- SOURCE -->
  <section class="drawer " :class="{'open primary':open,'primary':!open}" @click="onClose(false)">
    <button class="icon" v-if="closeButton" @click="onClose(true)"></button>
    <div ref="container" class="content">
      <slot />
    </div>        
  </section>
</template>

<script lang="ts">

import { Options, Vue } from 'vue-class-component';

@Options({
 props: {
    closeButton: {
      default: false,
      type: Boolean
    },
 }  
})
export default class Drawer extends Vue {
  open = false;
  closeButton!:boolean;

  onClose(button?:boolean){
    //
    // only quit on click button 
    if(this.closeButton && !button) {
      return;
    }

    this.open=false;
    document.body.classList.remove('body-lock');
    this.$emit("close", null);
  }


  onOpen(){
    this.open=true;
    document.body.classList.add('body-lock');
  }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  section.drawer {
    background-color: var(--md-theme-default-primary);
    color: var(--md-theme-default-primary-text);
    position: fixed;
    z-index: 100;
    bottom: 0;
    left:5px;
    height: calc(98vh);
    text-align: center;
    border-radius: 20px 20px 0 0;
    padding: 0 5px;    
    transform: translateY(calc(98vh));
    transition: all 200ms;     
    box-shadow: 0 0 0px 1px #ddd;
    width: calc( 100vw - 10px );
    margin-left: auto;
    margin-right: auto;
  }  
  @media print {
    section.drawer{
      box-shadow: none!important;
      height: 100vh!important;
      top:0;
      width: 100vw;
      background: white!important;
      color: black!important;
    }
    
  } 

  @media (min-width:426px) {
    section.drawer.open {
      transform: translateY(45px)!important;
    }
  }

  section.drawer.open {
    transform: translateY(10px);
  }
  section.drawer svg {
    width: 55px;
    margin-top: -27px;
    width: auto;
    margin-top: 10px;
    height: 55px;
    transform: translateY(-64px) translateX(0px);
  }

  section.drawer nav{
    width: 40px;
    height: 3px;
    -background: rgba(255, 255, 255,.8);
    margin: auto;
    margin-top: 8px;
    display: none;
  }
  section.drawer div.content{    
    text-align: left;
    padding: 10px 20px;              
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    height: 100%;
    transition: all 200ms;

  }

  section.drawer div.content h3{
    width: 100%;
    text-align: center;
    text-transform: uppercase;
    font-size: 14px;
    margin-bottom: 30px;    
  }

  section.drawer div.content  /deep/ a{
    font-weight: 600;
  }

</style>
