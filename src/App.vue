<template>
  <nav id="nav" class="container mg-tabs navigation media-display">
    <ul>
      <li><router-link to="/">Create Identity</router-link> |</li>
      <li><router-link to="/recover">Recover Identity</router-link> |</li>
      <li><router-link to="/wallets">Wallets</router-link> |</li>
      <li><router-link to="/about">About </router-link></li>
    </ul>
  </nav>
  <router-view/>
</template>

<style lang="scss">

.navigation {
  display: flex;
  align-content: center;
  align-items: center;
  height: 40px;
  border-bottom: 2px solid #eee;
  margin-bottom: 10px;

  a {
    font-weight: bold;

    &.router-link-exact-active {
    }
  }
}

.mg-tabs{
  .mg-tabs--items{
    margin-left: 0.2em;
    margin-right: 0.2em;
    padding-left: 0.2em;
    padding-right: 0.2em;      
  }
  ul{
    display: flex;
    text-align: center;
    flex-wrap: nowrap;
    overflow-x: auto;
    list-style: none;
    cursor: pointer;
    margin: 0;    
    @media (max-width:500px) {
      font-size: 12px;
    }
    li{
      font-weight: bold;
      border-bottom: 0.3rem solid transparent;
      color: var(--mg-md-theme-default-tertiary);
      opacity: 0.7;
      flex: 0 0 auto;      
      margin: 0;
      padding: 4px 10px;
      .router-link-active{
        color: var(--md-theme-default-primary);
        border-color: var(--md-theme-default-primary);
        overflow-y: hidden;
        opacity: 1;          
      }
    }
  }
}

</style>
