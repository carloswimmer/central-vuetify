<template>
  <v-app>
    <navbar />

    <v-content class="grey--text text--darken-3">
      <declaracao />
    </v-content>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar';
import Declaracao from './components/Declaracao';

export default {
  name: 'App',

  components: {
    Navbar,
    Declaracao
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