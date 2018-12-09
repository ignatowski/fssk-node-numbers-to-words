import * as Knex from "knex";

exports.up = function (knex: Knex): Promise<any> {
	return Promise.resolve(knex.schema.createTableIfNotExists("numeric_type_translations", (table) => {
		table.integer("numeric_type_id");
		table.integer("language_id");
		table.integer("order").notNullable();
		table.string("name").notNullable();
		table.text("description");
		table.json("tables").notNullable();
		table.primary(["numeric_type_id", "language_id"]);
		table.foreign("numeric_type_id", "numeric_type_translations_numeric_type_id_fkey")
			.references("numeric_types.id")
			.onDelete("CASCADE")
			.onUpdate("CASCADE");
		table.foreign("language_id", "numeric_type_translations_language_id_fkey")
			.references("languages.id")
			.onDelete("CASCADE")
			.onUpdate("CASCADE");
	}));
};

exports.down = function (knex: Knex): Promise<any> {
	return Promise.resolve(knex.schema.dropTable("numeric_type_translations"));
};
