<script lang="ts">

import {defineComponent} from 'vue';
import {useAppStore} from '../stores/app_store';
import {Step, Lesson} from "../types";
import {URLHelper} from "../classes/url_helper.class";

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

  },

  methods: {

  },

  mounted() {

  }

})

</script>

<template>

  <div class="container mx-auto rounded-xl bg-white p-5 mt-12 2xl:w-1/2 xl:w-2/3 ">
    <h2 class="text-2xl mb-3 font-black"> Содержание: </h2>

    <div v-for="lesson in lessons">
      <h3 class="my-3 font-bold">{{lesson.title}}</h3>
      <ul>
        <li v-for="step in lesson.steps"  class="my-1  rounded" :class="currentID === step.id ? 'bg-black text-white p-2 -ml-2' : ''">

          <span v-if="step.type == 'practice' && !step.isCompleted">✍️ </span>
          <span v-if="step.type == 'theory' && !step.isCompleted">👨‍💻 </span>
          <span v-if="step.isCompleted">✅ </span>

          <router-link :to="`step_${step.id}`">{{ step.title }}</router-link>

        </li>
      </ul>
    </div>

  </div>

</template>
