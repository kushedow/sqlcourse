import { defineStore } from 'pinia';
import {Exercise} from "../types";
import {useExStore} from "./ex_store";


export const useAppStore = defineStore('main', {

    state: () => ({

        steps: [],
        currentStepID: 0,
        userEditorInput: "",
        databaseOutput: {},
        status: "loading",

    }),

    getters: {

        exercises: (state) => {
            return state.steps
        },

        currentStep: (state) => {
            const currentID: number = state.currentStepID;
            const step =  state.steps.find(ex => ex.id == currentID)
            return step
        },

    },

    actions: {

        setSteps(allSteps: Exercise[]):void {
            this.steps = allSteps;
            console.log("Шаги загружены")
        },

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
        nextStep():void {
            const nextStepID = this.currentStepID + 1
            this.setCurrentStep(nextStepID)
        }

    },
});
