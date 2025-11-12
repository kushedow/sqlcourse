<script lang="ts">

import {DBResponse, Feedback, Step} from "../types";
import {defineComponent, nextTick, useTemplateRef} from "vue";
import {useStepStore} from "../stores/step_store";
import {useAppStore} from "../stores/app_store";
import ResponseTable from "./response_table.vue";
import Structuretables from "./structure_tables.vue";


export default defineComponent({

  name: 'Practice',
  components: {Structuretables, ResponseTable},

  setup() {

    const appStore = useAppStore();
    const exStore = useStepStore();
    return { appStore, exStore };

  },

  data() {
    return {
      userCodeTextarea: null
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

    textareaRows(): number { return  this.userCode?.split("\n").length || 1; },

    isUserLogged(): boolean { return  Boolean(this.appStore.userData?.userID) },

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

    copyName(name){

      if (!this.userCodeTextarea) return;

      const selectionStart = this.userCodeTextarea.selectionStart;
      const selectionEnd = this.userCodeTextarea.selectionEnd;
      const currentValue = this.userCodeTextarea.value;
      this.userCodeTextarea.value = currentValue.substring(0, selectionStart) + name + currentValue.substring(selectionEnd);
      this.userCodeTextarea.selectionStart = this.userCodeTextarea.selectionEnd = selectionStart + name.length;

      // Trigger input event (optional, but often needed for Vue/React reactivity)
      const event = new Event('input', {
        bubbles: true, cancelable: true,
      });
      this.userCodeTextarea.dispatchEvent(event);

      nextTick(()=> this.userCodeTextarea.focus())
    },

    nextStep(){
      this.userCode = ""
      window.scrollTo({top:0})
      const stepID = this.appStore.nextStep(this.userCode)
      this.appStore.pushRoute(`/step_/${stepID}`)
    }

  },

  async mounted() {

    try {
      console.log("Начинаем монтировать практику")
      // await this.appStore.currentStep(this.userCode)
      // await this.appStore.setCurrentStep()
      // await this.exStore.runExample()

    } catch (error) {
      console.log(`Произошла ошибка при генерации примера ${error}`)
    }

  },

})

</script>

<template>

  <details class="step_instruction">
    <summary class="cursor-pointer mt-2 mb-1 text-slate-600">Напомнить теорию</summary>
    <article v-html="currentStep.theory[0]"> </article>
  </details>

  <details>
    <summary class="cursor-pointer mb-1 text-slate-600">Показать схему таблиц</summary>
      <article class="flex pt-4 bg-[#F2F6F8] ">
        <Structuretables/>
      </article>
  </details>


  <section class="grid grid-cols-2 gap-4 practice__example my-3" v-if="currentStep != null">

    <div class="left">

      <small>Образец</small>

      <div v-if="!example.rows" class="p-4 rounded bg-slate-100">Секунду, отрисовываем...</div>

      <ResponseTable :outputData="example"></ResponseTable>

    </div>
    <!-- /.left -->

    <div class="right">

      <small>Результат</small>

      <div v-if="output.rows" class="exercise__output" >

        <ResponseTable :outputData="output"></ResponseTable>

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
              id = "userCodeTextarea"
              ref = "userCodeTextarea"
              :rows="textareaRows"
              class="w-full bg-[#F2F6F8]  rounded p-2 my-3"
              :class="{ 'bg-emerald-100': isCompleted,}"
              placeholder="Введите SQL запрос тут"
    ></textarea>


    <div v-if="errors.length > 0" class="p-4 mb-3 rounded bg-red-100">{{errors[0]}}</div>

    <div v-if="isCompleted" class="p-4 mb-3 rounded bg-emerald-50 ">
      ✅ Задание выполнено, можно делать cледующее!
    </div>

    <button @click="run()" class="bg-slate-500 text-white rounded p-3 cursor-pointer inline-block mr-4 mb-4" v-if="!isCompleted">
        <span v-if="runnerStatus =='ready'"> Запустить и проверить</span>
        <span v-if="runnerStatus =='rendering'"> Готовим таблицы ...</span>
        <span v-if="runnerStatus =='running'"> Выполняем ... </span>
    </button>

    <button @click="nextStep()" class="bg-[#4ade80] text-slate-900 rounded p-3 cursor-pointer inline-block mr-4 mb-4" v-if="isCompleted">
      <span>Следующее задание →</span>
    </button>

    <button @click="getAIHelp()" class="bg-slate-200 rounded p-3 cursor-pointer mr-4" v-if="isUserLogged" >
      <span v-if="aiStatus =='ready'"> Получить помощь ии</span>
      <span v-if="aiStatus =='running'"> Подсказываем...</span>
    </button>

    <a href="https://t.me/learn_sql_bot" class="bg-slate-200 rounded p-3 cursor-pointer mr-4" v-if="!isUserLogged">
      <span v-if="aiStatus =='ready'"> ✨ Включить помощь от ИИ</span>
    </a>


  </section>


  <section class="exercise__feedback">
    <div v-if="!checklist" class="p-4 rounded bg-slate-100">После выполнения проверки, тут будет результат</div>
    <ul v-if="checklist">
      <li v-for="checkpoint in checklist" >
        <span v-if="checkpoint.completed">✅ {{checkpoint.title}}</span>
        <span v-if="!checkpoint.completed">❌ {{checkpoint.title}}: <small>{{checkpoint.details}}</small></span>
      </li>
    </ul>
  </section>



</template>

