import {Step} from "../types";

export class ExerciseManager {

    public allExercises: Step[]

    constructor() {}

    // @ts-ignore
    async load(apiURL): Promise<Step[]> {

        try {
            const response = await fetch(apiURL);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const receivedData: Step[] = await response.json(); // Parse the response body as JSON

            this.allExercises = receivedData;
            return receivedData

        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }

    }


}
