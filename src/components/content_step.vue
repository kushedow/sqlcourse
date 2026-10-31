<script lang="ts">

import {Step} from "../types";
import {defineComponent} from "vue";

import StepPromo from "./steps/step_promo.vue";
import Navigation from "./navigation.vue";
import StepPractice from "./steps/step_practice.vue";
import StepTheory from "./steps/step_theory.vue";

import {useAppStore} from "../stores/app_store";
import {useStepStore} from "../stores/step_store";

export default defineComponent({

  name: 'ContentStep',
  components: {Promo: StepPromo, Navigation, Practice: StepPractice, Theory: StepTheory},

  setup() {
    const store = useAppStore();
    const exStore = useStepStore();
    return {store, exStore};
  },

  data() {
    return {};
  },

  computed: {

    status(): string {
      return this.store.status;
    },

    currentStep(): Step {
      return this.store.currentStep;
    },

    theorySidecarOpen(): boolean {
      return this.exStore.theorySidecarOpen;
    },

  },

  methods: {

    // Закрыть боковую панель с теорией
    closeTheorySidecar(): void {
      this.exStore.setTheorySidecarOpen(false);
    },

  },

  async mounted() {

    // console.log(`Component step mounted. status ${this.status}`);

  }

});

</script>

<template>

  <div v-if="status == 'ready' && currentStep" class="content-step" :class="theorySidecarOpen ? 'xl:pr-[480px]' : ''">

      <section v-if="currentStep.type=='practice'"
               class="content-step__practice step container mx-auto md:mt-6 p-4 md:p-8 rounded-xl bg-white  2xl:w-1/2 xl:w-2/3 xl:min-w-[760px] ">
        <practice/>

      </section>

      <section v-if="currentStep.type=='theory'"
               class="content-step__theory container mx-auto md:mt-6 p-4 md:p-8 rounded-xl bg-white  2xl:w-1/2 xl:w-2/3 ">
        <theory/>
      </section>

      <!-- Компонент навигации по всем шагам  -->
      <div v-if="status == 'ready' " class="content-step__navigation">
        <navigation></navigation>
      </div>

      <!-- Боковая панель с теорией (≥1280px) -->
      <aside
        v-if="theorySidecarOpen && currentStep.type == 'practice'"
        class="content-step__sidecar hidden xl:block fixed top-0 right-0 h-screen w-[480px] bg-white shadow-2xl p-6 overflow-y-auto z-40"
      >
        <div class="content-step__sidecar-header flex items-center justify-between mb-4">
          <h2 class="content-step__sidecar-title text-xl font-semibold">Теория</h2>
          <button @click="closeTheorySidecar" aria-label="Закрыть" class="content-step__sidecar-close text-2xl leading-none text-gray-500 hover:text-gray-800 cursor-pointer">×</button>
        </div>
        <article v-html="currentStep.theory[0]" v-highlight class="step_instruction"></article>
      </aside>

  </div>

</template>
