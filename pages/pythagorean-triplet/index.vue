<template>
  <v-container class="pa-4">
    <Breadcrumbs :items="breadcrumbs" />
    <sectionTitle id="number-title" title="Triplete Pitagórico" />

    <v-row>
      <v-col>
        <code>a<sup>2</sup> + b<sup>2</sup> = c<sup>2</sup></code>
        <h3 class="mt-5 mb-4">
          Ejemplo:
        </h3>

        <v-card>
          <v-simple-table>
            <thead>
              <tr>
                <th class="text-left">
                  Triplete Pitagórico
                </th>
                <th class="text-left">
                  a + b + c
                </th>
                <th class="text-left">
                  a
                </th>
                <th class="text-left">
                  b
                </th>
                <th class="text-left">
                  c
                </th>
                <th class="text-left">
                  a * b * c
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="text-left">
                  {{ tripleExample.a }}<sup>2</sup> + {{ tripleExample.b }}<sup>2</sup> = {{ tripleExample.c }}<sup>2</sup>
                </td>
                <td class="text-left">
                  {{ `${tripleExample.a} + ${tripleExample.b} + ${tripleExample.c} = ${tripleExample.a + tripleExample.b + tripleExample.c}` }}
                </td>
                <td class="text-left">
                  {{ tripleExample.a }}
                </td>
                <td class="text-left">
                  {{ tripleExample.b }}
                </td>
                <td class="text-left">
                  {{ tripleExample.c }}
                </td>
                <td class="text-left">
                  {{ `${tripleExample.a} * ${tripleExample.b} * ${tripleExample.c} = ${tripleExample.a * tripleExample.b * tripleExample.c}` }}
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card>

        <h3 class="mt-5 mb-4">
          Existe exactamente un triplete pitagórico para el cual a + b + c = 1000. Encuentre el producto abc.
        </h3>

        <v-card>
          <v-simple-table>
            <thead>
              <tr>
                <th class="text-left">
                  Triplete Pitagórico
                </th>
                <th class="text-left">
                  a + b + c
                </th>
                <th class="text-left">
                  a
                </th>
                <th class="text-left">
                  b
                </th>
                <th class="text-left">
                  c
                </th>
                <th class="text-left">
                  a * b * c
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="text-left">
                  <span v-if="existsTriple">
                    {{ triple.a }}<sup>2</sup> + {{ triple.b }}<sup>2</sup> = {{ triple.c }}<sup>2</sup>
                  </span>
                </td>
                <td class="text-left">
                  <div style="width:150px">
                    <v-text-field
                      v-model="sum"
                      :rules="rules.sum"
                      class="my-4"
                      outlined
                      prefix="a+b+c ="
                      dense
                      hide-details
                      type="number"
                      autofocus
                    />
                  </div>
                </td>
                <td class="text-left">
                  <div style="width:120px">
                    <v-text-field
                      v-model="triple.a"
                      :rules="rules.number"
                      class="my-4"
                      outlined
                      readonly
                      prefix="a ="
                      dense
                      hide-details
                      type="number"
                    />
                  </div>
                </td>
                <td class="text-left">
                  <div style="width:120px">
                    <v-text-field
                      v-model="triple.b"
                      :rules="rules.number"
                      class="my-4"
                      outlined
                      readonly
                      prefix="b ="
                      dense
                      hide-details
                      type="number"
                    />
                  </div>
                </td>
                <td class="text-left">
                  <div style="width:120px">
                    <v-text-field
                      v-model="triple.c"
                      :rules="rules.number"
                      readonly
                      class="my-4"
                      outlined
                      prefix="c ="
                      dense
                      hide-details
                      type="number"
                    />
                  </div>
                </td>
                <td class="text-left">
                  <span v-if="existsTriple">
                    {{ `${triple.a} * ${triple.b} * ${triple.c} = ${triple.a * triple.b * triple.c}` }}
                  </span>
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card>
      </v-col>
    </v-row>
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
          text: 'Triplete Pitagórico',
          to: { name: 'pythagorean-triplet' }
        }
      ],
      tripleExample: {
        a: 3,
        b: 4,
        c: 5
      },
      triple: {
        a: 0,
        b: 0,
        c: 0
      },
      sum: 1000,
      rules: {
        sum: [
          v => !!v || 'La suma es requerida',
          v => v > 0 || 'La suma debe ser mayor que 0'
        ],
        number: [
          v => !!v || 'El número es requerido',
          v => v > 0 || 'El número debe ser mayor que 0'
        ]
      }
    }
  },

  computed: {
    existsTriple () {
      if (this.triple.a && this.triple.b && this.triple.c) {
        return true
      }

      return false
    }
  },

  watch: {
    sum (newValue, oldValue) {
      this.triple.a = ''
      this.triple.b = ''
      this.triple.c = ''

      if (newValue > 0) {
        this.getPythagoreanTriplet()
      }
    }
  },

  created () {
    this.getPythagoreanTriplet()
  },

  methods: {
    getPythagoreanTriplet () {
      const sum = parseInt(this.sum)

      for (let a = 1; a <= sum / 3; a++) {
        for (let b = a + 1; b <= sum / 2; b++) {
          const c = sum - a - b
          if (a * a + b * b === c * c) {
            this.triple.a = a
            this.triple.b = b
            this.triple.c = c
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
