import {Exercise} from "../types";

const APIURL = "https://functions.yandexcloud.net/d4e426vjguftonb368aj"


export class ExerciseManager {

    public allExercises: Exercise[]

    constructor() {}

    // @ts-ignore
    async load(): Promise<Exercise[]> {

        try {
            const response = await fetch(APIURL);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const receivedData: Exercise[] = await response.json(); // Parse the response body as JSON

            this.allExercises = receivedData;
            return receivedData

        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }

    }
}