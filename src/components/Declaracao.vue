<template>
  <v-container mt-3>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      bottom
      color="success"
    >
      Sua declaração foi incluida com sucesso
      <v-btn
        color="white"
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>

    <v-data-table
      :headers="headers"
      :items="declaracoes"
      hide-default-footer
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

      <template v-slot:item.data="{ item }">
        <span>{{ formatDateOnTable(item.data) }}</span>
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
          @click="openModal('Deletar', item)"
        >
          mdi-delete
        </v-icon>
      </template>
      
    </v-data-table>

    <v-speed-dial
      v-model="fab"
      fixed
      bottom
      right
      direction="top"
      transition="slide-y-reverse-transition"
    >
      <template v-slot:activator>
        <v-btn
          v-model="fab"
          color="deep-orange"
          dark
          fab
        >
          <v-icon v-if="fab">mdi-close</v-icon>
          <v-icon v-else>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-tooltip left>
        <template v-slot:activator="{ on }">
          <v-btn
            fab
            dark
            small
            color="accent"
            v-on="on"
            @click.stop="dialog = true"
          >
            <v-icon>mdi-pencil-plus</v-icon>
          </v-btn>
        </template>
        <span>Declarar</span>
      </v-tooltip>

      <v-tooltip left>
        <template v-slot:activator="{ on }">
          <v-btn
            fab
            dark
            small
            color="default"
            v-on="on"
            @click="openModal('Sem Bens')"
          >
            <v-icon>mdi-currency-usd-off</v-icon>
          </v-btn>
        </template>
        <span>Sem Bens</span>
      </v-tooltip>

    </v-speed-dial>

    <v-dialog 
      v-model="dialog" 
      max-width="500px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-form ref="form">
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field 
                  v-model="editedItem.ano" 
                  label="Ano Base"
                  :rules="inputRules"
                />
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-menu v-model="menu" :close-on-content-click="false" min-width="290">
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        :value="dateFormatted"
                        clearable
                        label="Data da Declaração"
                        v-on="on"
                        @click:clear="editedItem.data = null"
                        :rules="inputRules"
                      ></v-text-field>
                    </template>
                    <v-date-picker 
                      v-model="editedItem.data" 
                      @change="menu = false"
                    />
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field 
                    v-model="editedItem.situacao" 
                    label="Situação"
                    :rules="inputRules"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="default" text @click="close('dialog')">Cancelar</v-btn>
          <v-btn color="accent" text @click="save('dialog')">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="confirm"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">{{ confirmHeadeline }}</v-card-title>

        <v-card-text>
          {{ confirmContent }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="default"
            text
            @click="confirm = false"
          >
            Não
          </v-btn>

          <v-btn
            color="accent"
            text
            @click="agree(confirmAction)"
          >
            Sim
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
  import moment from 'moment'

  export default {
    name: 'declaracao',
    data: () => ({
      dialog: false,
      fab: false,
      menu: false,
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
        data: moment().format('YYYY-MM-DD'),
        situacao: '',
      },
      defaultItem: {
        ano: '',
        data: moment().format('YYYY-MM-DD'),
        situacao: '',
      },
      inputRules: [
        v => !!v || 'Preenchimento obrigatório',
      ],
      snackbar: false,
      timeout: 4500,
      confirm: false,
      confirmHeadeline: '',
      confirmContent: '',
      confirmAction: ''
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nova Declaração' : 'Editar Declaração'
      },
      dateFormatted () {
        return this.editedItem.data ? moment(this.editedItem.data).format('DD/MM/YYYY') : ''
      },
    },

    watch: {
      dialog (val) {
        val || this.close('dialog')
      },
      confirm (val) {
        val || this.close('confirm')
      }
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.declaracoes = [
          {
            ano: '2018',
            data: '2019-11-18',
            situacao: 'ENTREGUE',
            bens: [
              {
                tipo: 'APARTAMENTO',
                valor: '133.000,00',
                descricao: 'PRAIA DO TOMBO'
              },
              {
                tipo: 'CARRO',
                valor: '33.000,00',
                descricao: 'OPALA'
              },
              {
                tipo: 'APLICAÇÃO',
                valor: '93.000,00',
                descricao: 'AÇÕES'
              }
            ]
          },
          {
            ano: '2017',
            data: '2018-09-11',
            situacao: 'ENTREGUE',
            bens: [
              {
                tipo: 'APARTAMENTO',
                valor: '133.000,00',
                descricao: 'PRAIA DO TOMBO'
              },
              {
                tipo: 'CARRO',
                valor: '33.000,00',
                descricao: 'OPALA'
              },
              {
                tipo: 'APLICAÇÃO',
                valor: '93.000,00',
                descricao: 'AÇÕES'
              }
            ]
          },
          {
            ano: '2016',
            data: '2017-04-22',
            situacao: 'ENTREGUE',
            bens: [
              {
                tipo: 'APARTAMENTO',
                valor: '133.000,00',
                descricao: 'PRAIA DO TOMBO'
              },
              {
                tipo: 'CARRO',
                valor: '33.000,00',
                descricao: 'OPALA'
              },
              {
                tipo: 'APLICAÇÃO',
                valor: '93.000,00',
                descricao: 'AÇÕES'
              }
            ]
          },
        ]
      },

      formatDateOnTable (date) {
        return moment(date).format('DD/MM/YYYY')
      },

      editItem (item) {
        this.editedIndex = this.declaracoes.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.declaracoes.indexOf(item)
        this.declaracoes.splice(index, 1)
      },

      close (modal) {
        modal === 'dialog' ? this.dialog = false : this.confirm = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save (modal) {
        if (this.$refs.form.validate()) {
          if (this.editedIndex > -1) {
            Object.assign(this.declaracoes[this.editedIndex], this.editedItem)
          } else {
            this.declaracoes.push(this.editedItem)
          }
          this.snackbar = true
          this.close(modal)
        }
      },

      openModal (action, item) {
        if (action === 'Deletar') {
          this.editedItem = item
          this.confirmHeadeline = 'Deletar'
          this.confirmContent = 'Você tem certeza que deseja deletar essa declaração?'
        } else {
          this.confirmHeadeline = 'Sem Bens'
          this.confirmContent = 'Você confirma não possuir bens a declarar?'
        }
          this.confirmAction = action
          this.confirm = true
      },

      agree (action) {
        if (action === 'Deletar') {
          this.deleteItem(this.editedItem)
          this.close('confirm')
        } else {
          this.editedItem.ano = '2019'
          this.editedItem.data = moment().format('YYYY-MM-DD')
          this.editedItem.situacao = 'ENTREGUE'
          this.declaracoes.push(this.editedItem)
          this.snackbar = true
          this.close('confirm')
        }
      }
    },
  }
</script>
