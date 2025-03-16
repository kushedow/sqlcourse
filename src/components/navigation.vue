<script lang="ts">

import {defineComponent} from 'vue';
import {useAppStore} from '../stores/app_store.ts';
import {Exercise} from "../types";

export default defineComponent({

  name: 'Navigation',

  setup(){
    const store = useAppStore();
    return { store};
  },

  data() { return {}},

  computed: {

    exercises(): Exercise[] {
      return this.store.exercises;
    },
  },

  methods: {

    goto(ID: number){

      this.store.setCurrentStep(ID)
      // this.$parent.runExample();

    }

  }

})

</script>

<template>

  <div class="container mx-auto rounded-xl bg-white p-5 mt-6 2xl:w-1/2 xl:w-2/3 ">
  
    <h2 class="text-lg mb-3 "> Содержание: </h2>

    <ul>
      <li v-for="ex in exercises" class="my-2">
        <a href="#" @click="goto(ex.id)" class="text-slate-500 hover:text-slate-700 ">{{ex.title}}</a>
      </li>
    </ul>

  </div>

</template>

<style scoped>

</style>