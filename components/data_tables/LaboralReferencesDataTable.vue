<template>
  <v-card :loading="loadingReferences">
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
        :to="{ name: 'candidates-candidateId-references-create', params: { id: $route.params.candidateId } }"
        color="primary"
        class="ml-2 text-capitalize"
      >
        Agregar
      </v-btn>
    </v-app-bar>

    <v-data-table
      :headers="headers"
      :items="references"
      :search="search"
      calculate-widths
    >
      <template v-slot:item.start_at="{ item }">
        {{ formatDate(item.start_at) }}
      </template>
      <template v-slot:item.leave_at="{ item }">
        {{ formatDate(item.leave_at) }}
      </template>
      <template v-slot:item.action="{ item }">
        <div class="mx-n3">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                v-on="on"
                :to="{ name: 'candidates-candidateId-references-referenceId', params: { candidateId: item.candidate_id, referenceId: item.id } }"
                color="info"
                icon
              >
                <v-icon>
                  mdi-pencil
                </v-icon>
              </v-btn>
            </template>
            <span>Editar</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" @click="deleteReference(item)" color="error" icon>
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
        { text: 'Empresa', value: 'company_name' },
        { text: 'Persona de contacto', value: 'contact_name' },
        { text: 'Desde', value: 'start_at' },
        { text: 'Hasta', value: 'leave_at' },
        { text: 'Acciones', value: 'action', sortable: false, width: 90 }
      ],
      search: '',
      references: [],
      loadingReferences: false
    }
  },

  created () {
    this.getReferences()
  },

  methods: {
    formatDate (date) {
      if (!date) { return null }

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },

    getReferences () {
      const candidateId = this.$route.params.candidateId
      this.loadingReferences = true
      this.$candidateAPI.showLaboralReferences({ candidateId })
        .then((response) => {
          this.references = response.data.data
        })
        .finally(() => {
          this.loadingReferences = false
        })
    },

    deleteReference (reference) {
      const referenceId = reference.id

      this.$swal({
        title: '¿Está seguro que desea eliminar la referencia laboral?',
        text: 'Esta acción no se podrá revertir',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'red',
        confirmButtonText: 'Si, eliminar',
        cancelButtonText: 'Cancelar'
      })
        .then((result) => {
          if (result.value) {
            this.$snackbar.info('Eliminando referencia laboral')
            this.$laboralReferenceAPI.delete({ referenceId })
              .then((response) => {
                this.$snackbar.success('La referencia laboral ha sido eliminado correctamente')
                this.getReferences()
              })
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
