<script lang="ts">

import {Step} from "../types";
import {defineComponent} from "vue";

import StepPromo from "./steps/step_promo.vue";
import Navigation from "./navigation.vue";
import StepPractice from "./steps/step_practice.vue";
import StepTheory from "./steps/step_theory.vue";

import {useAppStore} from "../stores/app_store";

export default defineComponent({

  name: 'ContentStep',
  components: {Promo: StepPromo, Navigation, Practice: StepPractice, Theory: StepTheory},

  setup() {
    const store = useAppStore();
    return {store};
  },

  data() {
    return {};
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

    // console.log(`Component step mounted. status ${this.status}`);

  }

});

</script>

<template>

  <div v-if="status == 'ready' && currentStep">

      <section v-if="currentStep.type=='practice'"
               class="step container mx-auto md:mt-6 p-4 md:p-8 rounded-xl bg-white  2xl:w-1/2 xl:w-2/3 ">
        <practice/>

      </section>

      <section v-if="currentStep.type=='theory'"
               class="container mx-auto md:mt-6 p-4 md:p-8 rounded-xl bg-white  2xl:w-1/2 xl:w-2/3 ">
        <theory/>
      </section>

      <!-- Компонент навигации по всем шагам  -->
      <div v-if="status == 'ready' ">
        <navigation></navigation>
      </div>

  </div>

</template>
