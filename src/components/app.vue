<script lang="ts">

import {Step} from "../types";
import {defineComponent} from 'vue';
import {useAppStore} from '../stores/app_store.ts';

import {ExerciseManager} from "../classes/exercise_manager.class.js"

import Navigation from "./navigation.vue";
import Practice from "./practice.vue";
import Theory from "./theory.vue";
import Promo from "./promo.vue";

export default defineComponent({

  name: 'Learn SQL',
  components: {Promo, Navigation, Practice, Theory},

  setup() {
    const store = useAppStore();
    const manager = new ExerciseManager();
    return {store, manager};
  },

  data() {
    return {
      example: {},    // Результат выполнения кода примера-образца
      output: {},     // Результат выполнения кода ученика
      checklist: [],  // Результат проверки по списку
      errors: [],     // Ошибки при выполнении
    };
  },

  computed: {

    status(): string {
      return this.store.status;
    },

    exercises(): Step[] {
      return this.store.exercises;
    },

    currentStep(): Step {
      return this.store.currentStep;
    },

  },

  async mounted() {

    try {
      const allSteps = await this.manager.load()
      this.store.setSteps(allSteps);
      this.store.setStatus("ready")
    } catch (error) {
      console.log(`Произошла ошибка при загрузке ${error}`)
      this.store.setStatus("error")
    }

  },

  methods: {
    reload() {
      window.location.reload();
    }
  },

});

</script>

<template>

  <div v-if="status == 'loading'" class="status text-center">

    <svg aria-hidden="true" class="inline-block w-15 h-15 text-gray-200 animate-spin fill-blue-600"
         viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"/>
      <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"/>
    </svg>

    <h2 class="mt-4">Загружаем данные тренажера</h2>

  </div>

  <main v-if="status == 'error'">

    <section class="container mx-auto md:mt-6 p-4 md:p-8 rounded-xl bg-white  2xl:w-1/2 xl:w-2/3 ">
      <div class="p-4 mb-3 rounded bg-red-100">
        Ошибка при загрузке.
        <button @click="reload()" class="underline cursor-pointer">Попробовать снова</button>
      </div>
    </section>

  </main>

  <main v-if="currentStep">


    <section v-if="currentStep.type=='practice'"
             class="container mx-auto md:mt-6 p-4 md:p-8 rounded-xl bg-white  2xl:w-1/2 xl:w-2/3 ">

      <h1 class="text-3xl mb-3">{{ currentStep.title }}</h1>
      <article v-html="currentStep.instruction" class="step_instruction"></article>
      <practice/>

    </section>

    <section v-if="currentStep.type=='theory'"
             class="container mx-auto md:mt-6 p-4 md:p-8 rounded-xl bg-white  2xl:w-1/2 xl:w-2/3 ">

      <h1 class="text-3xl mb-3">{{ currentStep.title }}</h1>
      <article v-html="currentStep.instruction" class="step_instruction"></article>
      <theory/>

    </section>

    <div v-if="currentStep.type=='promo'">
      <promo/>
    </div>

    <!-- Компонент навигации по всем шагам  -->
    <div v-if="status == 'ready' ">
      <navigation></navigation>
    </div>

  </main>
  

</template>
