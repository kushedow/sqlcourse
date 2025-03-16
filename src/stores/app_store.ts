import {defineStore} from 'pinia';
import {Exercise} from "../types";
import {useExStore} from "./ex_store";


export const useAppStore = defineStore('main', {

    state: () => ({

        steps: [],             // все шаги
        currentStepID: 0,      // стартовый / текущий шаг
        status: "loading",     // Cостояние приложения (loading / ready / error)

    }),

    getters: {

        exercises: (state) => {
            return state.steps
        },

        currentStep: (state) => {
            const currentID: number = state.currentStepID;
            return state.steps.find(ex => ex.id == currentID)
        },

    },

    actions: {

        // Вгружаем все шаги после загрузки.
        setSteps(allSteps: Exercise[]): void {
            this.steps = allSteps;
            console.log("Шаги загружены")
        },

        // Меням статус: loading / ready / error
        setStatus(value: string): void {
            this.status = value;
        },

        // Задаем в сторе задания
        setCurrentStep(key: number): void {
            this.currentStepID = key;
            console.log(`current step set to ${key}`);

            const exStore = useExStore();
            exStore.setExercise(this.currentStep)
            if (this.currentStep.type == 'practice') {
                exStore.runExample().then()
            }
        },

        // Перейти к следующему заданию, если оно есть
        nextStep(): void {
            const nextStepID = this.currentStepID + 1
            this.setCurrentStep(nextStepID)
        }

    },
});
