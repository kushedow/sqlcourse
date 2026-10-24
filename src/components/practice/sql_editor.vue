<script lang="ts">
import {defineComponent, PropType, nextTick} from "vue";
import CodeEditor from "simple-code-editor";

const DEFAULT_SNIPPETS = ["SELECT", "FROM", "WHERE", "JOIN", "ORDER", "LIMIT", "*", "," , "=", "AND", "OR", "ON"]

export default defineComponent({

  name: 'SqlEditor',
  components: {CodeEditor},

  props: {
    modelValue: { type: String, default: "" },
    snippets: { type: Array as PropType<string[]>, default: () => DEFAULT_SNIPPETS },
    isCompleted: { type: Boolean, default: false },
  },

  emits: ['update:modelValue'],

  methods: {

    copyName(name: string){

      const userCodeTextarea: HTMLTextAreaElement = document.querySelector(".code-editor textarea")

      if (!userCodeTextarea) return;

      const selectionStart = userCodeTextarea.selectionStart;
      const selectionEnd = userCodeTextarea.selectionEnd;
      const currentValue = userCodeTextarea.value;
      userCodeTextarea.value = currentValue.substring(0, selectionStart) + name + currentValue.substring(selectionEnd);
      userCodeTextarea.selectionStart = userCodeTextarea.selectionEnd = selectionStart + name.length;

      // Trigger input event (optional, but often needed for Vue/React reactivity)
      const event = new Event('input', {
        bubbles: true, cancelable: true,
      });
      userCodeTextarea.dispatchEvent(event);

      nextTick(()=> userCodeTextarea.focus())
    },

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
          @click="copyName(` ${snip} `)">{{snip}}</span>
  </div>

</template>
