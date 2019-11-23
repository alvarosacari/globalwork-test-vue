<template>
  <v-container class="pa-4">
    <Breadcrumbs :items="breadcrumbs" />
    <sectionTitle id="references-title" title="Editar candidato" />

    <v-row>
      <v-col>
        <v-card :loading="processingForm || loadingData">
          <v-card-text class="pa-4">
            <v-form
              id="updateCandidateForm"
              ref="updateCandidateForm"
              v-model="validForm"
              @submit.prevent="update"
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
                form="updateCandidateForm"
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
import { mapState } from 'vuex'
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
          text: 'Editar',
          to: { name: 'candidates-candidateId', params: { candidateId: this.$route.params.candidateId } }
        }
      ],
      form: {
        name: '',
        last_name: '',
        phone: '',
        address: ''
      },
      loadingData: false,
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

  computed: {
    ...mapState({
    })
  },

  created () {
    this.loadingData = true
    this.$candidateAPI.show({ candidateId: this.$route.params.candidateId })
      .then((response) => {
        const candidate = response.data.data

        this.form.name = candidate.name
        this.form.last_name = candidate.last_name
        this.form.phone = candidate.phone
        this.form.address = candidate.address
      })
      .finally(() => {
        this.loadingData = false
      })
  },

  methods: {
    update () {
      if (!this.$refs.updateCandidateForm.validate()) { return false }

      this.$snackbar.info('Actualizando candidato')
      this.processingForm = true

      const candidateId = this.$route.params.candidateId
      const data = this.form

      this.$candidateAPI.put({ candidateId, data })
        .then((response) => {
          this.$snackbar.success('El candidato ha sido actualizado con éxito')
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
