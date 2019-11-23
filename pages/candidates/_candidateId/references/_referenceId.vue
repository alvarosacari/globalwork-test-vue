<template>
  <v-container class="pa-4">
    <Breadcrumbs :items="breadcrumbs" />
    <sectionTitle id="reference-title" title="Editar referencia" />

    <v-row>
      <v-col>
        <v-card :loading="processingForm || loadingData">
          <v-card-text class="pa-4">
            <v-form
              id="updateReferenceForm"
              ref="updateReferenceForm"
              v-model="validForm"
              @submit.prevent="update"
              lazy-validation
            >
              <v-text-field
                v-model="form.company_name"
                :rules="rules.company_name"
                outlined
                label="Empresa"
              />
              <v-text-field
                v-model="form.contact_name"
                :rules="rules.contact_name"
                outlined
                label="Persona de contacto"
              />

              <v-row>
                <v-col cols="12" sm="6" class="pt-0">
                  <v-menu
                    v-model="startAtPicker"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-on="on"
                        :value="formatDate(form.start_at)"
                        :rules="rules.start_at"
                        outlined
                        readonly
                        label="Fecha de inicio"
                        hint="Formato DD/MM/AAAA"
                        persistent-hint
                        append-icon="mdi-calendar-range"
                      />
                    </template>
                    <v-date-picker v-model="form.start_at" @input="startAtPicker = false" no-title />
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="6" class="pt-0">
                  <v-menu
                    v-model="leaveAtPicker"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-on="on"
                        :value="formatDate(form.leave_at)"
                        :rules="rules.leave_at"
                        outlined
                        readonly
                        label="Fecha de finalización"
                        hint="Formato DD/MM/AAAA"
                        persistent-hint
                        append-icon="mdi-calendar-range"
                      />
                    </template>
                    <v-date-picker v-model="form.leave_at" @input="leaveAtPicker = false" no-title />
                  </v-menu>
                </v-col>
              </v-row>
            </v-form>
            <div class="text-center">
              <v-btn
                :disabled="!validForm || processingForm"
                :loading="processingForm"
                color="primary"
                form="updateReferenceForm"
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
          text: 'Referencias laborales',
          to: { name: 'candidates-candidateId-references', params: { candidateId: this.$route.params.candidateId } }
        },
        {
          text: 'Editar',
          to: { name: 'candidates-candidateId-references-referenceId', params: { candidateId: this.$route.params.candidateId, referenceId: this.$route.params.referenceId } }
        }
      ],
      form: {
        candidate_id: this.$route.params.candidateId,
        company_name: '',
        contact_name: '',
        start_at: '',
        leave_at: ''
      },
      loadingData: false,
      validForm: true,
      processingForm: false,
      error: null,
      rules: {
        company_name: [ v => !!v || 'La empresa es requerida' ],
        contact_name: [ v => !!v || 'La persona de contacto es requerida' ],
        start_at: [ v => !!v || 'La fecha de inicio es requerida' ],
        leave_at: [ v => !!v || 'La fecha de finalización es requerida' ]
      },
      startAtPicker: false,
      leaveAtPicker: false
    }
  },

  created () {
    this.loadingData = true
    this.$laboralReferenceAPI.show({ referenceId: this.$route.params.referenceId })
      .then((response) => {
        const reference = response.data.data

        this.form.company_name = reference.company_name
        this.form.contact_name = reference.contact_name
        this.form.start_at = reference.start_at
        this.form.leave_at = reference.leave_at
      })
      .finally(() => {
        this.loadingData = false
      })
  },

  methods: {
    formatDate (date) {
      if (!date) { return null }

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },

    update () {
      if (!this.$refs.updateReferenceForm.validate()) { return false }

      this.$snackbar.info('Actualizando referencia laboral')
      this.processingForm = true

      const referenceId = this.$route.params.referenceId
      const data = this.form

      this.$laboralReferenceAPI.put({ referenceId, data })
        .then((response) => {
          this.$snackbar.success('La referencia laboral ha sido actualizada con éxito')
          this.$router.push({ name: 'candidates-candidateId-references', params: { candidateId: this.$route.params.candidateId } })
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
