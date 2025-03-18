import {defineStore} from 'pinia';
import {DBResponse, Exercise, Feedback} from "../types";
import {SQLRunner} from "../classes/runner.class";
import {Checker} from "../classes/checker.class";


export const useExStore = defineStore('exercise', {


    state: () => ({

        userCode: '',

        structure:  '',
        records:  '',
        solution:  '',

        example: {},
        output: {},
        checklist: [],
        errors: [],
        status: "loading",


    }),

    getters: {

        isCompleted(store): boolean {
            if (store.checklist.length === 0) {return false}
            return store.checklist.every(checkpoint => checkpoint.completed);
        }

    },

    actions: {

        setExample(value: DBResponse): void { this.example = value; },

        setOutput(value: DBResponse): void { this.output = value; },

        pushError(value: Feedback[]): void { this.errors.push(value);},

        setChecklist(value: Feedback[]): void { this.checklist = value; },

        setExercise(exercise: Exercise): void{
            this.structure = exercise.structure
            this.records = exercise.records
            this.solution = exercise.solution
            this.resetOutput()
        },

        resetOutput(){
            this.output = {}
            this.errors = []
            this.checklist = []
        },

        async runExample(): Promise<void>{

            const runner = new SQLRunner()
            runner.reset()

            try {
                await runner.runAll(this.structure)
                await runner.runAll(this.records)
                this.example = await runner.run(this.solution)
                this.setExample(this.example)

            } catch (error){
                console.log(`Поймана ошибка во время выполнения примера ${error}`)
                this.pushError(error)
            }



        },

        async run(userCode){

            const runner = new SQLRunner()
            const checker = new Checker();

            this.resetOutput()
            runner.reset()
            await runner.runAll(this.structure + ";" + this.records)

            try {
                const output = await runner.run(userCode)
                this.setOutput(output)
            } catch (error){
                console.log(`Поймана ошибка во время выполнения ${error}`)
                this.pushError(error)
            }

            console.log("Проверяем решение")

            const headersFeedback = checker.checkHeaders(this.example, this.output);
            const countFeedback = checker.checkRowsLength(this.example, this.output);
            const rowsFeedback = checker.checkAllRows(this.example, this.output);

            const checklist = [].concat(headersFeedback,countFeedback, rowsFeedback)
            this.setChecklist(checklist)

        }

    },
});
