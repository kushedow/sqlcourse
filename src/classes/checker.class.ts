import {Feedback, DBResponse} from "../types";

export class Checker {

    // Единственная точка входа — полный чек-лист проверки решения
    check(example: DBResponse, output: DBResponse): Feedback[] {
        return [
            ...this.checkHeaders(example, output),
            ...this.checkRowsLength(example, output),
            ...this.checkAllRows(example, output),
        ];
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
                `Значения в ряду ${i} совпадают`,
                exampleRow === outputRow,
                `${exampleRow} != ${outputRow}`
            );
        });
    }

    // Каноничный вид строки результата: числа и числовые строки равны (1 === "1")
    private serialize(row: object): string {
        return JSON.stringify(this.normalizeRow(row));
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
