import { defineStore } from 'pinia';
import {Exercise} from "./types";


export const useTheStore = defineStore('grocery', {

    state: () => ({

        exercises: [],
        currentExerciseID: 1,
        userEditorInput: "",
        databaseOutput: {},
        status: "loading",

    }),

    getters: {

        currentExercise: (state) => {
            const currentID: number = state.currentExerciseID;
            const exercise: Exercise =  state.exercises.find(ex => ex.id == currentID)
            return exercise
        },

    },

    actions: {

        set(allExercises: Exercise[]) {
            this.exercises = allExercises;
        },

        setCurrentExercise(key: number): void{
            this.currentExerciseID = key;
        },

    },
});
