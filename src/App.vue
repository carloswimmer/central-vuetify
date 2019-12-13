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
