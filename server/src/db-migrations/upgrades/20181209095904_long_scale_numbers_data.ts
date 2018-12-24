import * as Knex from "knex";

exports.up = function (knex: Knex): Promise<any> {
	return Promise.resolve(knex("long_scale_numbers").insert([
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
		{language_id: 2, exponent: 84, singular: "cuatordecillón", plural: "cuatordecillones"},
		{language_id: 2, exponent: 90, singular: "quindecillón", plural: "quindecillones"},
		{language_id: 2, exponent: 96, singular: "sexdecillón", plural: "sexdecillones"},
		{language_id: 2, exponent: 102, singular: "septendecillón", plural: "septendecillones"},
		{language_id: 2, exponent: 108, singular: "octodecillón", plural: "octodecillones"},
		{language_id: 2, exponent: 114, singular: "novendecillón", plural: "novendecillones"},
		{language_id: 2, exponent: 120, singular: "vigintillón", plural: "vigintillones"},
	]));
};

exports.down = function (knex: Knex): Promise<any> {
	return Promise.resolve(knex("long_scale_numbers").where({"language_id": 2}).whereIn("exponent", [6, 12, 18, 24, 30, 36, 42, 48, 54, 60, 66, 72, 78, 84, 90, 96, 102, 108, 114, 120]).del());
};
