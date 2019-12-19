<template>
  <nav>
    <v-app-bar
      app
      color="primary lighten-2"
      dark
    >
      <v-app-bar-nav-icon @click.stop="mini = !mini" />
      

      <v-spacer></v-spacer>

      <div class="text-center">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn text dark v-on="on">
              <v-icon left>mdi-chevron-down</v-icon>
              <span class="d-none d-md-flex mr-2">Links Úteis</span>
              <v-icon>mdi-link-variant</v-icon>
            </v-btn>
          </template>
          <v-list class="accent--text">
            <v-list-item 
              v-for="(link, index) in links" 
              :key="index" 
              router 
              :to="link.route"
            >
              <v-list-item-title class="accent--text">
                {{ link.title }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="d-none d-md-flex mr-2">Sair</span>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer 
      dark
      app 
      permanent
      :disable-resize-watcher="false"
      v-model="drawer"
      :mini-variant.sync="mini" 
      color="primary darken-1">
      <v-list>
        <v-list-item>
            <v-img
              alt="Logo Central do Servidor"
              class="shrink my-2"
              contain
              src="../assets/centralservidor-logo.png"
              width="60"
            />
            <v-img
              alt="Logo Central do Servidor"
              class="shrink my-2 ml-1"
              contain
              src="../assets/centralservidor-texto.png"
              width="70"
            />
        </v-list-item>

        <v-list-item class="mb-4">
          <v-list-item-content>
            <v-list-item-title class="title">Carlos Wimmer</v-list-item-title>
            <v-list-item-subtitle>Reg. 30.867-6</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider horizontal></v-divider>

        <v-list-item v-for="item in items" :key="item.title" router :to="item.route">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>

      <template v-slot:append>
        <v-divider horizontal></v-divider>
        <div class="ma-2 d-flex justify-center" @click.stop="mini = !mini">
          <v-btn
            icon
          >
            <v-icon v-if="mini">mdi-chevron-right</v-icon>
            <v-icon v-else>mdi-chevron-left</v-icon>
          </v-btn>

        </div>

      </template>
        
    </v-navigation-drawer>

  </nav>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      mini: true,
      items: [
        { title: 'Declarações', icon: 'mdi-home-currency-usd', route: '/dec' },
        { title: 'Avaliações', icon: 'mdi-file-document-edit-outline', route: '/ava' },
        { title: 'Consignados', icon: 'mdi-bank', route: '/consig' },
        { title: 'Recadastramento', icon: 'mdi-account-card-details-outline', route: '/recad' },
        { title: 'Formulários', icon: 'mdi-ballot-outline', route: '/form' },
      ],
      links: [
        { title: 'WebMail', route: '/dec' },
        { title: 'Perícia Médica', route: '/ava' },
        { title: 'Holerite', route: '/consig' },
        { title: 'Contagem de Tempo', route: '/recad' },
        { title: 'Estatuto', route: '/form' },
        { title: 'Portal do Servidor', route: '/port' },
      ]
    }
  },
  created() {
    this.drawer = window.innerWidth >= 1264
  }
}
</script>

<style>

</style>