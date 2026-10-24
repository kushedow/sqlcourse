<script lang="ts">

import {Step} from "../../types";
import {defineComponent} from "vue";
import {useAppStore} from "../../stores/app_store";
import {MiniStorage} from "../../classes/storage.class";
import Navigation from "../navigation.vue";

export default defineComponent({

  name: 'Promo',
  components: {Navigation},

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

      const currentStep = this.currentStep
      const stepID = this.appStore.nextStep()

      // Следующего задания нет — остаёмся на месте
      if (stepID === currentStep.id) return

      // Отмечаем текущий шаг как пройденный
      const miniStorage = new MiniStorage()
      miniStorage.saveStepData(currentStep.id, true)

      // Обновляем статус в сторе, чтобы навигация сразу показала галочку
      this.appStore.setStepCompleted(currentStep.id, true)

      window.scrollTo({top: 0})

      this.appStore.pushRoute(`/step_${stepID}`)
    },

  },


})

</script>

<template>

  <main class="step-promo container md:mt-8 mx-auto xl:w-4/6 2xl:w-4/6 ">

    <section class="step-promo__hero md:rounded-3xl bg-[#111827] md:p-6 md:flex  ">
      <!-- Left Section -->
      <div class="step-promo__hero-text relative rounded-3xl p-8 text-white md:w-7/12">
        <h1 class="step-promo__title mb-4 text-4xl md:text-6xl font-semibold">Тренажер по SQL</h1>
        <p class="step-promo__tagline mb-8 text-xl md:text-3xl">
          100 заданий теорией с самых основ, чтобы эффективно учиться, <br/>
          не чувствуя себя глупеньким!
        </p>

        <figure class="step-promo__hero-media step-promo__hero-media--mobile md:hidden mb-6">
          <img src="/public/promo/first_screen_image.png" class="step-promo__hero-image w-full" style="margin-left: -8px" alt=""/>
        </figure>

        <ul class="step-promo__features mb-8 list-none pl-0">
          <li class="step-promo__feature mb-3 flex items-center">
            <svg class="step-promo__feature-icon mr-2 h-5 w-5 text-[#121831] rounded-xs p-1/2 bg-[#2BDEFF]" fill="currentColor"
                 viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"/>
            </svg>
            Понятные объяснения на котятах
          </li>
          <li class="step-promo__feature mb-3 flex items-center">
            <svg class="step-promo__feature-icon mr-2 h-5 w-5 text-[#121831] rounded-xs p-1/2 bg-[#2BDEFF]" fill="currentColor"
                 viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"/>
            </svg>
            Простые маленькие задания
          </li>
          <li class="step-promo__feature mb-3 flex items-center">
            <svg class="step-promo__feature-icon mr-2 h-5 w-5 text-[#121831] rounded-xs p-1/2 bg-[#2BDEFF]" fill="currentColor"
                 viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"/>
            </svg>
            ИИ наставник всегда поможет
          </li>


        </ul>
        <div class="step-promo__actions flex gap-4">
        <!-- /.flex -->

          <router-link :to="`step_1`">
            <button class="step-promo__cta text-[#242952] cursor-pointer rounded-xl inline-block bg-[#4ade80] px-6 py-4 font-bold hover:bg-[#4ade80]">
              Начать учиться бесплатно
            </button>
          </router-link>


        </div>
      </div>


      <div class="step-promo__hero-media hidden md:block flex flex-col items-center pr-8 py-8 md:w-5/12">
        <img src="/public/promo/first_screen_image.png" class="step-promo__hero-image w-full" alt=""/>
      </div>
    </section>


    <section id="contains" class="step-promo__contains mt-5">

      <h2 class="step-promo__section-title m-8 text-5xl font-semibold text-center">Что внутри?</h2>
      <p class="step-promo__contains-lead text-center text-2xl mb-4 m-4">100 задач, разделенных по&nbsp;10&nbsp;темам</p>
      <p class="step-promo__topics text-center mx-auto md:w-3/4 mb-4">
        <span class="step-promo__topic inline-block mr-4">Простые выборки</span>
        <span class="step-promo__topic inline-block mr-4">Условия</span>
        <span class="step-promo__topic inline-block mr-4">Алиасы</span>
        <span class="step-promo__topic inline-block mr-4">Арифметика</span>
        <span class="step-promo__topic inline-block mr-4">Группировки</span>
        <span class="step-promo__topic inline-block mr-4">Агрегации</span>
        <span class="step-promo__topic inline-block mr-4">Джойны</span>
        <span class="step-promo__topic inline-block mr-4">Связи в таблицах</span>
        <span class="step-promo__topic inline-block mr-4">Время и даты</span>
        <span class="step-promo__topic inline-block mr-4">Интервалы</span>
        <span class="step-promo__topic inline-block mr-4">Case When</span>
      </p>
      <figure class="step-promo__screenshot">
        <img src="/promo/screenshots.png" alt="Author" class="step-promo__screenshot-image w-full"/>
      </figure>

    </section>

    <section class="step-promo__about container mx-auto py-8">
      <div class="md:flex md:space-x-8">
        <!-- Left Section -->
        <div class="step-promo__about-list rounded-xl bg-white md:mb-0 md:w-2/3">
          <div class="p-6">
            <h2 class="step-promo__about-title mb-4 text-xl font-semibold text-[#121831]">Для кого этот тренажер?</h2>
            <p class="step-promo__about-text text-gray-700">Для начинающих аналитиков, разработчиков и менеджеров, которые хотят освоить SQL или уже пробовали учить SQL
              по другим курсам и расстроились.</p>
          </div>

          <div class="rounded-xl p-6">
            <h2 class="step-promo__about-title mb-4 text-xl font-semibold text-[#121831]">Что в нем особенного?</h2>
            <p class="step-promo__about-text text-gray-700">Простые таблицы, действительно много задач, автоматическая проверка и помощь
              искусственного интеллекта, если вы запутались!</p>
          </div>

          <div class="rounded-xl p-6">
            <h2 class="step-promo__about-title mb-4 text-xl font-semibold text-[#121831]">Что будет, когда я его пройду?</h2>
            <p class="step-promo__about-text text-gray-700">Научитесь извлекать результаты из любой по сложности базы данных и добавите
              владение
              базовым SQL в свое резюме!</p>
          </div>
        </div>

        <!-- Right Section -->
        <div class="step-promo__author flex flex-col items-start rounded-xl bg-[#111827] p-6 shadow-sm md:w-1/3 mt-6 md:mt-0">
          <h2 class="step-promo__author-title mb-4 text-xl font-semibold text-white">Кто это все придумал?</h2>
          <img src="/promo/author_pic.png" alt="Author" class="step-promo__author-photo mb-4 w-1/2 rounded-full"/>
          <p class="step-promo__author-text text-gray-300">Глеб Кушедов, пишу код с 2006, преподаю всякое программирование с 2012. Пишу на Python, JS, проектирую интерфейсы, занимаюсь аналитикой. Этот сервис я собрал для моих учеников и одной милой барышни, которой сложно даются скуели :) </p>
        </div>
      </div>
    </section>


    <section class="step-promo__plans flex items-center justify-center px-4 text-center" id="plans">

      <div class="step-promo__plans-inner w-full py-16 ">

        <div class="text-center mb-4">
          <h1 class="step-promo__plans-title text-3xl md:text-4xl font-bold mb-2">Начните прямо сейчас</h1>
          <p class="step-promo__plans-subtitle text-lg md:text-xl text-gray-500">Дополнительные инструменты разблокируются после регистрации!</p>
        </div>

        <router-link :to="`step_1`">
          <button class="text-[#242952] cursor-pointer rounded-xl inline-block bg-[#4ade80] px-6 py-4 font-bold hover:bg-[#4ade80]">
            Начать учиться бесплатно и без регистрации!
          </button>
        </router-link>

      </div>

    </section>

  </main>

  <navigation></navigation>

</template>

<style scoped>

</style>