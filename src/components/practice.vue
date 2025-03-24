<script lang="ts">

import {DBResponse, Step, Feedback} from "../types";
import {defineComponent} from "vue";
import {useStepStore} from "../stores/step_store";
import {useAppStore} from "../stores/app_store";

export default defineComponent({

  name: 'Practice',
  components: {},

  setup() {

    const appStore = useAppStore();
    const exStore = useStepStore();
    return { appStore, exStore };

  },

  data() {
    return {
      userCode: this.appStore.currentStep.userCode,

    }
  },

  computed: {

    status(): string { return this.appStore.status;  },
    userCode(): string { return this.appStore.currentStep.userCode; },
    runnerStatus(): string {return this.exStore.runnerStatus; },

    currentStep(): Step { return this.appStore.currentStep; },

    example(): DBResponse { return this.exStore.example; },
    output(): DBResponse { return this.exStore.output; },
    errors(): string[] { return this.exStore.errors; },

    aiHelp(): string {return this.exStore.aiHelp;},
    aiStatus(): string {return this.exStore.aiStatus;},

    isCompleted(): boolean { return this.exStore.isCompleted; },
    checklist(): Feedback { return this.exStore.checklist; },

  },

  methods: {

    async run(){
      console.log("Процессим решение")
      await this.exStore.run(this.userCode)
    },

    async getAIHelp(){
      console.log("Зовем на помощь AI")
      await this.exStore.getAIHelp(this.userCode)

    },

    nextStep(){
      this.userCode = ""
      window.scrollTo({top:0})
      this.appStore.nextStep(this.userCode)
    }

  },

  async mounted() {

    try {
      console.log("Начинаем монтировать практику")
      await this.exStore.runExample()

    } catch (error) {
      console.log(`Произошла ошибка при генерации примера ${error}`)
    }

  },

})

</script>

<template>

  <details>
    <summary class="cursor-pointer mt-2 mb-1 text-slate-600">Напомнить теорию</summary>
    <article v-html="currentStep.theory[0]"> </article>
  </details>

  <details>
    <summary class="cursor-pointer mb-1 text-slate-600">Показать схему таблиц</summary>
    <article><img :src="currentStep.schema" > </article>
  </details>


  <section class="grid grid-cols-2 gap-4 practice__example my-3" v-if="currentStep != null">

    <div class="left">

      <small>Образец</small>

      <div v-if="!example.rows" class="p-4 rounded bg-slate-100">Секунду, отрисовываем...</div>

      <table v-if="example">
        <thead class="text-gray-700 bg-gray-50">
        <tr class="">
          <th v-for="field in example.fields" class="p-2">
            {{field.name}}
          </th>
        </tr>
        </thead>

        <tbody>
        <tr v-for="row in example.rows" class="bg-white border-b border-gray-50">
          <td v-for="cell in row" class="px-2 py-1">
            {{cell}}
          </td>
        </tr>
        </tbody>
      </table>

    </div>
    <!-- /.left -->

    <div class="right">

      <small>Результат</small>

      <div v-if="output.rows" class="exercise__output" >

        <table>
          <thead class="text-gray-700 bg-gray-50">
          <tr>
            <th v-for="field in output.fields"> {{field.name}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="row in output.rows" class="bg-white border-b border-gray-50">
            <td v-for="cell in row" class="px-2 py-1">{{cell}} </td>
          </tr>
          </tbody>
        </table>

        <div v-if="output=={}" class="p-4 rounded bg-slate-100">После выполнения запроса, тут будет результат</div>
        <div v-if="output.fields && output.fields.length == 0 " class="p-4 rounded bg-slate-100">Запрос вернул пустой результат</div>

      </div>

    </div>
    <!-- /.right -->

  </section>

  <section class="exercise_ai" >

    <article v-html="aiHelp"></article>

  </section>

  <section class="exercise__editor my-3">

    <textarea v-model="userCode"
              class="w-full bg-[#eee]  rounded p-2 my-3"
              :class="{ 'bg-emerald-100': isCompleted,}"
              placeholder="Введите SQL запрос тут"
    >{{userCode}}</textarea>


    <div v-if="errors.length > 0" class="p-4 mb-3 rounded bg-red-100">{{errors[0]}}</div>

    <div v-if="isCompleted" class="p-4 mb-3 rounded bg-emerald-50 ">
      Задание выполнено, можно делать
      <button class="underline cursor-pointer" @click="nextStep()">Следующее</button>
    </div>

    <button @click="run()" class="bg-slate-500 text-white rounded p-3 cursor-pointer mr-4">
        <span v-if="runnerStatus =='ready'"> Запустить и проверить</span>
        <span v-if="runnerStatus =='rendering'"> Готовим таблицы ...</span>
        <span v-if="runnerStatus =='running'"> Выполняем ... </span>
    </button>

    <button @click="getAIHelp()" class="bg-slate-200 rounded p-3 cursor-pointer mr-4">
      <span v-if="aiStatus =='ready'"> Получить помощь ии</span>
      <span v-if="aiStatus =='running'"> Подсказываем...</span>
    </button>


  </section>



  <section class="exercise__feedback">
    <div v-if="!checklist" class="p-4 rounded bg-slate-100">После выполнения проверки, тут будет результат</div>
    <ul v-if="checklist">
      <li v-for="checkpoint in checklist">
        <span v-if="checkpoint.completed">✅ {{checkpoint.title}}</span>
        <span v-if="!checkpoint.completed">❌ {{checkpoint.title}}: <small>{{checkpoint.details}}</small></span>
      </li>
    </ul>
  </section>

</template>

