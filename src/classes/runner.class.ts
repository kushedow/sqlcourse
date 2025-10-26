import {PGlite} from "@electric-sql/pglite";
import {DBSchemaTable, DBSchemaColumn} from "../types";

export class SQLRunner{

    public db: PGlite;

    constructor(options={}) {
        // this.reset()
    }

    public reset(){
        console.log(`Runner: База сброшена>`)
        this.db = new PGlite()
    }

    async run(query: string) {

        console.log(`Runner: Выполняем запрос\n ${query}`)
        return await this.db.query(query);
    }

    async runAll(queries: string)  {

        const allQueries: string[] = queries.split(";")

        for (const query of allQueries){
            if (query.trim() != "") {
                await this.run(query)
            }
        }

    }

    async getStructure(tableNamesList: string[]): Promise<DBSchemaTable[]>{

        const tables: DBSchemaTable[] = []

        try {

            for (const tableName of tableNamesList) {

                const query = `
                    SELECT
                        a.attname as name,
                        format_type(a.atttypid, a.atttypmod) as type,
                        d.description as comment
                    FROM pg_catalog.pg_attribute a
                             LEFT JOIN pg_catalog.pg_description d
                             ON d.objoid = a.attrelid
                             AND d.objsubid = a.attnum
                    WHERE a.attrelid = '${tableName}'::regclass
                    AND a.attnum > 0 
                    AND NOT a.attisdropped 
                `

                const result = await this.run(query)

                tables.push({
                    name: tableName,
                    columns: result.rows.map(f => ({name: f.name, type: f.type, comment: f.comment}))
                })

            }

        } catch (error) {
            console.log("Не удалось получить структуру таблиц")
            console.log(error)
        }

        return tables

    }


}