<script lang="ts">
import {DBResponse, Feedback, Step, Highlight} from "../../types";
import {defineComponent} from "vue";
import {useStepStore} from "../../stores/step_store";
import {useAppStore} from "../../stores/app_store";
import ResponseTable from "../practice/response_table.vue";
import Structuretables from "../practice/structure_tables.vue";

import SqlEditor from "../practice/sql_editor.vue";


export default defineComponent({

  name: 'Practice',
  components: {Structuretables, ResponseTable, SqlEditor},

  setup() {

    const appStore = useAppStore();
    const exStore = useStepStore();
    return { appStore, exStore };

  },

  data() {
    return {}
  },

  computed: {

    status(): string { return this.appStore.status;  },
    runnerStatus(): string {return this.exStore.runnerStatus; },

    // Код в редакторе привязан к текущему шагу, чтобы не переносился между заданиями
    userCode: {
      get(): string { return this.currentStep?.userCode || ""; },
      set(value: string) { if (this.currentStep) { this.currentStep.userCode = value; } },
    },

    currentStep(): Step { return this.appStore.currentStep; },

    example(): DBResponse { return this.exStore.example; },
    output(): DBResponse { return this.exStore.output; },
    errors(): string[] { return this.exStore.errors; },

    aiHelp(): string {return this.exStore.aiHelp;},
    aiStatus(): string {return this.exStore.aiStatus;},

    isCompleted(): boolean { return this.exStore.isCompleted; },
    checklist(): Feedback { return this.exStore.checklist; },
    highlight(): Highlight { return this.exStore.highlight; },

    textareaRows(): number { return  this.userCode?.split("\n").length || 1; },

    congratulation(): string {

      const phrases = [
          "Задание выполнено, можно делать cледующее!",
          "Получилось хорошо. Еще одно задание?",
          "Просто отлично. Все бы так работали! Продолжим?",
          "Прекрасная работа! Следующая задача ждет!",
          "Великолепно! Время двигаться дальше.",
          "Ура, готово! И совсем не больно. Пока что...",
          "Идеально! Еще одно задание?",
          "Готово! Попробуем что-то сложнее?",
          "Получилось хорошо... для вашего уровня. Еще одну?",
          "Найс! Следующая задача уже заждалась.",

      ]

      const randomIndex = Math.floor(Math.random() * phrases.length);
      return phrases[randomIndex];
    },

  },

  methods: {

    async run(){
      console.log("Процессим решение, обращаемся к полю")
      await this.exStore.run(String(this.userCode))

    },

    async getAIHelp(){
      console.log("Зовем на помощь AI")
      await this.exStore.getAIHelp(this.userCode)

    },

    nextStep(){
      const currentStep = this.appStore.currentStep
      const stepID = this.appStore.nextStep()

      // Следующего задания нет — остаёмся на месте
      if (stepID === currentStep.id) return

      // Чистим черновик пройденного шага
      currentStep.userCode = ""
      window.scrollTo({top:0})
      this.appStore.pushRoute(`/step_${stepID}`)
    }

  },

  async mounted() {

    try {
      console.log("Начинаем монтировать практику")

    } catch (error) {
      console.log(`Произошла ошибка при генерации примера ${error}`)
    }

  },

})

</script>

<template>

  <h1 class="step-practice__title text-3xl mb-3 font-black">{{ currentStep.title }}</h1>

  <article v-html="currentStep.instruction" v-highlight class="step-practice__instruction step_instruction"></article>

  <details class="step-practice__theory step_instruction">
    <summary class="step-practice__theory-summary cursor-pointer mt-2 mb-1 text-emerald-600 text-sm">Напомнить теорию</summary>
    <article v-html="currentStep.theory[0]" v-highlight class="step-practice__theory-content"> </article>
  </details>

  <details class="step-practice__schema">
    <summary class="step-practice__schema-summary cursor-pointer mb-1 text-emerald-600 text-sm">Показать схему таблиц</summary>
      <article class="step-practice__schema-content flex pt-4 bg-[#F2F6F8] ">
        <Structuretables/>
      </article>
  </details>

  <section class="step-practice__example grid grid-cols-2 gap-4 practice__example my-3" v-if="currentStep != null">

    <div class="step-practice__example-panel left">

      <small class="step-practice__panel-title">Образец</small>

      <div v-if="!example.rows" class="step-practice__example-placeholder p-4 rounded bg-slate-100">Секунду, отрисовываем...</div>

      <ResponseTable :outputData="example"></ResponseTable>

    </div>
    <!-- /.left -->

    <div class="step-practice__output-panel right">

      <small class="step-practice__panel-title">Результат</small>

      <div v-if="output.rows" class="step-practice__output exercise__output rounded-lg overflow-hidden" >

        <ResponseTable :outputData="output" :highlight="highlight"></ResponseTable>

        <div v-if="output.fields && output.fields.length == 0 " class="step-practice__output-empty p-4 rounded bg-slate-100">Запрос вернул пустой результат</div>

      </div>

      <div v-else class="step-practice__output-placeholder p-4 rounded bg-slate-100">После выполнения запроса, тут будет результат</div>

    </div>
    <!-- /.right -->

  </section>

  <section v-if="aiHelp" class="step-practice__ai exercise_ai p-4" v-html="aiHelp"></section>

  <section class="step-practice__editor exercise__editor my-3">


    <SqlEditor v-model="userCode" :is-completed="isCompleted" />

    <div v-if="errors.length > 0" class="step-practice__error p-4 mb-3 rounded bg-red-100">{{errors[0]}}. Попросим подсказку у ИИ?</div>

    <div v-if="isCompleted" class="step-practice__complete p-4 mb-3 rounded bg-emerald-50 ">
      ✅ {{congratulation}}
    </div>

    <button @click="run()" class="step-practice__button step-practice__button--run bg-black text-[#f2f6f8] rounded py-3 px-4 cursor-pointer inline-block font-medium mr-4 mb-4" v-if="!isCompleted">
        <span v-if="runnerStatus =='ready'"> Запустить и проверить</span>
        <span v-if="runnerStatus =='rendering'"> Готовим таблицы ...</span>
        <span v-if="runnerStatus =='running'"> Выполняем ... </span>
    </button>

    <button @click="nextStep()" class="step-practice__button step-practice__button--next bg-[#4ade80] text-slate-900 rounded p-3 cursor-pointer inline-block mr-4 mb-4 font-medium" v-if="isCompleted">
      <span>Следующее задание &nbsp; &nbsp;→</span>
    </button>

    <button @click="getAIHelp()" class="step-practice__button step-practice__button--ai bg-slate-200 rounded p-3 cursor-pointer mr-4" type="button" v-if="!isCompleted" >
      <span v-if="aiStatus =='ready'"> Получить помощь ии</span>
      <span v-if="aiStatus =='running'"> Подсказываем...</span>
    </button>

  </section>

  <section class="step-practice__feedback exercise__feedback">
    <div v-if="!checklist" class="step-practice__feedback-placeholder p-4 rounded bg-slate-100">После выполнения проверки, тут будет результат</div>
    <ul v-if="checklist" class="step-practice__checklist">
      <li v-for="checkpoint in checklist" :key="checkpoint.title" class="step-practice__checkpoint">
        <span v-if="checkpoint.completed" class="step-practice__checkpoint-text step-practice__checkpoint-text--done">✅ {{checkpoint.title}}</span>
        <span v-if="!checkpoint.completed" class="step-practice__checkpoint-text step-practice__checkpoint-text--failed">❌ {{checkpoint.title}}: <small>{{checkpoint.details}}</small></span>
      </li>
    </ul>
  </section>

</template>