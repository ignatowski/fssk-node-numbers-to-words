import * as Knex from "knex";

exports.up = function (knex: Knex): Promise<any> {
	return Promise.resolve(knex("numeric_types").insert([
		{id: 1, name: "numbers (short scale)"},
		{id: 2, name: "numbers (long scale)"},
		{id: 3, name: "ordinal numbers"},
		{id: 4, name: "fractions"}
	]));
};

exports.down = function (knex: Knex): Promise<any> {
	return Promise.resolve(knex("numeric_types").where("id", "IN", [1, 2, 3, 4]).del());
};
