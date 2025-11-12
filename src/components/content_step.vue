<script lang="ts">

import {Step} from "../types";
import {defineComponent} from "vue";

import Quiz from "./quiz.vue";
import Promo from "./promo.vue";
import Navigation from "./navigation.vue";
import Practice from "./practice.vue";
import Theory from "./theory.vue";
import PracticeWide from "./practice_wide.vue";

import {useAppStore} from "../stores/app_store";



export default defineComponent({

  name: 'ContentStep',
  components: {Quiz, Promo, Navigation, Practice, Theory, PracticeWide},

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

      <section v-if="currentStep.type=='practice' && currentStep.view!='full'"
               class="step container mx-auto md:mt-6 p-4 md:p-8 rounded-xl bg-white  2xl:w-1/2 xl:w-2/3 ">

        <practice/>

      </section>

      <section v-if="currentStep.type=='practice' && currentStep.view=='full'" class="">
        <practice-wide/>
      </section>

      <section v-if="currentStep.type=='theory'"
               class="container mx-auto md:mt-6 p-4 md:p-8 rounded-xl bg-white  2xl:w-1/2 xl:w-2/3 ">
        <theory/>

      </section>

      <div v-if="currentStep.type=='quiz'"
           class="container mx-auto md:mt-6 p-4 md:p-8 rounded-xl bg-white  2xl:w-1/2 xl:w-2/3 ">
        <h1 class="text-3xl mb-3">{{ currentStep.title }}</h1>
        <quiz/>
      </div>

      <!-- Компонент навигации по всем шагам  -->
      <div v-if="status == 'ready' ">
        <navigation></navigation>
      </div>

  </div>

</template>

