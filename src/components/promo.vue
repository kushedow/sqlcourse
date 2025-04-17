<script lang="ts">

import {Step} from "../types";
import {defineComponent} from "vue";
import {useAppStore} from "../stores/app_store";
import {MiniStorage} from "../classes/storage.class";

export default defineComponent({

  name: 'Promo',
  components: {},

  setup() {
    const appStore = useAppStore();
    return {appStore};
  },

  computed: {

    currentStep(): Step {
      return this.appStore.currentStep;
    },

  },

  methods: {

    nextStep(): void {

      console.log("Navigation: Переходим из теории в следующий шаг")

      // Отмечаем текущий шаг как пройденный
      // TODO: в сторе нужно обновить
      const miniStorage = new MiniStorage()
      miniStorage.saveStepData(this.currentStep.id, true)

      window.scrollTo({top: 0})

      const stepID = this.appStore.nextStep(this.userCode)
      window.location.hash = `#step_${stepID}`;
    },

  },


})

</script>

<template>

  <main class="container mt-8 mx-auto xl:w-4/6 2xl:w-4/6 ">

    <section class=" rounded-3xl bg-[#121831] p-6 md:flex  ">
      <!-- Left Section -->
      <div class="relative rounded-3xl p-8 text-white md:w-7/12">
        <h1 class="mb-4 text-6xl font-semibold">Тренажер по SQL</h1>
        <p class="mb-8 text-3xl">
          Чтобы эффективно учиться, <br/>
          не чувствуя себя глупеньким!
        </p>

        <ul class="mb-8 list-none pl-0">
          <li class="mb-3 flex items-center">
            <svg class="mr-2 h-5 w-5 text-[#121831] rounded-xs p-1/2 bg-[#2BDEFF]" fill="currentColor"
                 viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"/>
            </svg>
            Понятные объяснения
          </li>
          <li class="mb-3 flex items-center">
            <svg class="mr-2 h-5 w-5 text-[#121831] rounded-xs p-1/2 bg-[#2BDEFF]" fill="currentColor"
                 viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"/>
            </svg>
            Интересные простые задания
          </li>
          <li class="mb-3 flex items-center">
            <svg class="mr-2 h-5 w-5 text-[#121831] rounded-xs p-1/2 bg-[#2BDEFF]" fill="currentColor"
                 viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"/>
            </svg>
            ИИ наставник всегда поможет
          </li>
          <li class="mb-3 flex items-center">
            <svg class="mr-2 h-5 w-5 text-[#121831] rounded-xs p-1/2 bg-[#2BDEFF]" fill="currentColor"
                 viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"/>
            </svg>
            Без слёз
            <svg class="mr-2 h-5 w-5 text-[#121831] rounded-xs p-1/2 ml-4 bg-[#2BDEFF]" fill="currentColor"
                 viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"/>
            </svg>
            Бесплатно
          </li>
        </ul>

        <a @click="nextStep()"
           class="text-[#242952] cursor-pointer rounded-xl inline-block bg-[#2BDEFF] px-6 py-4 font-bold hover:bg-[#4ade80]">Начать
          учиться!</a>

      </div>


      <div class="flex flex-col items-center pr-8 py-8 md:w-5/12">
        <img src="/public/promo/first_screen_image.png" class="w-full" alt=""/>
      </div>
    </section>


    <section class="container mx-auto py-8">
      <div class="md:flex md:space-x-8">
        <!-- Left Section -->
        <div class="rounded-xl bg-white md:mb-0 md:w-2/3">
          <div class="p-6">
            <h2 class="mb-4 text-xl font-semibold text-[#121831]">Для кого этот курс?</h2>
            <p class="text-gray-700">Для начинающих аналитиков, разработчиков и менеджеров, которые пробовали учить SQL
              по
              другим курсам и расстроились.</p>
          </div>

          <div class="rounded-xl p-6">
            <h2 class="mb-4 text-xl font-semibold text-[#121831]">Что в нем особенного?</h2>
            <p class="text-gray-700">Простые таблицы, действительно много задач, автоматическая проверка и помощь
              искусственного интеллекта, если вы запутались!</p>
          </div>

          <div class="rounded-xl p-6">
            <h2 class="mb-4 text-xl font-semibold text-[#121831]">Что будет, когда я его пройду?</h2>
            <p class="text-gray-700">Научитесь извлекать результаты из любой по сложности базы данных и добавите
              владение
              базовым SQL в свое резюме!</p>
          </div>
        </div>

        <!-- Right Section -->
        <div class="flex flex-col items-start rounded-xl bg-[#111827] p-6 shadow-sm md:w-1/3">
          <h2 class="mb-4 text-xl font-semibold text-white">Кто это все придумал?</h2>
          <img src="/promo/author_pic.png" alt="Author" class="mb-4 w-1/2 rounded-full"/>
          <p class="text-gray-300">Глеб Кушедов, пишу код с 2006, преподаю всякое программирование с 2012. Пишу на Python, JS, проектирую интерфейсы, занимаюсь аналитикой. Этот сервис я собрал для моих учеников и одной милой барышни, которой сложно даются скуели :) </p>
        </div>
      </div>
    </section>



    <section>

      <h2 class="m-6 text-5xl font-semibold text-center">Что внутри?</h2>
      <p class="text-center text-2xl mb-4 m-4">Больше 100 задач, разделенных по&nbsp;10&nbsp;темам</p>
      <p class="text-center mx-auto md:w-3/4 mb-4">
        <span class="inline-block mr-4">Простые выборки</span>
        <span class="inline-block mr-4">Условия</span>
        <span class="inline-block mr-4">Алиасы</span>
        <span class="inline-block mr-4">Арифметика</span>
        <span class="inline-block mr-4">Группировки</span>
        <span class="inline-block mr-4">Агрегации</span>
        <span class="inline-block mr-4">Джойны</span>
        <span class="inline-block mr-4">Связи в таблицах</span>
        <span class="inline-block mr-4">Время и даты</span>
        <span class="inline-block mr-4">Интервалы</span>
        <span class="inline-block mr-4">Case When</span>
      </p>
      <figure class="">
        <img src="/promo/screenshots.png" alt="Author" class="w-full"/>
      </figure>

      <div class="text-center mb-6">
        <a @click="nextStep()"
           class="text-white cursor-pointer rounded-xl inline-block bg-[#111827] px-6 py-4 font-bold hover:bg-[#111827]">Начать
          учиться!</a>
      </div>

    </section>

  </main>

</template>

<style scoped>

</style>