<template>
  <v-container class="pa-4">
    <Breadcrumbs :items="breadcrumbs" />
    <sectionTitle id="home-title" title="Ejercicios" />

    <v-row v-if="modules.length">
      <v-col v-for="(item,i) in modules" :key="i">
        <ModuleCard
          :title="item.title"
          :subtitle="item.subtitle"
          :icon="item.icon"
          :to="item.to"
          :disabled="item.disabled"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Breadcrumbs from '~/components/core/Breadcrumbs.vue'
import sectionTitle from '~/components/core/sectionTitle.vue'
import ModuleCard from '~/components/core/ModuleCard.vue'

export default {
  components: {
    Breadcrumbs,
    sectionTitle,
    ModuleCard
  },

  data () {
    return {
      breadcrumbs: [
        {
          text: 'Inicio',
          to: { name: 'index' }
        }
      ],
      modules: [
        {
          title: 'Candidatos CRUD',
          subtitle: 'Crear, editar o eliminar candidatos y referencias',
          icon: 'mdi-numeric-1-box',
          to: { name: 'candidates' },
          disabled: false
        },
        {
          title: 'Número Palíndromo',
          subtitle: 'El palíndromo más grande de dos números de 3 dígitos',
          icon: 'mdi-numeric-2-box',
          to: { name: 'palindromic-number' },
          disabled: false
        },
        {
          title: 'Triplete Pitagórico',
          subtitle: 'a + b + c = 1000, encontrar el producto abc',
          icon: 'mdi-numeric-3-box',
          to: { name: 'pythagorean-triplet' },
          disabled: false
        }
      ]
    }
  },

  methods: {
  }
}
</script>

<style lang="scss" scoped>

</style>
