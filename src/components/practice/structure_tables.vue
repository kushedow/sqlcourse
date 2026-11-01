<script lang="ts">

import {defineComponent} from "vue";
import {useStepStore} from "../../stores/step_store";
import {DBSchemaTable} from "../../types";
import {insertIntoEditor} from "../../classes/editor_snippet";

export default defineComponent({

  name: 'StructureTables',

  setup() {

    const exStore = useStepStore();
    return { exStore };

  },

  data() {
    return {
      // Какие таблицы раскрыты (показаны все 10 строк вместо первых 3)
      expandedTables: {} as Record<string, boolean>,
    };
  },

  computed: {
    tables(): DBSchemaTable[] {  return this.exStore.tables ;},
  },

  methods: {
    insertIntoEditor,

    isExpanded(tableName: string): boolean {
      return Boolean(this.expandedTables[tableName]);
    },

    // По умолчанию первые 3 строки, после "показать еще" — до 10
    visibleRows(table: DBSchemaTable): Record<string, unknown>[] {
      const rows = table.rows || [];
      const limit = this.isExpanded(table.name) ? 10 : 3;
      return rows.slice(0, limit);
    },

    showMore(tableName: string): void {
      this.expandedTables[tableName] = true;
    },

  },

  async mounted() { }

})

</script>

<template>

    <figure v-for="table in tables" :key="table.name" class="structure-tables mb-4 text-left text-sm">

      <div class="structure-tables__name text-sm font-bold cursor-pointer p-2 bg-[#E1FAF3] rounded-t-md border-[#ddd] border-solid border-1" @click="insertIntoEditor(table.name)">{{ table.name }}</div>

      <div class="structure-tables__body overflow-x-auto bg-white border-[#ddd] border-solid border-1 border-t-0 rounded-b-md">

        <table class="w-full border-collapse text-sm">

          <thead>
            <!-- Строка заголовков (имена колонок) -->
            <tr>
              <th v-for="col in table.columns" :key="col.name" class="border border-[#ddd] px-2 py-1 text-left font-semibold bg-[#F2F6F8]">{{ col.name }}</th>
            </tr>
            <!-- Строка типов -->
            <tr>
              <th v-for="col in table.columns" :key="col.name" class="border border-[#ddd] px-2 py-1 text-left font-normal text-gray-400 bg-[#F2F6F8]">{{ col.type }}</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(row, rowIdx) in visibleRows(table)" :key="rowIdx">
              <td v-for="col in table.columns" :key="col.name" class="border border-[#ddd] px-2 py-1">{{ row[col.name] }}</td>
            </tr>
            <tr v-if="!(table.rows || []).length">
              <td :colspan="table.columns.length" class="border border-[#ddd] px-2 py-1 text-gray-400">Нет данных</td>
            </tr>
          </tbody>

        </table>

      </div>

      <button
        v-if="(table.rows || []).length > 3 && !isExpanded(table.name)"
        @click="showMore(table.name)"
        class="structure-tables__more w-full p-2 text-sm text-emerald-600 hover:bg-[#F2F6F8] cursor-pointer text-left"
      >показать еще</button>

    </figure>

</template>
