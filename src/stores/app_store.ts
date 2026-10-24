import {defineStore} from 'pinia';
import {Step, Lesson} from "../types";
import {useStepStore} from "./step_store";
import {MiniStorage} from "../classes/storage.class";
import {ExerciseManager} from "../classes/exercise_manager.class";
import {SERVER_URL} from "../config";
import router from '../router'


export const useAppStore = defineStore('main', {

    state: () => ({

        steps: [],             // все шаги
        currentStepID: 1,      // стартовый / текущий шаг
        status: "loading",     // Cостояние приложения (loading / ready / error)

    }),

    getters: {

        currentStep: (state): Step => {
            console.log("Выполняем поиск задания ", state.currentStepID)
            if(state.steps.length == 0) {console.error("Список заданий пуст, нельзя получить")}

            const currentID: number = state.currentStepID;
            return state.steps.find(ex => ex.id == currentID)
        },


        groupedExercises: (state): Lesson[] => {
            const grouped = [];
            const lessonMap = new Map(); // Use a Map for efficient lookups
            for (const step of state.steps) {
                const lessonName = step.lesson;

                if (!lessonMap.has(lessonName)) {
                    lessonMap.set(lessonName, { title: lessonName, steps: [] });
                    grouped.push(lessonMap.get(lessonName)); // Add the new group to the result array
                }
                lessonMap.get(lessonName).steps.push(step);
            }
            return grouped;
        }

    },

    actions: {

        async pushRoute(location) {

           await router.push(location)

        },

        async loadData(): Promise<void> {

                const manager = new ExerciseManager() ;

            try {

                // загружаем задания, если не выбран продукт - загружаем Basic

                const dataURL =  SERVER_URL + "/webhook/asql-get-content"
                const allSteps = await manager.load(dataURL)

                this.setSteps(allSteps);

                const exStore = useStepStore();
                exStore.setExercise(this.currentStep)

                this.setStatus("ready")


            } catch (error) {
                console.log(`Произошла ошибка при загрузке ${error}. Напишите t.me/kushedow`)
                this.setStatus("error")
            }

        },

        getStep(stepID: number) : Step | null {
            return this.steps.find((step: Step) => step.id == stepID)
        },

        attachTheory(steps: Step[]){

            for (const step of steps) {
                if (step.type == 'theory' || !step.theory_steps) { step.theory = []; continue;}
                step.theory = [this.getStep(+step.theory_steps).instruction]
            }

            return steps

        },

        // Сохраняем в стор все шаги после загрузки, попутно вспоминая, что у нас в локальном хранилище
        setSteps(allSteps: Step[]): void {

            const miniStorage = new MiniStorage()

            this.steps = miniStorage.restoreAllStepsData(allSteps);
            this.steps = this.attachTheory(this.steps);

            console.log("Шаги загружены и обогащены информацией из localStorage")
        },

        // Меням статус: loading / ready / error
        setStatus(value: string): void {
            this.status = value;
        },

        // Задаем в сторе задания

        setCurrentStep(key: number): void {

            this.currentStepID = Number(key);
            console.log(`current step set to ${key}`);

        },

        // Отмечаем шаг выполненным, чтобы навигация сразу показывала галочку
        setStepCompleted(stepID: number, isCompleted: boolean): void {
            const step = this.getStep(stepID);
            if (step) {
                step.isCompleted = isCompleted;
            }
        },

        // Перейти к следующему заданию, если оно есть.
        // Если следующего задания нет — ничего не меняем и возвращаем текущий шаг.
        nextStep(): number {
            const nextStepID = this.currentStepID + 1

            if (!this.getStep(nextStepID)) {
                console.warn(`Следующее задание (${nextStepID}) не найдено, остаёмся на месте`)
                return this.currentStepID
            }

            this.setCurrentStep(nextStepID)
            return nextStepID
        }

    },
});
