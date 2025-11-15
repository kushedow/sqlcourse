import {SavedStep, Step, UserData} from "../types";

export class MiniStorage {

    constructor() {}

    saveUserData(userData: UserData): void {
        localStorage.setItem("userData", JSON.stringify(userData))
        console.log("saveUserData", JSON.stringify(userData))
    }

    loadUserData(): UserData {
        const userDataJSON = localStorage.getItem("userData")
        console.log("loadUserData", userDataJSON)
        if (userDataJSON) {
            return JSON.parse(userDataJSON)
        }

        return {
            userID: null,
            userHash: null,
        }

    }

    saveStepData(stepID: number, isCompleted: boolean = false, userCode: string = ""): void {

        const savedStep: SavedStep = {
            id: stepID,
            isCompleted: isCompleted,
            userCode: userCode
        }

        const key = `step_${savedStep.id}`
        localStorage.setItem(key, JSON.stringify(savedStep))

    }

    restoreStepData(step: Step): Step {

        const key = `step_${step.id}`
        const savedData = localStorage.getItem(key)
        if (!savedData) {return step}

        const savedStep: SavedStep =  JSON.parse(savedData)
        step.isCompleted = savedStep.isCompleted
        step.userCode = savedStep.userCode

        return step
    }

    restoreAllStepsData(steps: Step[]): Step[] {
        return steps.map(step => this.restoreStepData(step))
    }


}