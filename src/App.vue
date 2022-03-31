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
  <footer>
    <span>You can use this tool without having to be online.</span>
    <div>Horcrux is an educational project made with <span class="pink">❤️</span></div>
  </footer>
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
footer{
  margin-top: 50px;
  padding: 30px 0;
  border-top: 1px solid #ddd;
}



</style>
