<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/client">Cliente</router-link> |
    <router-link to="/product">Producto</router-link> |
    <router-link to="/login">Carrito</router-link> |
    <router-link to="/cart">Cart</router-link>
  </nav>
  <router-view/>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
  //background-color: rgb(200, 204, 248);
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
