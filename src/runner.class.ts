import {PGlite} from "@electric-sql/pglite";

export class SQLRunner{

    private db: PGlite;

    constructor(options={}) {

        this.reset()

    }

    reset(){
        this.db = new PGlite()
    }

    async run(query: string) {
        return await this.db.query(query);
    }

    async runAll(queries: string)  {

        const allQueries: string[] = queries.split(";")

        for (const query of allQueries){
            await this.run(query)
        }

    }

    fill(query){

    }

    check(preSQL="", attemptSQL="", postSQL=""){

    }

}