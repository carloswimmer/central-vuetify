<template>
  <nav>
    <v-app-bar
      app
      clipped-left
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <div class="d-flex align-center">
        <v-img
          alt="Logo Prefeitura de Santos"
          class="shrink ml-3"
          contain
          src="../assets/centralservidor-logo-texto.png"
          transition="scale-transition"
          width="140"
        />
      </div>

      <v-spacer></v-spacer>

      <div class="text-center">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn text dark v-on="on">
              <v-icon left>mdi-chevron-down</v-icon>
              Links Úteis
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
        <span class="mr-2">Sair</span>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer 
      dark
      clipped 
      app 
      v-model="drawer" 
      color="primary lighten-3">
      <v-list>
        <v-list-item>
          <v-list-item-avatar class="deep-orange lighten-1">
            <span>CW</span> 
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item class="mb-4">
          <v-list-item-content>
            <v-list-item-title class="title">Carlos Wimmer</v-list-item-title>
            <v-list-item-subtitle>Reg. 30.867-6</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-for="item in items" :key="item.title" router :to="item.route">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

  </nav>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
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
  }
}
</script>

<style>

</style>