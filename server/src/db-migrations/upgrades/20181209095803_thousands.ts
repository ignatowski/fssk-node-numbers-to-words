import * as Knex from "knex";

exports.up = function (knex: Knex): Promise<any> {
	return Promise.resolve(knex.schema.createTableIfNotExists("thousands", (table) => {
		table.integer("language_id");
		table.integer("digits");
		table.string("singular");
		table.string("plural");
		table.primary(["language_id", "digits"]);
		table.foreign("language_id", "thousands_language_id_fkey")
			.references("languages.id")
			.onDelete("CASCADE")
			.onUpdate("CASCADE");
	}));
};

exports.down = function (knex: Knex): Promise<any> {
	return Promise.resolve(knex.schema.dropTable("thousands"));
};
