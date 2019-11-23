<template>
  <v-container class="pa-4">
    <Breadcrumbs :items="breadcrumbs" />
    <sectionTitle id="create-referece-title" title="Nueva referencia laboral" />

    <v-row>
      <v-col>
        <v-card :loading="processingForm">
          <v-card-text class="pa-4">
            <v-form
              id="createReferenceForm"
              ref="createReferenceForm"
              v-model="validForm"
              @submit.prevent="create"
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
                form="createReferenceForm"
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
          text: 'Nuevo',
          to: { name: 'candidates-candidateId-references', params: { candidateId: this.$route.params.candidateId } }
        }
      ],
      form: {
        candidate_id: this.$route.params.candidateId,
        company_name: '',
        contact_name: '',
        start_at: '',
        leave_at: ''
      },
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

  methods: {
    formatDate (date) {
      if (!date) { return null }

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },

    create () {
      if (!this.$refs.createReferenceForm.validate()) { return false }

      this.$snackbar.info('Creando referencia laboral')
      this.processingForm = true
      const data = this.form

      this.$laboralReferenceAPI.post({ data })
        .then((response) => {
          this.$snackbar.success('La referencia laboral se ha creado con éxito')
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
