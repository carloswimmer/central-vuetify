<template>
  <nav>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Logo Prefeitura de Santos"
          class="shrink mr-2"
          contain
          src="../assets/LogoPMS.png"
          transition="scale-transition"
          width="150"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span>Sair</span>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
  </nav>
</template>

<script>
export default {

}
</script>

<style>

</style>