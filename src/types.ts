export interface Feedback {

    title: string; // Название проверки
    completed: boolean; // Пройдена ли проверка
    details: string; // Пояснение к тесту

}

export interface Exercise {
    id: number;
    lesson: string;
    title: string;
    type: string;
    instruction: string;
    structure: string;
    records: string;
    solution: string;
    hint: string;
    snippets: string;
    data: object;
}

export interface DBTableColumn {
    name: string;
    dataTypeID: number;
}

export interface DBResponse {
    rows: object[];
    fields: DBTableColumn[];
    affectedRows: number;
}