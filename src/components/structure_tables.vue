<script lang="ts">

import {defineComponent} from "vue";
import {useStepStore} from "../stores/step_store";
import {Step} from "../types";

export default defineComponent({

  name: 'StructureTables',

  setup() {

    const exStore = useStepStore();
    return { exStore };

  },

  data() {},

  computed: {
    tables(): Step {  return this.exStore.tables ;},
  },

  methods: { },

  async mounted() { }

})

</script>

<template>

  <div v-for="table in tables" class="">

    <!-- Table Header -->
    <details class="p-4 bg-white rounded-lg mb-4 ">

      <summary class="text-sm font-bold cursor-pointer">{{ table.name }}</summary>

        <div v-for="column in table.columns" class="mt-1">
          <p>
             <span v-if="column.type == 'integer'">🔢 </span>
             <span v-if="column.type.includes('character varying') ">🔤 </span>
             <span>{{column.name}}</span>:
             <span class="text-sm text-gray-400">{{column.type}}</span>
             <span class="text-sm text-gray-400">{{column.comment}}</span>
          </p>
        </div>

    </details>

  </div>



</template>

