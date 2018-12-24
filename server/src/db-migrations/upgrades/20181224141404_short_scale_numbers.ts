import * as Knex from "knex";

exports.up = function (knex: Knex): Promise<any> {
	return Promise.resolve(knex.schema.createTableIfNotExists("short_scale_numbers", (table) => {
		table.integer("language_id");
		table.integer("exponent");
		table.string("singular");
		table.string("plural");
		table.primary(["language_id", "exponent"]);
		table.foreign("language_id", "short_scale_numbers_language_id_fkey")
			.references("languages.id")
			.onDelete("CASCADE")
			.onUpdate("CASCADE");
	}));
};

exports.down = function (knex: Knex): Promise<any> {
	return Promise.resolve(knex.schema.dropTable("short_scale_numbers"));
};
