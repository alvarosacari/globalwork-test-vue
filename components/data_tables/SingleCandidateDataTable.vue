<template>
  <v-card :loading="loadingCandidate">
    <v-data-table
      :headers="headers"
      :items="[candidate]"
      calculate-widths
      hide-default-footer
    />
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      headers: [
        { text: 'Nombre', value: 'name', sortable: false },
        { text: 'Apellidos', value: 'last_name', sortable: false },
        { text: 'Teléfono/Celular', value: 'phone', sortable: false },
        { text: 'Dirección', value: 'address', sortable: false }
      ],
      candidate: null,
      loadingCandidate: false
    }
  },

  created () {
    const candidateId = this.$route.params.candidateId
    this.getCandidate(candidateId)
  },

  methods: {
    getCandidate (candidateId) {
      this.loadingCandidate = true
      this.$candidateAPI.show({ candidateId })
        .then((response) => {
          this.candidate = response.data.data
        })
        .finally(() => {
          this.loadingCandidate = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
