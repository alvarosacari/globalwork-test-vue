<template>
  <v-container class="pa-4">
    <Breadcrumbs :items="breadcrumbs" />
    <sectionTitle id="candidates-title" title="Candidatos" />

    <v-row>
      <v-col>
        <CandidatesDataTable />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Breadcrumbs from '~/components/core/Breadcrumbs.vue'
import sectionTitle from '~/components/core/sectionTitle.vue'
import CandidatesDataTable from '~/components/data_tables/CandidatesDataTable.vue'

export default {
  components: {
    Breadcrumbs,
    sectionTitle,
    CandidatesDataTable
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
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
