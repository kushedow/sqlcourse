<script lang="ts">

import {Step} from "../../types";
import {defineComponent} from "vue";
import {useAppStore} from "../../stores/app_store";
import {MiniStorage} from "../../classes/storage.class";

export default defineComponent({

  name: 'StepTheory',
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

      const currentStep = this.currentStep
      const stepID = this.appStore.nextStep()

      // Следующего задания нет — остаёмся на месте
      if (stepID === currentStep.id) return

      // Отмечаем текущий шаг как пройденный
      const miniStorage = new MiniStorage()
      miniStorage.saveStepData(currentStep.id, true)

      // Обновляем статус в сторе, чтобы навигация сразу показала галочку
      this.appStore.setStepCompleted(currentStep.id, true)

      window.scrollTo({top:0})

      this.appStore.pushRoute(`/step_${stepID}`)
    }

  },


})

</script>

<template>

  <h1 class="step-theory__title text-3xl mb-3 font-black">{{ currentStep.title }}</h1>

  <article v-html="currentStep.instruction" v-highlight class="step-theory__instruction step_instruction"></article>

  <button class="step-theory__next bg-black text-white font-medium rounded p-3 cursor-pointer mr-4" @click="nextStep()">Дальше  &nbsp;→</button>

</template>

<style scoped>

</style>