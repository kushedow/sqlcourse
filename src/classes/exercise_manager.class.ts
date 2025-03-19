import {Step} from "../types";

const APIURL = "https://api.cors.lol/?url=https://script.google.com/macros/s/AKfycbwWKJcWMg-tBqijcTyCl8tz1g79VpRlXhjImHQK8LkyppXZWFNEFDjTbz1aNvzJaEBw/exec"


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