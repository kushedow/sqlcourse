<script lang="ts">
import {defineComponent, PropType} from "vue";
import CodeEditor from "simple-code-editor";
import {insertIntoEditor} from "../../classes/editor_snippet";
import {useStepStore} from "../../stores/step_store";

const DEFAULT_SNIPPETS = ["SELECT", "FROM", "WHERE", "JOIN", "ORDER", "LIMIT", "*", "," , "=", "AND", "OR", "ON"]

export default defineComponent({

  name: 'SqlEditor',
  components: {CodeEditor},

  setup() {
    const exStore = useStepStore();
    return { exStore, insertIntoEditor };
  },

  props: {
    modelValue: { type: String, default: "" },
    snippets: { type: Array as PropType<string[]>, default: () => DEFAULT_SNIPPETS },
    isCompleted: { type: Boolean, default: false },
  },

  emits: ['update:modelValue'],

  computed: {
    // Таблицы текущего задания — тот же источник, что и «Показать схему таблиц»
    tables() { return this.exStore.tables; },
  },

})
</script>

<template>

  <CodeEditor
      :line-nums="true" padding="15px" theme="felipec" :languages="[['sql']]" width="100%" :display-language="false" :copy-code="false" :header="false" border-radius="8px" :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)" font-size="16px"></CodeEditor>

  <div v-if="!isCompleted" class="sql-editor__palette my-2 text-[12px] opacity-20 hover:opacity-100 transition ease-in duration-200">
    <span v-for="snip in snippets"
          :key="snip"
          class="sql-editor__snippet p-1 bg-[#F2F6F8] text-gray-600 mr-1 rounded cursor-pointer"
          @click="insertIntoEditor(` ${snip} `)">{{snip}}</span>

    <span v-for="table in tables"
          :key="table.name"
          class="sql-editor__snippet p-1 bg-[#F2F6F8] text-gray-600 mr-1 rounded cursor-pointer"
          @click="insertIntoEditor(table.name)">{{table.name}}</span>
  </div>

</template>
