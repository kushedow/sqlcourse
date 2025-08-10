<script lang="ts">

import {Step} from "../types";
import {defineComponent} from "vue";
import {useAppStore} from "../stores/app_store";
import {MiniStorage} from "../classes/storage.class";

export default defineComponent({

  name: 'Quiz',
  components: {},

  data() {
    return {
      userPick: null,
      userAnswer: null,
    }
  },

  setup() {
    const appStore = useAppStore();
    return { appStore };
  },

  computed: {

    currentStep(): Step {  return this.appStore.currentStep;},

    options(): String[] {
      return this.currentStep.structure.trim().split("\n");
    },

    correctAnswer (): number {
      return parseInt(this.currentStep.solution);
    },

    isCorrect(): boolean {
      return this.userAnswer === this.correctAnswer;
    }

  },

  methods: {

    setAnswer(): void {
      this.userAnswer = this.userPick;
    },

    nextStep(): void{

      console.log("Navigation: Переходим из теории в следующий шаг")
      const miniStorage = new MiniStorage()
      miniStorage.saveStepData(this.currentStep.id, true)
      window.scrollTo({top:0})
      const stepID = this.appStore.nextStep(this.userCode)
      window.location.hash = `#step_${stepID}`;
    },

  },


})

</script>

<template>

  <section>
    <div v-html="currentStep.instruction" class="mb-3"></div>

    <div v-if="isCorrect" class="p-4 mb-3 rounded bg-emerald-50 ">
      Задание выполнено, можно делать
      <button class="underline cursor-pointer" @click="nextStep()">Следующее</button>
    </div>

  </section>

  <section class="exercise__options my-5 border-1 border-gray-200 p-4">

  <p class="text-slate-400 mb-3">Выберите верный вариант: </p>

    <div class="options-list">
      <div v-for="(option, index) in options" :key="index" class="option-item">
        <input
            type="radio"
            :id="'option_' + index"
            :value="index"
            v-model="userPick"
            class="mr-2"
        >
        <label :for="'option_' + index">{{ option }}</label>
      </div>
    </div>


  </section>

  <button @click="setAnswer()" class="bg-slate-500 text-white rounded p-3 cursor-pointer mr-4">
    <span > Проверить </span>
  </button>




</template>

<style scoped>

</style>