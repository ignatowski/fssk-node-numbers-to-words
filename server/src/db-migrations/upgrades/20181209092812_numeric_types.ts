import * as Knex from "knex";

exports.up = function (knex: Knex): Promise<any> {
	return Promise.resolve(knex.schema.createTableIfNotExists("numeric_types", (table) => {
		table.integer("id").primary();
		table.string("name");
	}));
};

exports.down = function (knex: Knex): Promise<any> {
	return Promise.resolve(knex.schema.dropTable("numeric_types"));
};
