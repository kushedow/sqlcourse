<script lang="ts">

import {defineComponent} from 'vue';
import {useTheStore} from './store.ts';

import {SQLRunner} from "./runner.class.ts"
import {ExerciseManager} from "./exercise_manager.class.js"
import {Checker} from "./checker.class.js"

import {DBResponse, Exercise, Feedback} from "./types";

export default defineComponent({

  name: 'Learn SQL',

  setup() {
    const store = useTheStore();
    const runner = new SQLRunner();
    const manager = new ExerciseManager();
    const checker = new Checker()
    return { store, runner,  manager, checker };

  },

  data() {
    return {
      userCode: '',
      example: {},
      output: {},
      checklist: [],
      errors: [],
    };
  },

  computed: {

    exercises(): Exercise[] {
      return this.store.exercises;
    },

    currentExercise(): Exercise{
      return this.store.currentExercise;
    },

    isCompleted(): boolean {
      if (this.checklist.length === 0) {return false}
      return this.checklist.every(checkpoint => checkpoint.completed);
    }

  },

  async mounted() {

    const allExercises = await this.manager.load()
    this.store.set(allExercises);
    await this.runExample()

  },

  methods: {

    addExercise() {
      this.store.addExercise({"title": 3}); // Use UUID for ID
    },

    selectExercise(key){
      this.store.setCurrentExercise(key)
      this.runner.reset()
    },

    async runExample(): Promise<void>{

      await this.runner.reset()
      await this.runner.runAll(this.currentExercise.structure)
      await this.runner.runAll(this.currentExercise.records)
      this.example = await this.runner.run(this.currentExercise.solution)

    },


    async run(){

      console.log("Процессим решение")

      this.output = {}
      this.checklist = []
      this.errors = []

      const exercise = this.currentExercise;

      await this.runner.reset()
      await this.runner.runAll(exercise.structure)
      await this.runner.runAll(exercise.records)

      try {
        this.output = await this.runner.run(this.userCode)
      } catch (error){
        this.errors.push(error);
      }

      console.log("Проверяем решение")

      const headersFeedback = this.checker.checkHeaders(this.example, this.output);
      const countFeedback = this.checker.checkRowsLength(this.example, this.output);
      const rowsFeedback = this.checker.checkAllRows(this.example, this.output);

      this.checklist = [].concat(headersFeedback,countFeedback, rowsFeedback)

    },

  },

});

</script>

<template>

  <div class="container mx-auto rounded-xl bg-white p-5 mt-6 2xl:w-1/2 xl:w-2/3 ">

    <h1  v-if="!currentExercise">Загружаем задания</h1>

    <div  v-if="currentExercise">

      <h1 class="text-3xl mb-3">{{ currentExercise.title }}</h1>

      {{currentExercise.instruction}}

      <section class="my-3">

        <div v-if="!example.fields" class="p-4 rounded bg-slate-100">Секунду, отрисовываем образец...</div>

        <table>
          <thead class="text-xs text-gray-700 bg-gray-50">
          <tr class="">
            <th v-for="field in example.fields" class="p-2">
              {{field.name}}
            </th>
          </tr>
          <tr v-for="row in example.rows" class="bg-white border-b">
            <td v-for="cell in row" class="p-2">
               {{cell}}
            </td>
          </tr>
          </thead>
        </table>
      </section>


      <section class="exercise__editor my-3">

        <textarea v-model="userCode" class="w-full bg-[#eee] rounded p-2 my-3" placeholder="Введите SQL запрос тут"></textarea>

        <div v-if="errors[0]" class="p-4 mb-3 rounded bg-red-100">{{errors[0]}}}</div>

        <div v-if="isCompleted" class="p-4 mb-3 rounded bg-emerald-100">Задание выполнено, можно делать следующее</div>

        <button @click="run()" class="bg-slate-500 text-white rounded p-3 cursor-pointer mr-4">Запустить и проверить</button>

      </section>

      <section class="exercise__output my-3">
        <p v-if="output.fields">Результат:</p>
        <table v-if="output.fields">
          <tr>
            <th v-for="field in output.fields"> {{field.name}}</th>
          </tr>
          <tr v-for="row in output.rows">
            <td v-for="cell in row">{{cell}} </td>
          </tr>
        </table>

      <div v-if="!output.fields" class="p-4 rounded bg-slate-100">После выполнения запроса, тут будет результат</div>

      <div v-if="output.fields && output.fields.length == 0 " class="p-4 rounded bg-slate-100">Запрос вернул пустой результат</div>




      </section>

      <section class="exercise__feedback">

        <div v-if="!checklist[0]" class="p-4 rounded bg-slate-100">После выполнения проверки, тут будет результат</div>



        <ul v-if="checklist[0]">
          <li v-for="checkpoint in checklist">
            <span v-if="checkpoint.completed">✅ {{checkpoint.title}}</span>
            <span v-if="!checkpoint.completed">❌ {{checkpoint.title}}: <small>{{checkpoint.details}}</small></span>
          </li>
        </ul>

      </section>

    </div>


  </div><!--/container -->
</template>
