<template>
  <v-container class="pa-4">
    <Breadcrumbs :items="breadcrumbs" />
    <sectionTitle id="candidates-title" title="Nuevo candidato" />

    <v-row>
      <v-col>
        <v-card :loading="processingForm">
          <v-card-text class="pa-4">
            <v-form
              id="createCandidateForm"
              ref="createCandidateForm"
              v-model="validForm"
              @submit.prevent="create"
              lazy-validation
            >
              <v-text-field
                v-model="form.name"
                :rules="rules.name"
                outlined
                label="Nombre"
              />
              <v-text-field
                v-model="form.last_name"
                :rules="rules.last_name"
                outlined
                label="Apellidos"
              />
              <v-text-field
                v-model="form.phone"
                :rules="rules.phone"
                outlined
                label="Teléfono ó celular"
              />
              <v-text-field
                v-model="form.address"
                :rules="rules.address"
                outlined
                label="Dirección"
              />
            </v-form>
            <div class="text-center">
              <v-btn
                :disabled="!validForm || processingForm"
                :loading="processingForm"
                color="primary"
                form="createCandidateForm"
                type="submit"
              >
                Guardar
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Breadcrumbs from '~/components/core/Breadcrumbs.vue'
import sectionTitle from '~/components/core/sectionTitle.vue'

export default {
  components: {
    Breadcrumbs,
    sectionTitle
  },

  data () {
    return {
      breadcrumbs: [
        {
          text: 'Inicio',
          to: { name: 'index' }
        },
        {
          text: 'Candidatos',
          to: { name: 'candidates' }
        },
        {
          text: 'Nuevo',
          to: { name: 'candidates-create' }
        }
      ],
      form: {
        name: '',
        last_name: '',
        phone: '',
        address: ''
      },
      validForm: true,
      processingForm: false,
      error: null,
      rules: {
        name: [ v => !!v || 'El nombre es requerido' ],
        last_name: [ v => !!v || 'El apellido es requerido' ],
        phone: [ v => !!v || 'El teléfono o celular es requerido' ],
        address: [ v => !!v || 'La dirección es requerida' ]
      }
    }
  },

  methods: {
    create () {
      if (!this.$refs.createCandidateForm.validate()) { return false }

      this.$snackbar.info('Creando candidato')
      this.processingForm = true
      const data = this.form

      this.$candidateAPI.post({ data })
        .then((response) => {
          this.$snackbar.success('El candidato se ha creado con éxito')
          this.$router.push({ name: 'candidates' })
        })
        .catch((error) => {
          this.$snackbar.error(`Ocurrió un error: ${error.message}`)
          this.error = error
        })
        .finally(() => {
          this.processingForm = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
