<template>
  <v-container mt-3>
    <v-data-table
      :headers="headers"
      :items="declaracoes"
      sort-by="ano"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Declarações de Bens</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>

          <v-spacer></v-spacer>

          <v-tooltip left>
            <template v-slot:activator="{ on }">
              <v-btn
                class="ma-2"
                outlined
                small
                fab
                color="default"
                v-on="on"
              >
                <v-icon>mdi-help</v-icon>
              </v-btn>
            </template>
            <span>FAQ</span>
          </v-tooltip>

        </v-toolbar>
      </template>

      <template v-slot:item.acao="{ item }">
        <v-icon
          small
          class="mr-4"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          color="error"
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      
    </v-data-table>

    <v-dialog v-model="dialog" max-width="500px">
      <template v-slot:activator="{ on }">
        <v-btn 
          fab
          large
          dark
          fixed
          bottom
          right
          color="accent"
          v-on="on">
          <v-icon>
            mdi-plus
          </v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.ano" label="Ano Base"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.data" label="Data da Declaração"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.situacao" label="Situação"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="default" text @click="close">Cancelar</v-btn>
          <v-btn color="accent" text @click="save">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
  export default {
    name: 'declaracao',
    data: () => ({
      dialog: false,
      headers: [
        {
          text: 'Ano Base',
          align: 'left',
          value: 'ano',
        },
        { text: 'Data da Declaração', value: 'data' },
        { text: 'Situação', value: 'situacao' },
        { text: 'Ação', value: 'acao', align: 'center', sortable: false },
      ],
      declaracoes: [],
      editedIndex: -1,
      editedItem: {
        ano: '',
        data: '',
        situacao: '',
      },
      defaultItem: {
        ano: '',
        data: '',
        situacao: '',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nova Declaração' : 'Editar Declaração'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.declaracoes = [
          {
            ano: '2018',
            data: '18/11/2019',
            situacao: 'ENTREGUE',
          },
          {
            ano: '2017',
            data: '11/09/2018',
            situacao: 'ENTREGUE',
          },
          {
            ano: '2016',
            data: '22/04/2017',
            situacao: 'ENTREGUE',
          },
        ]
      },

      editItem (item) {
        this.editedIndex = this.declaracoes.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.declaracoes.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.declaracoes.splice(index, 1)
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.declaracoes[this.editedIndex], this.editedItem)
        } else {
          this.declaracoes.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>
