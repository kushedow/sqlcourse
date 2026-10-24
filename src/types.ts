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

// Сгруппированные в уроки шаги (упражнения)
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

// Подсветка ячеек результата
export type RowHighlight = Record<string, boolean>;

export interface Highlight {
    columns: Record<string, boolean>; // колонка есть в образце? (false = лишняя)
    cells: RowHighlight[];            // cells[ряд][колонка] = верно/неверно
}


export interface AIResponse {
    response: string;
}