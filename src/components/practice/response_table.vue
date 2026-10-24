<script lang="ts">

import {defineComponent, PropType} from "vue";
import {Highlight, DBResponse} from "../../types";
import {insertIntoEditor} from "../../classes/editor_snippet";

export default defineComponent({

  name: 'ResponseTable',
  components: {},

  props: {
    outputData: { type: Object as PropType<DBResponse>, required: true },
    highlight: { type: Object as PropType<Highlight | null>, default: null },
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

    // Зелёный/красный класс ячейки по вердикту
    cellClass(rowIndex: number, columnName: string): string {
      const verdict = this.highlight?.cells?.[rowIndex]?.[columnName];
      if (verdict === true) return "bg-green-100";
      if (verdict === false) return "bg-red-100";
      return "";
    },

    // Подсветка заголовка зависит только от совпадения названия колонки с образцом
    columnClass(columnName: string): string {
      const matched = this.highlight?.columns?.[columnName];
      if (matched === true) return "bg-green-100";
      if (matched === false) return "bg-red-100";
      return "";
    },
  },

})

</script>

<template>

  <table v-if="outputData.rows" class="response-table table table-auto w-full text-sm text-left bg-white rounded-lg">
    <thead class="response-table__head text-left ">
    <tr class="response-table__row response-table__row--head">
      <th v-for="field in outputData.fields" :key="field.name" :class="['response-table__cell response-table__cell--head text-sm cursor-pointer px-2 py-1', columnClass(field.name)]" @click="insertIntoEditor(field.name)">{{ field.name }}</th>
    </tr>
    </thead>
    <tbody class="response-table__body">
    <tr v-for="(row, rowIndex) in visibleRows" :key="rowIndex" class="response-table__row even:bg-white odd:bg-gray-50">
      <td v-for="(cell, columnName) in row" :key="columnName" :class="['response-table__cell px-2 py-1', cellClass(rowIndex, columnName)]">{{ cell }}</td>
    </tr>
    </tbody>
  </table>

  <button v-if="outputData.rows && outputData.rows.length > 3 && !expanded" @click="showMoreRows" class="response-table__more cursor-pointer text-slate-500 text-sm">
    Еще {{ remainingRowCount }} ряд(ов)
  </button>

</template>
