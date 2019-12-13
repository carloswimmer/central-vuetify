<template>
  <v-app>
    <navbar />

    <v-content>
      <HelloWorld/>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar';
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    Navbar,
    HelloWorld
  },

  data() {
    return {

    }
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Open+Sans|Open+Sans:600|Open+Sans:700|Open+Sans:800');

body {
  font-family: 'Open Sans', sans-serif !important;
  color: #666 !important;
}
</style>