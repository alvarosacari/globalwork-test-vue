<template>
  <v-container class="pa-4">
    <Breadcrumbs :items="breadcrumbs" />

    <sectionTitle id="candidate-title" title="Candidato" />
    <v-row>
      <v-col>
        <SingleCandidateDataTable />
      </v-col>
    </v-row>

    <sectionTitle id="references-title" title="Referencias laborales" />
    <v-row>
      <v-col>
        <LaboralReferencesDataTable />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Breadcrumbs from '~/components/core/Breadcrumbs.vue'
import sectionTitle from '~/components/core/sectionTitle.vue'
import LaboralReferencesDataTable from '~/components/data_tables/LaboralReferencesDataTable.vue'
import SingleCandidateDataTable from '~/components/data_tables/SingleCandidateDataTable.vue'

export default {
  components: {
    Breadcrumbs,
    sectionTitle,
    LaboralReferencesDataTable,
    SingleCandidateDataTable
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
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
