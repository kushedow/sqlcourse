export interface Feedback {

    title: string; // Название проверки
    completed: boolean; // Пройдена ли проверка
    details: string; // Пояснение к тесту

}

export interface Step {

    theory: string[];
    id: number;
    lesson: string;
    title: string;
    type: string;
    view: string;
    instruction: string;
    structure: string;
    records: string;
    solution: string;
    hint: string;
    snippets: string;
    schema: string;

    theory_steps: string;

    // подгружаемое их SavedStep
    isCompleted?: boolean;
    userCode?: string;

    data: object;

}

export interface SavedStep {

    id: number;
    userCode: string;
    isCompleted: boolean

}

// Сгруппирванные в уроки шаги (упражнения)
export interface Lesson {
    title: string;
    steps: Step[];
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

export interface AIResponse {
    response: string;
}

export interface UserData {
    userID: string;
    userHash: string;
    userProduct: string;
}