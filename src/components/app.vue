<script lang="ts">

import {Step} from "../types";
import {defineComponent} from 'vue';
import {useAppStore} from '../stores/app_store.ts';

import {ExerciseManager} from "../classes/exercise_manager.class.js"

import ContentStep from "./content_step.vue";

import {URLHelper} from "../classes/url_helper.class";


export default defineComponent({

  name: 'Learn SQL',
  components: {ContentStep},

  setup() {
    const store = useAppStore();
    const manager = new ExerciseManager();
    return {store, manager};
  },

  data() { return {}},

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


    const urlHelper = new URLHelper();

    // if (urlHelper.hasUserInfo()) {
    //   this.store.setUserData(urlHelper.getQueryParams())
    // }

    this.store.loadUserData()

    await this.store.loadData()


  },

  methods: {
    reload() {
      window.location.reload();
    }
  },

});

</script>

<template>

  <router-view />

  <div v-if="status == 'loading' " class="status text-center">

    <div class="preloader fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
            w-[200px] h-[200px] bg-white rounded-2xl
            flex flex-col justify-center items-center
            shadow-lg p-5 box-border">

      <img src="/public/images/preloader.gif" alt="">
      <h2 class="mt-4">Загружаем данные</h2>

    </div><!-- /.preloader -->

  </div>


  <main v-if="status == 'error'">

    <section class="container mx-auto md:mt-6 p-4 md:p-8 rounded-xl bg-white  2xl:w-1/2 xl:w-2/3 ">
      <div class="p-4 mb-3 rounded bg-red-100">
        Ошибка при загрузке.
        <button @click="reload()" class="underline cursor-pointer">Попробовать снова</button>
      </div>
    </section>

  </main>


  

</template>
