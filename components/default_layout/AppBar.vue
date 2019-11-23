<template>
  <v-app-bar
    :color="$vuetify.theme.dark ? 'grey darken-3' : 'primary'"
    :dark="!$vuetify.theme.dark"
    :clipped-left="clipped"
    fixed
    app
  >
    <v-app-bar-nav-icon @click="toggleNavigationDrawer" />
    <v-toolbar-title>{{ 'Globalwork Frontend Test' }}</v-toolbar-title>
    <v-spacer />

    <v-tooltip bottom>
      <template v-slot:activator="{on}">
        <v-btn v-on="on" icon target="_blank" href="https://github.com/alvarosacari/globalwork-test-vue">
          <v-icon>
            mdi-github-circle
          </v-icon>
        </v-btn>
      </template>
      <span>Ver código</span>
    </v-tooltip>

    <v-tooltip bottom>
      <template v-slot:activator="{on}">
        <v-btn v-on="on" @click="$vuetify.theme.dark = !$vuetify.theme.dark" icon>
          <v-icon>
            mdi-invert-colors
          </v-icon>
        </v-btn>
      </template>
      <span>{{ $vuetify.theme.dark ? 'Usar tema claro' : 'Usar tema oscuro' }}</span>
    </v-tooltip>
  </v-app-bar>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState({
      clipped: state => state.navigationDrawer.clipped,
      linkedIn: state => state.profile.linkedIn,
      github: state => state.profile.github
    })
  },

  methods: {
    ...mapActions({
      toggleNavigationDrawer: 'navigationDrawer/toggleNavigationDrawer'
    })
  }
}
</script>
