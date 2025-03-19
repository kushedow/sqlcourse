import {Feedback, DBResponse} from "../types";

export class Checker {

    checkHeaders(output: DBResponse, example: DBResponse): Feedback[] {

        const checklist: Feedback[] = [];

        const exampleKeys = example.fields.map(key => key.name);
        const outputKeys = output.fields.map(key => key.name);

        checklist.push({
            title: "Названия колонок совпадают с образцом",
            completed: exampleKeys.toString() == outputKeys.toString(),
            details: ` ${JSON.stringify(exampleKeys)} != ${JSON.stringify(outputKeys)}`
        })

        return checklist

    }

    checkRowsLength(output: DBResponse, example: DBResponse): Feedback[] {

        const checklist: Feedback[] = [];

        const exampleCount: number = example.rows.length
        const outputCount: number = output.rows.length

        checklist.push({
            title: "Количество записей совпадает с образцом",
            completed: exampleCount == outputCount,
            details: `${exampleCount} != ${outputCount}`
        })

        return checklist

    }

    checkAllRows(output: DBResponse, example: DBResponse): Feedback[] {

        if (example.rows.length != output.rows.length) {return []}

        const checklist: Feedback[] = [];

        for (let i = 0; i < example.rows.length; i++) {

            const exampleRowValues = JSON.stringify(example.rows[i])
            const outputRowValues = JSON.stringify(output.rows[i])

            checklist.push({
                title: `Значения в ряду ${i} совпадают`,
                completed: exampleRowValues == outputRowValues,
                details: `${exampleRowValues} != ${outputRowValues}`
            })
        }

        return checklist

    }
}
