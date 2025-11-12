import {defineStore} from 'pinia';
import {Step, Lesson, UserData} from "../types";
import {useStepStore} from "./step_store";
import {MiniStorage} from "../classes/storage.class";
import {ExerciseManager} from "../classes/exercise_manager.class";
import router from '../router'


export const useAppStore = defineStore('main', {

    state: () => ({

        steps: [],             // все шаги
        currentStepID: 1,      // стартовый / текущий шаг
        userData: null,        // номер, хеш и продукт пользователя
        status: "loading",     // Cостояние приложения (loading / ready / error)

    }),

    getters: {

        exercises: (state): Step[] => {
            // алиас для поддержки ошибок прошлого
            return state.steps
        },

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

                const dataURL =  "https://n8n-latest-5cu5.onrender.com/webhook/asql-get-content"
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

            if (this.state == "ready"){
                const exStore = useStepStore();
                exStore.setExercise(this.currentStep)
            }



        },

        setUserData(authData: UserData): void {

            console.log("Установлены данные авторизации")

            const userData: UserData = {
                userID: authData.userID,
                userHash: authData.userHash,
            }

            const miniStorage = new MiniStorage()
            miniStorage.saveUserData(userData)

        },

        loadUserData(): void {
            const miniStorage = new MiniStorage()
            this.userData = miniStorage.loadUserData()
            console.log("Локальные данные пользователя ", this.userData)

        },

        // Перейти к следующему заданию, если оно есть
        nextStep(): void {
            const nextStepID = this.currentStepID + 1
            this.setCurrentStep(nextStepID)
            return nextStepID
        }

    },
});
