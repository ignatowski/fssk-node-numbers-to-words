import { Database } from "./database";

test("to throw error if config isn't given", () => {
	/*[ts] Expected 1 arguments, but got 0. [2554]
	database.ts(11, 14): An argument for 'config' was not provided.
	(alias) new Database(config: Knex.Config): Database
	import Database
	*/
	// @ts-ignore
	expect(() => { const db = new Database(); }).toThrow();
});
