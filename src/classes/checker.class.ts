import {Feedback, DBResponse, Highlight, RowHighlight} from "../types";

export class Checker {

    // Единственная точка входа — полный чек-лист проверки решения
    check(example: DBResponse, output: DBResponse): Feedback[] {
        const headerChecks = this.checkHeaders(example, output);

        // Если названия колонок не совпали — сравнивать данные по строкам бессмысленно
        if (!headerChecks[0].completed) {
            return headerChecks;
        }

        return [
            ...headerChecks,
            ...this.checkRowsLength(example, output),
            ...this.checkAllRows(example, output),
        ];
    }

    // Матрица подсветки: какие ячейки результата верные, какие — нет.
    // В отличие от check(), работает и при несовпадении колонок — помечает их красным.
    compareCells(example: DBResponse, output: DBResponse): Highlight {
        const exampleColumns = example.fields.map(field => field.name);
        const outputColumns = output.fields.map(field => field.name);

        const columns: Record<string, boolean> = {};
        for (let i = 0; i < outputColumns.length; i++) {
            // Колонка совпадает, только если стоит на том же месте, что и в образце
            columns[outputColumns[i]] = outputColumns[i] === exampleColumns[i];
        }

        const cells: RowHighlight[] = [];
        for (let i = 0; i < output.rows.length; i++) {
            const exampleRow = example.rows[i] as Record<string, unknown> | undefined;
            const outputRow = output.rows[i] as Record<string, unknown>;
            const rowVerdict: RowHighlight = {};

            for (const column of outputColumns) {
                if (!columns[column]) {
                    // Несовпадающая колонка (лишняя или не на своём месте)
                    rowVerdict[column] = false;
                    continue;
                }
                if (!exampleRow) {
                    // Лишняя строка в результате
                    rowVerdict[column] = false;
                    continue;
                }
                rowVerdict[column] = this.normalizeValue(outputRow[column]) === this.normalizeValue(exampleRow[column]);
            }

            cells.push(rowVerdict);
        }

        return {columns, cells};
    }

    private checkHeaders(example: DBResponse, output: DBResponse): Feedback[] {
        const exampleKeys = example.fields.map(field => field.name);
        const outputKeys = output.fields.map(field => field.name);

        return [this.feedback(
            "Названия колонок совпадают с образцом",
            exampleKeys.toString() === outputKeys.toString(),
            `${JSON.stringify(exampleKeys)} != ${JSON.stringify(outputKeys)}`
        )];
    }

    private checkRowsLength(example: DBResponse, output: DBResponse): Feedback[] {
        const exampleCount = example.rows.length;
        const outputCount = output.rows.length;

        return [this.feedback(
            "Количество записей совпадает с образцом",
            exampleCount === outputCount,
            `${exampleCount} != ${outputCount}`
        )];
    }

    private checkAllRows(example: DBResponse, output: DBResponse): Feedback[] {
        // Если количество строк разное — по строкам сравнивать нечего,
        // об этом уже сообщил checkRowsLength.
        if (example.rows.length !== output.rows.length) return [];

        return example.rows.map((row, i) => {
            const exampleRow = this.serialize(row);
            const outputRow = this.serialize(output.rows[i]);

            return this.feedback(
                `Значения в ряду ${i + 1} совпадают`,
                exampleRow === outputRow,
                `${this.serializeValues(row)} != ${this.serializeValues(output.rows[i])}`
            );
        });
    }

    // Каноничный вид строки результата: числа и числовые строки равны (1 === "1")
    private serialize(row: object): string {
        return JSON.stringify(this.normalizeRow(row));
    }

    // Читаемые значения строки без ключей: "1, 🍏, Аpple, fruits, 45"
    private serializeValues(row: object): string {
        return Object.values(row).map(value => String(value)).join(", ");
    }

    private normalizeRow(row: object): object {
        const normalized: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(row)) {
            normalized[key] = this.normalizeValue(value);
        }
        return normalized;
    }

    private normalizeValue(value: unknown): unknown {
        if (typeof value === "number") return value;

        if (typeof value === "string") {
            const trimmed = value.trim();
            // Только «обычные» десятичные числа, без экспоненты/hex ("1e3", "0x10")
            if (/^-?\d+(\.\d+)?$/.test(trimmed)) {
                return Number(trimmed);
            }
        }

        return value;
    }

    // Единая фабрика пункта чек-листа
    private feedback(title: string, completed: boolean, details: string): Feedback {
        return {title, completed, details};
    }
}
