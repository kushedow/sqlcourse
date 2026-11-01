<script lang="ts">

import {defineComponent} from 'vue';
import {useAppStore} from '../stores/app_store';
import {Step, Lesson} from "../types";

export default defineComponent({

  name: 'Navigation',

  setup(){
    // Чтобы реализовать переход и вывод
    // Нужен доступ к основному стору
    const store = useAppStore();
    return { store};
  },

  data() { return {}},

  computed: {

    // Получаем шаги, сгруппированные в уроки
    lessons(): Lesson[] {
      return this.store.groupedExercises;
    },

    currentID(): number {
      return this.store.currentStep.id
    },

    // Всего решаемых шагов (без промо-экрана) и сколько из них решено
    totalSteps(): number {
      return this.store.steps.filter((s: Step) => s.type !== 'promo').length;
    },

    completedSteps(): number {
      return this.store.steps.filter((s: Step) => s.isCompleted).length;
    },

    progressPercent(): number {
      if (!this.totalSteps) { return 0; }
      return Math.round((this.completedSteps / this.totalSteps) * 100);
    },

  },

  methods: {

  },

  mounted() {

  }

})

</script>

<template>

  <div class="navigation container mx-auto rounded-xl bg-white p-5 mt-12 2xl:w-1/2 xl:w-2/3 ">

    <div class="navigation__progress flex items-center gap-3 mb-4">
      <span class="navigation__progress-label text-sm font-medium text-gray-600 whitespace-nowrap">Прогресс {{ progressPercent }}%</span>
      <div class="navigation__progress-track flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div class="navigation__progress-fill h-full bg-emerald-500 rounded-full transition-all" :style="{ width: progressPercent + '%' }"></div>
      </div>
      <span class="navigation__progress-count text-sm font-semibold text-gray-700 whitespace-nowrap">{{ completedSteps }} / {{ totalSteps }}</span>
      <span class="rounded-full bg-gray-200 pr-4 pl-3 py-1 text-black-300 text-sm cursor-pointer whitespace-nowrap">
        <router-link :to="`map`" class="navigation__map-link">Карта навыков</router-link>
      </span>
    </div>

    <h2 class="navigation__title text-2xl mb-3 font-black"> Содержание: </h2>

    <div v-for="lesson in lessons" :key="lesson.title" class="navigation__lesson">
      <h3 class="navigation__lesson-title my-3 font-bold">{{lesson.title}}</h3>
      <ul class="navigation__steps">
        <li v-for="step in lesson.steps" :key="step.id" class="navigation__step my-1  rounded" :class="currentID === step.id ? 'bg-black text-white p-2 -ml-2' : ''">

          <span v-if="step.type == 'practice' && !step.isCompleted" class="navigation__step-icon">✍️ </span>
          <span v-if="step.type == 'theory' && !step.isCompleted" class="navigation__step-icon">👨‍💻 </span>
          <span v-if="step.isCompleted" class="navigation__step-icon">✅ </span>

          <router-link :to="`step_${step.id}`" class="navigation__step-link">{{ step.title }}</router-link>

        </li>
      </ul>
    </div>

  </div>

</template>
