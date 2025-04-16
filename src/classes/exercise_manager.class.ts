import {Step} from "../types";

const APIURL = "https://proxy.kushedow.tech/AKfycbwWKJcWMg-tBqijcTyCl8tz1g79VpRlXhjImHQK8LkyppXZWFNEFDjTbz1aNvzJaEBw/steps"

export class ExerciseManager {

    public allExercises: Step[]

    constructor() {}

    // @ts-ignore
    async load(): Promise<Step[]> {

        try {
            const response = await fetch(APIURL);

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