<script lang="ts">

import {defineComponent} from 'vue';
import {useAppStore} from '../stores/app_store.ts';
import {Exercise, Lesson} from "../types";

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

    lessons(): Lesson[] {
      return this.store.groupedExercises;
    },

  },

  methods: {

    // Переход к другой страничке
    goto(ID: number){
      window.scrollTo({top:0})
      this.store.setCurrentStep(ID)
    }

  },

  mounted() {

    try {
      const step = parseInt(window.location.hash.split("_").slice(-1)[0])
      this.store.setCurrentStep(step);
    } catch {
      console.log("Navigation: не задан шаг, начинаем с начала")
      this.store.setCurrentStep(0);
    }

  }



})

</script>

<template>

  <div class="container mx-auto rounded-xl bg-white p-5 mt-6 2xl:w-1/2 xl:w-2/3 ">
    <h2 class="text-lg mb-3 "> Содержание: </h2>

    <div v-for="lesson in lessons">

      <h2 class="my-3">{{lesson.title}}</h2>
      <ul>
        <li v-for="step in lesson.steps" class="my-1">

          <span v-if="step.type == 'practice'">✍️ </span>
          <span v-if="step.type == 'theory'">👨‍💻 </span>

          <a :href="'#step_' + step.id" @click="goto(step.id)" class="text-slate-500 hover:text-slate-700 ">{{step.title}}</a>

        </li>
      </ul>

    </div>

    <ul>

    </ul>
  </div>

</template>
