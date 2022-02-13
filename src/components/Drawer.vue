<template>
<!--- SOURCE -->
  <section class="drawer " :class="{'open primary':open,'primary':!open}" @click="onToggle">
    <!-- <PRIcons name="sources-bar"  /> -->
    <div ref="container" class="content">
      <slot />
    </div>        
  </section>
</template>

<script lang="ts">

import { Options, Vue } from 'vue-class-component';

@Options({
})
export default class Drawer extends Vue {
  open = false;



  onToggle(){
    this.open = !this.open;
    if(this.open){
      document.body.classList.add('body-lock');
    }else{
      document.body.classList.remove('body-lock');
      this.$emit("close", null);
    }
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
    height: calc(95vh);
    text-align: center;
    border-radius: 20px 20px 0 0;
    padding: 0 5px;    
    transform: translateY(calc(95vh));
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
