<script lang="ts">

import {DBResponse, Exercise, Feedback} from "../types";
import {defineComponent} from "vue";
import {useExStore} from "../stores/ex_store";
import {useAppStore} from "../stores/app_store";

export default defineComponent({

  name: 'Practice',
  components: {},

  setup() {

    const appStore = useAppStore();
    const exStore = useExStore();
    return { appStore, exStore };

  },

  data() {
    return {
      userCode: "",
    }
  },

  computed: {

    status(): string { return this.appStore.status;  },
    runnerStatus(): string {return this.exStore.runnerStatus; },
    currentStep(): Exercise { return this.appStore.currentStep; },

    example(): DBResponse { return this.exStore.example; },
    output(): DBResponse { return this.exStore.output; },
    errors(): string[] { return this.exStore.errors; },
    isCompleted(): boolean { return this.exStore.isCompleted; },
    checklist(): Feedback { return this.exStore.checklist; },

  },

  methods: {

    async run(){
      console.log("Процессим решение")
      await this.exStore.run(this.userCode)
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

  <section class="practice__example my-3 border border-gray-200 rounded-xl shadow-2xs p-4" v-if="currentStep != null">

    <div v-if="!example.rows" class="p-4 rounded bg-slate-100">Секунду, отрисовываем образец...</div>

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
        <td v-for="cell in row" class="p-2">
          {{cell}}
        </td>
      </tr>
      </tbody>
    </table>

  </section>

  <section class="exercise__editor my-3">
    <textarea v-model="userCode" class="w-full bg-[#eee] rounded p-2 my-3" placeholder="Введите SQL запрос тут"></textarea>

    <div v-if="errors.length > 0" class="p-4 mb-3 rounded bg-red-100">{{errors[0]}}</div>

    <div v-if="isCompleted" class="p-4 mb-3 rounded bg-emerald-100 cursor-pointer">
      Задание выполнено, можно делать следующее
      <button class="underline" @click="nextStep()">Следующее</button>
    </div>

    <button @click="run()" class="bg-slate-500 text-white rounded p-3 cursor-pointer mr-4">
        <span v-if="runnerStatus =='ready'"> Запустить и проверить</span>
        <span v-if="runnerStatus =='rendering'"> Готовим таблицы ...</span>
        <span v-if="runnerStatus =='running'"> Выполняем ... </span>

    </button>


  </section>

  <section v-if="output.rows" class="exercise__output my-3 border border-gray-200 rounded-xl shadow-2xs p-4" >

    <table>
        <thead class="text-gray-700 bg-gray-50">
        <tr>
          <th v-for="field in output.fields"> {{field.name}}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="row in output.rows" class="bg-white border-b border-gray-50">
          <td v-for="cell in row" class="px-3 py-2">{{cell}} </td>
        </tr>
        </tbody>
      </table>

    <div v-if="output=={}" class="p-4 rounded bg-slate-100">После выполнения запроса, тут будет результат</div>
    <div v-if="output.fields && output.fields.length == 0 " class="p-4 rounded bg-slate-100">Запрос вернул пустой результат</div>

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

