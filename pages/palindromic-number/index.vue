<template>
  <v-container class="pa-4">
    <Breadcrumbs :items="breadcrumbs" />
    <sectionTitle id="number-title" title="Número palíndromo" />

    <h3 class="mt-5 mb-4">
      Ejemplo (El palíndromo más grande hecho del producto de dos números de 2 dígitos):
    </h3>

    <v-card>
      <v-simple-table>
        <thead>
          <tr>
            <th class="text-left">
              # Dígitos
            </th>
            <th class="text-left">
              Palíndromo
            </th>
            <th class="text-left">
              Factores
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-left">
              {{ example.digits }}
            </td>
            <td class="text-left">
              {{ example.palindrome }}
            </td>
            <td class="text-left">
              {{ `${example.factor1} * ${example.factor2}` }}
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-card>

    <h3 class="mt-5 mb-4">
      Encontrar el palíndromo más grande hecho del producto de dos números de 3 dígitos
    </h3>

    <v-card>
      <v-simple-table>
        <thead>
          <tr>
            <th class="text-left">
              # Dígitos
            </th>
            <th class="text-left">
              Palíndromo
            </th>
            <th class="text-left">
              Factores
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-left">
              <div style="width:150px">
                <v-text-field
                  v-model="size"
                  :rules="rules.size"
                  class="my-4"
                  outlined
                  prefix="# Dígitos ="
                  dense
                  hide-details
                  type="number"
                  autofocus
                />
              </div>
            </td>
            <td class="text-left">
              <span v-if="size > 0 && size <=3">
                {{ largestPalindrome.palindrome }}
              </span>
            </td>
            <td class="text-left">
              <span v-if="size > 0 && size <=3">
                {{ `${largestPalindrome.factor1} * ${largestPalindrome.factor2}` }}
              </span>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-card>
  </v-container>
</template>

<script>
import { mask } from 'vue-the-mask'
import Breadcrumbs from '~/components/core/Breadcrumbs.vue'
import sectionTitle from '~/components/core/sectionTitle.vue'

export default {
  directives: {
    mask
  },

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
          text: 'Número palíndromo',
          to: { name: 'palindromic-number' }
        }
      ],
      example: {
        digits: 2,
        palindrome: 9009,
        factor1: 91,
        factor2: 99
      },
      size: 3,
      palindromes: [],
      rules: {
        size: [
          v => !!v || 'El tamaño es requerido',
          v => v > 0 || 'El tamaño debe ser mayor que 0',
          v => v <= 3 || 'El tamaño debe ser menor que 3'
        ]
      }
    }
  },

  computed: {
    largestPalindrome () {
      const palindromes = this.palindromes.map(item => item.palindrome)
      const largestPalindrome = Math.max.apply(Math, palindromes)
      return this.palindromes.find(item => item.palindrome === largestPalindrome)
    }
  },

  watch: {
    size (newValue, oldValue) {
      if (parseInt(newValue) < 1 || parseInt(newValue) > 3) { return false }
      this.getPalindromes()
    }
  },

  created () {
    this.getPalindromes()
  },

  methods: {
    getMaxNumber () {
      const size = parseInt(this.size)
      let number = '9'

      for (let i = 0; i < size - 1; i++) {
        number += '9'
      }

      return parseInt(number)
    },

    getMinNumber () {
      const size = parseInt(this.size)
      let number = '1'

      for (let i = 0; i < size - 1; i++) {
        number += '0'
      }

      return parseInt(number)
    },

    getPalindromes () {
      const max = this.getMaxNumber()
      const min = this.getMinNumber()
      this.palindromes = []

      for (let i = max; i > min; i--) {
        for (let j = max; j > min; j--) {
          const multiplication = j * i

          if (this.isPalindrome(multiplication)) {
            this.palindromes.push({
              palindrome: multiplication,
              factor1: j,
              factor2: i
            })
          }
        }
      }
    },

    isPalindrome (number) {
      return number.toString() === number.toString().split('').reverse().join('')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
