import * as Knex from "knex";

exports.up = function (knex: Knex): Promise<any> {
	return Promise.resolve(knex.schema.createTableIfNotExists("languages", (table) => {
		table.integer("id").primary();
		table.string("name").unique().notNullable();
	}));
};

exports.down = function (knex: Knex): Promise<any> {
	return Promise.resolve(knex.schema.dropTable("languages"));
};
