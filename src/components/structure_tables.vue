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

  data() { return {}},

  computed: {
    tables(): Step {  return this.exStore.tables ;},
  },

  methods: { },

  async mounted() { }

})

</script>

<template>


    <figure v-for="table in tables"  class="rounded-b-lg mb-4 ml-4  text-left text-sm ">

      <div class="text-sm font-bold cursor-pointer p-2 bg-[#E1FAF3] rounded-t-md border-[#ddd] border-solid border-1" @click="this.$parent.copyName(table.name)">{{ table.name }}</div>

      <div class="py-2 bg-white border-[#ddd] border-solid border-1 border-t-0 rounded-b-md">

        <div v-for="column in table.columns" class="p-1 text-left px-2 flex gap-2 justify-between">
          <span class="left ">
            <span v-if="column.type == 'integer'">🔢 </span>
            <span v-if="column.type.includes('char') || column.type.includes('text') ">🔤 </span>
            <span @click="this.$parent.copyName(column.name)" class="cursor-pointer">{{column.name}}</span>

          </span>
          <span class="right">
             <span class="text-sm text-gray-400">{{column.type}}</span>
            <span class="text-sm text-gray-400">{{column.comment}}</span>

          </span>

        </div>

      </div>



    </figure>


</template>

