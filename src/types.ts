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

    structure: string; // SQL код создания структуры
    records: string; // SQL код создания записей
    solution: string;  // SQL код решения

    hint: string;  // Текст подсказки
    snippets: string;
    schema: string; // непонятно что такое
    table_names: string; // Названия таблиц
    theory_steps: string; // Шаги теории, которые нужно показать

    // подгружаемое из SavedStep
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

export interface DBSchemaTable {
    name: string;
    columns: DBSchemaColumn[]
}

export interface DBSchemaColumn{
    name: string;
    type: string;
    comment: string;
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