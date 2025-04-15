<script lang="ts">

import {defineComponent} from "vue";
export default defineComponent({

  name: 'ResponseTable',
  components: {},

  props: {
    outputData: { type: Object,  required: true,
    },
  },

  data() {
    return {
      expanded: false,
    };
  },

  computed: {
    visibleRows() {
      if (this.expanded || this.outputData.rows.length <= 3) {
        return this.outputData.rows;
      } else {
        return this.outputData.rows.slice(0, 3);
      }
    },

    remainingRowCount() {
      return this.outputData.rows.length - 3;
    },
  },

  methods: {
    showMoreRows() {
      this.expanded = true;
    },
  },

})

</script>

<template>

  <table v-if="outputData.rows" >
    <thead class="text-gray-700 bg-gray-50">
    <tr>
      <th v-for="field in outputData.fields" :key="field.name" class="text-sm cursor-pointer" @click="this.$parent.copyName(field.name)">{{ field.name }}</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(row, rowIndex) in visibleRows" :key="rowIndex">
      <td v-for="(cell, cellIndex) in row" :key="cellIndex" class="px-2 py-1">{{ cell }}</td>
    </tr>
    </tbody>
  </table>

  <button v-if="outputData.rows && outputData.rows.length > 3 && !expanded" @click="showMoreRows" class="cursor-pointer text-slate-500 text-sm">
    Еще {{ remainingRowCount }} ряд(ов)
  </button>

</template>
