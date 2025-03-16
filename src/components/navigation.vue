<script lang="ts">

import {defineComponent} from 'vue';
import {useAppStore} from '../stores/app_store.ts';
import {Exercise} from "../types";

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

    exercises(): Exercise[] {
      return this.store.exercises;
    },
  },

  methods: {

    // Переход к другой страничке
    goto(ID: number){
      this.store.setCurrentStep(ID)
    }
  }
})

</script>

<template>

  <div class="container mx-auto rounded-xl bg-white p-5 mt-6 2xl:w-1/2 xl:w-2/3 ">
    <h2 class="text-lg mb-3 "> Содержание: </h2>
    <ul>
      <li v-for="ex in exercises" class="my-1">

        <span v-if="ex.type == 'practice'">✍️ </span>
        <span v-if="ex.type == 'theory'">👨‍💻 </span>

        <a href="#" @click="goto(ex.id)" class="text-slate-500 hover:text-slate-700 ">{{ex.title}}</a>
      </li>
    </ul>
  </div>

</template>
