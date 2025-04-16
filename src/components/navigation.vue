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


  },

  methods: {

    // Переход к другой страничке
    goto(ID: number){
      window.scrollTo({top:0})
      this.store.setCurrentStep(ID)
    },

    getQueryParams() {
      const params = {};
      const urlObj = new URL(window.location.toString());
      const searchParams = new URLSearchParams(urlObj.search);

      for (const [key, value] of searchParams.entries()) {
        params[key] = value;
      }

      return params;
    }

  },

  mounted() {

    const params: Object = this.getQueryParams()

    if (params.auth && params.hash){
       this.store.setAuthData(params)
    } else {
       this.store.loadAuthData()
    }

    try {
      // Пытаемся вытащить шаг из адресной строки
      const step = parseInt(window.location.hash.split("_").slice(-1)[0])
      this.store.setCurrentStep(step);
    } catch {
      // Если не получилось – начинаем с начала
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
        <li v-for="step in lesson.steps"  class="my-1 pl-3 rounded" :class="currentID === step.id ? 'bg-violet-100 p-2' : ''">

          <span v-if="step.type == 'practice' && !step.isCompleted">✍️ </span>
          <span v-if="step.type == 'theory' && !step.isCompleted">👨‍💻 </span>
          <span v-if="step.isCompleted">✅ </span>
          <a :href="'#step_' + step.id" @click="goto(step.id)" class="text-slate-500 hover:text-slate-700 ">{{step.title}}</a>

        </li>
      </ul>
    </div>

  </div>

</template>
