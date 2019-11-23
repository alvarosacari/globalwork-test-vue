<template>
  <v-card :loading="loadingData">
    <v-app-bar flat>
      <v-text-field
        v-model="search"
        dense
        outlined
        placeholder="Buscar"
        hide-details
        prepend-inner-icon="mdi-magnify"
        clearable
      />
      <v-btn
        :to="{ name: 'candidates-create' }"
        color="primary"
        class="ml-2 text-capitalize"
      >
        Agregar
      </v-btn>
    </v-app-bar>

    <v-data-table
      :headers="headers"
      :items="candidates"
      :search="search"
      calculate-widths
    >
      <template v-slot:item.name="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              v-on="on"
              :to="{ name: 'candidates-candidateId-references', params: {candidateId: item.id} }"
              color="primary"
              class="text-capitalize"
              text
            >
              {{ item.name }}
            </v-btn>
          </template>
          <span>Ver referencias laborales</span>
        </v-tooltip>
      </template>
      <template v-slot:item.action="{ item }">
        <div class="mx-n3">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                v-on="on"
                :to="{ name: 'candidates-candidateId-references', params: {candidateId: item.id} }"
                color="info"
                icon
              >
                <v-icon>
                  mdi-eye
                </v-icon>
              </v-btn>
            </template>
            <span>Ver referencias laborales</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" :to="{ name: 'candidates-candidateId', params: {candidateId: item.id} }" color="info" icon>
                <v-icon>
                  mdi-pencil
                </v-icon>
              </v-btn>
            </template>
            <span>Editar</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" @click="deleteCandidate(item)" color="error" icon>
                <v-icon>
                  mdi-delete
                </v-icon>
              </v-btn>
            </template>
            <span>Eliminar</span>
          </v-tooltip>
        </div>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      headers: [
        { text: 'Nombre', value: 'name' },
        { text: 'Apellidos', value: 'last_name' },
        { text: 'Teléfono/Celular', value: 'phone' },
        { text: 'Dirección', value: 'address' },
        { text: 'Acciones', value: 'action', sortable: false, width: 125 }
      ],
      search: '',
      candidates: [],
      loadingData: false
    }
  },

  created () {
    this.getCandidates()
  },

  methods: {
    getCandidates () {
      const params = {
        include: 'laboral_references'
      }
      this.loadingData = true
      this.$candidateAPI.index({ params })
        .then((response) => {
          this.candidates = response.data.data
        })
        .finally(() => {
          this.loadingData = false
        })
    },

    deleteCandidate (candidate) {
      const candidateId = candidate.id
      const referencesLength = candidate.laboral_references.length

      let title = '¿Está seguro que desea eliminar al candidato?'
      if (referencesLength) {
        title = `El candidato tiene ${referencesLength} Referencias laborales ¿Está seguro que desea eliminarlo?`
      }

      this.$swal({
        title,
        text: 'Esta acción no se podrá revertir',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'red',
        confirmButtonText: 'Si, eliminar',
        cancelButtonText: 'Cancelar'
      })
        .then((result) => {
          if (result.value) {
            this.$snackbar.info('Eliminando candidato')
            this.$candidateAPI.delete({ candidateId })
              .then((response) => {
                this.$snackbar.success('El candidato ha sido eliminado correctamente')
                this.getCandidates()
              })
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
