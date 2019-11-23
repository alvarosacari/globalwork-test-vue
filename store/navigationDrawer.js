import {
  TOGGLE_NAVIGATION_DRAWER,
  REPLACE_SHOW_NAVIGATION_DRAWER
} from '~/types/mutation-types'

export const state = () => ({
  showDrawer: false,
  clipped: false,
  miniVariant: false,
  items: [
    {
      title: 'Inicio',
      icon: 'mdi-home',
      to: { name: 'index' }
    },
    {
      title: 'Contacto',
      icon: 'mdi-account-plus',
      to: { name: 'contact' }
    }
  ],
  items2: [
    {
      title: 'Candidatos CRUD',
      icon: 'mdi-numeric-1-box',
      to: { name: 'candidates' }
    },
    {
      title: 'Número palíndromo',
      icon: 'mdi-numeric-2-box',
      to: { name: 'palindromic-number' }
    },
    {
      title: 'Triplete Pitagórico',
      icon: 'mdi-numeric-3-box',
      to: { name: 'pythagorean-triplet' }
    }
  ]
})

export const actions = {
  toggleNavigationDrawer ({ commit }) {
    commit('TOGGLE_NAVIGATION_DRAWER')
  },

  replaceShowNavigationDrawer ({ commit }, payload) {
    commit('REPLACE_SHOW_NAVIGATION_DRAWER', payload)
  }
}

export const mutations = {
  [TOGGLE_NAVIGATION_DRAWER] (state) {
    state.showDrawer = !state.showDrawer
  },

  [REPLACE_SHOW_NAVIGATION_DRAWER] (state, { show }) {
    state.showDrawer = show
  }
}
