import {defineStore} from 'pinia';
import {DBResponse, Step, Feedback} from "../types";
import {SQLRunner} from "../classes/runner.class";
import {Checker} from "../classes/checker.class";
import {MiniStorage} from "../classes/storage.class";
import {AIHelper} from "../classes/ai_helper.class";
import {useAppStore} from "./app_store";
import {REPORT_URL} from "../config.ts"


export const useStepStore = defineStore('exercise', {

    state: () => ({

        userCode: '',

        step: {},
        id: {},
        structure:  '',
        records:  '',
        solution:  '',

        example: {},
        output: {},
        checklist: [],
        errors: [],

        runnerStatus: "loading",
        aiStatus: "ready",
        aiHelp: "" ,

        tables: [], // Таблицы, которые нужно показать в структуре

    }),

    getters: {

        isCompleted(): boolean {
            if (this.checklist.length === 0) {return false}
            return this.checklist.every(checkpoint => checkpoint.completed);
        },

    },

    actions: {

        setExample(value: DBResponse): void { this.example = value; },

        setOutput(value: DBResponse): void { this.output = value; },

        pushError(value: Feedback[]): void { this.errors.push(value);},

        setChecklist(value: Feedback[]): void { this.checklist = value; },

        setExercise(step: Step): void{

            this.step = step

            this.id = step.id
            this.structure = step.structure
            this.records = step.records
            this.solution = step.solution
            this.runnerStatus = "ready"
            this.table_names = step.table_names

            this.aiHelp = ""
            this.aiStatus = "ready"

            this.resetOutput()
        },

        resetOutput(){
            this.output = {}
            this.errors = []
            this.checklist = []
        },

        async runExample(): Promise<void>{

            this.runnerStatus = "rendering"

            const runner = new SQLRunner()
            runner.reset()

            try {
                await runner.runAll(this.structure)
                await runner.runAll(this.records)
                this.example = await runner.run(this.solution)
                this.setExample(this.example)

            } catch (error){
                console.log(`Runner: Поймана ошибка во время выполнения примера ${error}`)
                this.pushError(error)
            }

            await this.getStructure(runner)

            this.runnerStatus = "ready"

            await this.reportEvent("opened")

        },

        async run(userCode: string){

            this.runnerStatus = "running"

            const runner = new SQLRunner()
            const checker = new Checker();
            const miniStorage = new MiniStorage();

            this.resetOutput()
            runner.reset()

            await runner.runAll(this.structure + ";" + this.records)

            try {
                const output = await runner.run(userCode)
                this.setOutput(output)
            } catch (error){
                console.log(`Runner: Поймана ошибка во время выполнения ${error}`)
                this.pushError(error)
                this.runnerStatus = "ready"
            }

            console.log("Проверяем решение")

            const headersFeedback = checker.checkHeaders(this.example, this.output);
            const countFeedback = checker.checkRowsLength(this.example, this.output);
            const rowsFeedback = checker.checkAllRows(this.example, this.output);

            const checklist = [].concat(headersFeedback,countFeedback, rowsFeedback)
            this.setChecklist(checklist)

            if (this.isCompleted) {
                await this.reportEvent("completed")
            }

            miniStorage.saveStepData(this.id, this.isCompleted, userCode)

            // Переключаем состояние раннера для отображения в UI
            this.runnerStatus = "ready"

        },

        async getStructure(runner): Promise<void>{

            const tableNamesList =  this.table_names?.replaceAll(" ", "").split(',') ?? []
            this.tables = await runner.getStructure(tableNamesList)
            console.log(this.tables)

        },

        async reportEvent(eventName=""): Promise<void>{

            const appStore = useAppStore()
            const userData = appStore.userData

            const url = REPORT_URL
            const data = {event: eventName, id: this.id, ...userData}
            const headers = {"Content-Type": "application/json" }

            try {
                const response = await fetch(url, {
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify(data)}
                );
                if (!response.ok) {  throw new Error(`Response status: ${response.status}`);}
                console.log(`Событие ${this.id} ${eventName} записано`)

            } catch (error) {
                console.error(`Событие ${this.id} ${eventName} не отправлено: `+error.message);
            }

        },


        async getAIHelp(userCode: string){

            this.aiStatus = "running"
            this.aiHelp = "Ждем подсказку от ИИ"

            const aiHelper = new AIHelper()
            this.aiHelp = await aiHelper.getHelp(this.step, userCode, this.errors)
            this.aiStatus = "ready"

            return this.aiHelp

        }

    },
});
