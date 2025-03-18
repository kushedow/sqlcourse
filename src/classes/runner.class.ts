import {PGlite} from "@electric-sql/pglite";

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
            await this.run(query)
        }

    }


}