<script lang="ts">
import {DBResponse, Feedback, Step} from "../../types";
import {defineComponent, nextTick} from "vue";
import {useStepStore} from "../../stores/step_store";
import {useAppStore} from "../../stores/app_store";
import ResponseTable from "../practice/response_table.vue";
import Structuretables from "../practice/structure_tables.vue";

import CodeEditor from "simple-code-editor";


export default defineComponent({

  name: 'Practice',
  components: {Structuretables, ResponseTable, CodeEditor},

  setup() {

    const appStore = useAppStore();
    const exStore = useStepStore();
    return { appStore, exStore };

  },

  data() {
    return {
      "userCode" : ""
    }
  },

  computed: {

    status(): string { return this.appStore.status;  },
    // userCode(): string { return this.appStore.currentStep.userCode; },
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

    snippets(): string[] {return ["SELECT", "FROM", "WHERE", "JOIN", "ORDER", "LIMIT", "*", "," , "=", "AND", "OR", "ON"] }

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

    copyName(name: string){

      const userCodeTextarea: HTMLTextAreaElement = document.querySelector(".code-editor textarea")

      if (!userCodeTextarea) return;

      const selectionStart = userCodeTextarea.selectionStart;
      const selectionEnd = userCodeTextarea.selectionEnd;
      const currentValue = userCodeTextarea.value;
      userCodeTextarea.value = currentValue.substring(0, selectionStart) + name + currentValue.substring(selectionEnd);
      userCodeTextarea.selectionStart = userCodeTextarea.selectionEnd = selectionStart + name.length;

      // Trigger input event (optional, but often needed for Vue/React reactivity)
      const event = new Event('input', {
        bubbles: true, cancelable: true,
      });
      userCodeTextarea.dispatchEvent(event);

      nextTick(()=> userCodeTextarea.focus())
    },

    nextStep(){
      this.appStore.currentStep.userCode = ""
      this.userCode = ""
      window.scrollTo({top:0})
      const stepID = this.appStore.nextStep(this.userCode)
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

  <article v-html="currentStep.instruction" class="step-practice__instruction step_instruction"></article>

  <details class="step-practice__theory step_instruction">
    <summary class="step-practice__theory-summary cursor-pointer mt-2 mb-1 text-emerald-600">Напомнить теорию</summary>
    <article v-html="currentStep.theory[0]" class="step-practice__theory-content"> </article>
  </details>

  <details class="step-practice__schema">
    <summary class="step-practice__schema-summary cursor-pointer mb-1 text-emerald-600">Показать схему таблиц</summary>
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

      <div v-if="output.rows" class="step-practice__output exercise__output" >

        <ResponseTable :outputData="output"></ResponseTable>

        <div v-if="output.fields && output.fields.length == 0 " class="step-practice__output-empty p-4 rounded bg-slate-100">Запрос вернул пустой результат</div>

      </div>

      <div v-else class="step-practice__output-placeholder p-4 rounded bg-slate-100">После выполнения запроса, тут будет результат</div>

    </div>
    <!-- /.right -->

  </section>

  <section class="step-practice__ai exercise_ai" >

    <article v-html="aiHelp" class="step-practice__ai-help"></article>

  </section>

  <section class="step-practice__editor exercise__editor my-3">


    <CodeEditor
        :line-nums="true" padding="15px" theme="felipec" :languages="[['sql']]" width="100%" :display-language="false" :copy-code="false" :header="false" border-radius="8px" v-model="userCode"  font-size="16px"></CodeEditor>

    <div class="step-practice__palette palette my-2 text-[12px] opacity-20 hover:opacity-100 transition ease-in duration-200" v-if="!isCompleted">
      <span v-for="snip in snippets"
            class="step-practice__snippet p-1 bg-[#F2F6F8]  text-gray-600 mr-1 rounded cursor-pointer"
            @click="this.copyName(` ${snip} `)">{{snip}}</span>
    </div>
    <!-- /.palette -->

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

    <button @click="getAIHelp()" class="step-practice__button step-practice__button--ai bg-slate-200 rounded p-3 cursor-pointer mr-4" type="button" v-if="isUserLogged && !isCompleted" >
      <span v-if="aiStatus =='ready'"> Получить помощь ии</span>
      <span v-if="aiStatus =='running'"> Подсказываем...</span>
    </button>

    <a href="https://t.me/learn_sql_bot" class="step-practice__promo-link bg-slate-200 rounded p-3 cursor-pointer mr-4" v-if="!isUserLogged">
      <span v-if="aiStatus =='ready'"> ✨ Включить помощь от ИИ</span>
    </a>

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