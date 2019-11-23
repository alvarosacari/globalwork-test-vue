<template>
  <v-img :aspect-ratio="16/9" :src="require($vuetify.theme.dark ? '~/assets/images/code.jpeg' : '~/assets/images/material.jpg')">
    <v-row
      :class="{
        lightbox: !$vuetify.theme.dark,
        'lightbox-dark': $vuetify.theme.dark,
      }"
      align="end"
      class="fill-height"
    >
      <v-col class="pb-0">
        <v-list dark class="pa-0" dense>
          <v-list-item two-line>
            <v-list-item-avatar color="primary" class="mr-4">
              <v-img :src="require('~/assets/images/avatar.png')" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="name" />
              <v-list-item-subtitle v-text="email" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-img>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      name: state => state.profile.name,
      email: state => state.profile.email
    })
  },

  methods: {
  }
}
</script>

<style lang="scss" scoped>
  .lightbox {
    box-shadow: 0 0 20px inset rgba(0, 0, 0, 0.2);
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 72px);
  }
  .lightbox-dark {
    box-shadow: 0 0 20px inset rgba(0, 0, 0, 0.2);
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, transparent 135px);
  }
</style>
