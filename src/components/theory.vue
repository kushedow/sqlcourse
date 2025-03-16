<script lang="ts">

import {defineComponent} from "vue";
import {Exercise} from "../types";
import {useAppStore} from "../stores/app_store";
import {ExerciseManager} from "../classes/exercise_manager.class";

export default defineComponent({

  name: 'Practice',
  components: {},

  setup() {
    const appStore = useAppStore();
    return { appStore };
  },

  computed: {

    currentStep(): Exercise {  return this.appStore.currentStep;},

  },

  methods: {

    nextStep(): void{
      console.log("Переходим из теории в следующий шаг")
      this.appStore.nextStep()
    },

  },

})

</script>

<template>

  <section>
    <div v-html="currentStep.instruction" class="mb-3"></div>
    <button class="bg-slate-500 text-white rounded p-3 cursor-pointer mr-4" @click="nextStep()">Дальше!</button>
  </section>

</template>

<style scoped>

</style>