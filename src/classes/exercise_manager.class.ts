import {Step} from "../types";

// Сырой объект задания из нового API (n8berry)
interface RawExercise {
    _rowid: number;
    uuid: string;
    step: string;
    title: string;
    content: string;
    type: string;
    lesson: string;
    structure: string;
    records: string;
    solution: string;
    theory_steps: string | null;
}

// Ответ нового API: задания обёрнуты в { rows: [...] }
interface RawResponse {
    rows: RawExercise[];
}

export class ExerciseManager {

    public allExercises: Step[]

    constructor() {}

    async load(apiURL: string, token?: string): Promise<Step[]> {

        try {
            const headers: Record<string, string> = {}
            if (token) { headers["Authorization"] = `Bearer ${token}` }

            const response = await fetch(apiURL, {headers});

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data: RawResponse = await response.json();
            const rows = data.rows;

            // uuid -> номер шага, чтобы резолвить theory_steps в числовой id
            const stepByUuid = new Map(rows.map((row) => [row.uuid, Number(row.step)]));

            const steps: Step[] = rows
                .map((row) => this.mapRow(row, stepByUuid))
                .sort((a, b) => a.id - b.id); // порядок по номеру шага

            this.allExercises = steps;
            return steps

        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }

    }

    // Маппинг сырого задания из API в формат Step
    private mapRow(raw: RawExercise, stepByUuid: Map<string, number>): Step {
        return {
            id: Number(raw.step),                      // ключ для #/step_x
            title: raw.title,
            type: raw.type,
            lesson: raw.lesson,
            instruction: raw.content,                  // content -> instruction
            structure: raw.structure,
            records: raw.records,
            solution: raw.solution,
            // theory_steps приходит uuid теории, резолвим в номер шага
            theory_steps: raw.theory_steps
                ? String(stepByUuid.get(raw.theory_steps) ?? "")
                : "",
            // Названия таблиц из SQL-структуры (CREATE TABLE ...)
            table_names: this.extractTableNames(raw.structure),
            theory: [],                                // заполнит attachTheory
        }
    }

    // Достаём имена таблиц из SQL-кода создания структуры
    private extractTableNames(structure: string): string {
        if (!structure) { return "" }

        const names = Array.from(
            structure.matchAll(/CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?["`]?(\w+)/gi)
        ).map((match) => match[1])

        return names.join(",")
    }

}
