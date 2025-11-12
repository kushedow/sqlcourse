<script lang="ts">

import {Step} from "../types";
import {defineComponent} from "vue";
import {useAppStore} from "../stores/app_store";
import {MiniStorage} from "../classes/storage.class";

export default defineComponent({

  name: 'Practice',
  components: {},

  setup() {
    const appStore = useAppStore();
    return { appStore };
  },

  computed: {

    currentStep(): Step {  return this.appStore.currentStep;},

  },

  methods: {

    nextStep(): void{

      console.log("Navigation: Переходим из теории в следующий шаг")

      // Отмечаем текущий шаг как пройденный
      // TODO: в сторе нужно обновить
      const miniStorage = new MiniStorage()
      miniStorage.saveStepData(this.currentStep.id, true)

      window.scrollTo({top:0})

      const stepID = this.appStore.nextStep(this.userCode)
      this.appStore.pushRoute(`step_${stepID}`)
    }

  },


})

</script>

<template>

  <h1 class="text-3xl mb-3">{{ currentStep.title }}</h1>

  <article v-html="currentStep.instruction" class="step_instruction"></article>

  <button class="bg-slate-500 text-white rounded p-3 cursor-pointer mr-4" @click="nextStep()">Дальше!</button>

</template>

<style scoped>

</style>