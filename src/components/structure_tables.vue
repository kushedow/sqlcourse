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
    <div class="">

      <p class="text-base font-bold mb-2">{{ table.name }}</p>

        <div v-for="column in table.columns">
          <p><span>{{column.name}}</span>:
             <span class="text-sm text-gray-400">{{column.type}}</span>
             <span class="text-sm text-gray-400">{{column.comment}}</span>
          </p>
        </div>

    </div>

  </div>



</template>

