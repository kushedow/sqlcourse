import {defineStore} from 'pinia';
import {Step, Lesson} from "../types";
import {useStepStore} from "./step_store";
import {MiniStorage} from "../classes/storage.class";


export const useAppStore = defineStore('main', {

    state: () => ({

        steps: [],             // все шаги
        currentStepID: 0,      // стартовый / текущий шаг
        status: "loading",     // Cостояние приложения (loading / ready / error)

    }),

    getters: {

        exercises: (state) => {
            // алиас для поддержки ошибок прошлого
            return state.steps
        },

        currentStep: (state) => {
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

        // Сохраняем в стор все шаги после загрузки, попутн вспоминая что у нас в хранилище :)
        setSteps(allSteps: Step[]): void {

            const miniStorage = new MiniStorage()
            this.steps = miniStorage.restoreAllStepsData(allSteps);

            console.log("Шаги загружены и обогащены информацией из localStorage")
        },

        // Меням статус: loading / ready / error
        setStatus(value: string): void {
            this.status = value;
        },

        // Задаем в сторе задания
        setCurrentStep(key: number): void {
            this.currentStepID = key;
            console.log(`current step set to ${key}`);

            const exStore = useStepStore();
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
