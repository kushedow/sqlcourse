<script lang="ts">

import {defineComponent} from 'vue';
import {useAppStore} from '../stores/app_store.ts';

import {ExerciseManager} from "../classes/exercise_manager.class.js"

import {DBResponse, Exercise, Feedback} from "../types";
import Navigation from "./navigation.vue";
import Practice from "./practice.vue";
import Theory from "./theory.vue";

export default defineComponent({

  name: 'Learn SQL',
  components: {Navigation, Practice, Theory},

  setup() {
    const store = useAppStore();
    const manager = new ExerciseManager();
    return { store, manager };
  },

  data() {
    return {
      userCode: '',
      example: {},
      output: {},
      checklist: [],
      errors: [],
    };
  },

  computed: {
    
    status(): string {
      return this.store.status;
    },

    exercises(): Exercise[] {
      return this.store.exercises;
    },

    currentStep(): Exercise{
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

  <div class="container mx-auto  md:mt-6 p-4 md:p-8 rounded-xl bg-white   2xl:w-1/2 xl:w-2/3 ">

    <h1 v-if="status == 'loading'">Загружаем данные тренажера</h1>

    <div v-if="status == 'error'" class="p-4 mb-3 rounded bg-red-100">
      Ошибка при загрузке.
      <button @click="reload()" class="underline cursor-pointer">Попробовать снова</button>
    </div>

    <div  v-if="currentStep" class="step_instruction">

      <h1 class="text-3xl mb-3">{{ currentStep.title }}</h1>

      <div v-if="currentStep.type=='practice'">
        <div v-html="currentStep.instruction" class=""></div>
        <practice/>
      </div>

      <div v-if="currentStep.type=='theory'">
        <theory/>
      </div>

    </div>

  </div><!--/container -->

  <div v-if="status == 'ready'">
    <navigation></navigation>
  </div>

</template>
