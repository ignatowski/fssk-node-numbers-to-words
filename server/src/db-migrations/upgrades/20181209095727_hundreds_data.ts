import * as Knex from "knex";

exports.up = function (knex: Knex): Promise<any> {
	return Promise.resolve(knex("hundreds").insert([
		{language_id: 2, digits: 100, singular: "cien", plural: "ciento"},
		{language_id: 2, digits: 200, singular: "doscientos", plural: null},
		{language_id: 2, digits: 300, singular: "trescientos", plural: null},
		{language_id: 2, digits: 400, singular: "cuatrocientos", plural: null},
		{language_id: 2, digits: 500, singular: "quinientos", plural: null},
		{language_id: 2, digits: 600, singular: "seiscientos", plural: null},
		{language_id: 2, digits: 700, singular: "setecientos", plural: null},
		{language_id: 2, digits: 800, singular: "ochocientos", plural: null},
		{language_id: 2, digits: 900, singular: "novecientos", plural: null}
	]));
};

exports.down = function (knex: Knex): Promise<any> {
	return Promise.resolve(knex("hundreds").where("language_id", 2).whereIn("digits", [100, 200, 300, 400, 500, 600, 700, 800, 900]).del());
};
