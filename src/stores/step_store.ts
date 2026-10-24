import {defineStore} from 'pinia';
import {DBResponse, Step, Feedback} from "../types";
import {SQLRunner} from "../classes/runner.class";
import {Checker} from "../classes/checker.class";
import {MiniStorage} from "../classes/storage.class";
import {AIHelper} from "../classes/ai_helper.class";
import {useAppStore} from "./app_store";
import {REPORT_URL} from "../config"


export const useStepStore = defineStore('exercise', {

    state: () => ({

        step: {},
        id: {},
        structure:  '',
        records:  '',
        solution:  '',

        example: {},
        output: {},
        checklist: [],
        errors: [] as string[],

        runnerStatus: "loading",
        aiStatus: "ready",
        aiHelp: "" ,

        tables: [], // Таблицы, которые нужно показать в структуре
        table_names: '', // Имена таблиц, по которым строится структура

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

        pushError(error: unknown): void { this.errors.push(String(error));},

        setChecklist(value: Feedback[]): void { this.checklist = value; },

        setExercise(step: Step): void{

            if (!step) {console.log("Wrong argument step")}

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

            const runner = SQLRunner.getInstance()
            await runner.reset()

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

            if (this.runnerStatus !== "ready") { return }

            this.runnerStatus = "running"

            const runner = SQLRunner.getInstance()
            const checker = new Checker();
            const miniStorage = new MiniStorage();

            this.resetOutput()

            try {
                await runner.reset()
                await runner.runAll(this.structure + ";" + this.records)

                let output
                try {
                    output = await runner.run(userCode)
                } catch (error){
                    console.log(`Runner: Поймана ошибка во время выполнения ${error}`)
                    this.pushError(error)
                }
                if (output) { this.setOutput(output) }

                console.log("Проверяем решение")

                this.setChecklist(checker.check(this.example, this.output))

                if (this.isCompleted) {
                    await this.reportEvent("completed", {code: userCode})
                } else {
                    await this.reportEvent("failed", {code: userCode})
                }

                miniStorage.saveStepData(this.id, this.isCompleted, userCode)

                // Синхронизируем статус с основным стором, чтобы навигация сразу показала галочку
                useAppStore().setStepCompleted(this.id, this.isCompleted)

            } catch (error) {
                console.log(`Runner: Неожиданная ошибка во время проверки ${error}`)
                this.pushError(error)
            } finally {
                // Переключаем состояние раннера для отображения в UI
                this.runnerStatus = "ready"
            }

        },

        async getStructure(runner): Promise<void>{

            const tableNamesList =  this.table_names?.replaceAll(" ", "").split(',') ?? []
            this.tables = await runner.getStructure(tableNamesList)
            console.log(this.tables)

        },

        async reportEvent(eventName: String="", details: Object = {}): Promise<void>{

            const url = REPORT_URL
            const data = {event: eventName, id: this.id,  details: details}
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

            await this.reportEvent("aihelp", {code: userCode})

            const aiHelper = new AIHelper()
            this.aiHelp = await aiHelper.getHelp(this.step, userCode, this.errors)
            this.aiStatus = "ready"

            return this.aiHelp

        }

    },
});
