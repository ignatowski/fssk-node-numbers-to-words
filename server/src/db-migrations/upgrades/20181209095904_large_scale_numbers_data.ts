import * as Knex from "knex";

exports.up = function (knex: Knex): Promise<any> {
	return Promise.resolve(knex("large_scale_numbers").insert([
		{language_id: 2, exponent: 3, singular: "mil", plural: null},
		{language_id: 2, exponent: 6, singular: "millón", plural: "millones"},
		{language_id: 2, exponent: 12, singular: "billón", plural: "billones"},
		{language_id: 2, exponent: 18, singular: "trillón", plural: "trillones"},
		{language_id: 2, exponent: 24, singular: "cuatrillón", plural: "cuatrillones"},
		{language_id: 2, exponent: 30, singular: "quintillón", plural: "quintillones"},
		{language_id: 2, exponent: 36, singular: "sextillón", plural: "sextillones"},
		{language_id: 2, exponent: 42, singular: "septillón", plural: "septillones"},
		{language_id: 2, exponent: 48, singular: "octillón", plural: "octillones"},
		{language_id: 2, exponent: 54, singular: "nonillón", plural: "nonillones"},
		{language_id: 2, exponent: 60, singular: "decillón", plural: "decillones"},
		{language_id: 2, exponent: 66, singular: "undecillón", plural: "undecillones"},
		{language_id: 2, exponent: 72, singular: "duodecillón", plural: "duodecillones"},
		{language_id: 2, exponent: 78, singular: "tredecillón", plural: "tredecillones"},
	]));
};

exports.down = function (knex: Knex): Promise<any> {
	return Promise.resolve(knex("large_scale_numbers").where({"language_id": 2, "digits": 1000}).del());
};
