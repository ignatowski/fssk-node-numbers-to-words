import * as Knex from "knex";

exports.up = function (knex: Knex): Promise<any> {
	return Promise.resolve(knex("hundreds").insert([
		{language_id: 1, digits: 100, singular: "one hundred", plural: "one hundred"},
		{language_id: 1, digits: 200, singular: "two hundred", plural: "two hundred"},
		{language_id: 1, digits: 300, singular: "three hundred", plural: "three hundred"},
		{language_id: 1, digits: 400, singular: "four hundred", plural: "four hundred"},
		{language_id: 1, digits: 500, singular: "five hundred", plural: "five hundred"},
		{language_id: 1, digits: 600, singular: "six hundred", plural: "six hundred"},
		{language_id: 1, digits: 700, singular: "seven hundred", plural: "seven hundred"},
		{language_id: 1, digits: 800, singular: "eight hundred", plural: "eight hundred"},
		{language_id: 1, digits: 900, singular: "nine hundred", plural: "nine hundred"},
		{language_id: 2, digits: 100, singular: "cien", plural: "ciento"},
		{language_id: 2, digits: 200, singular: "doscientos", plural: "doscientos"},
		{language_id: 2, digits: 300, singular: "trescientos", plural: "trescientos"},
		{language_id: 2, digits: 400, singular: "cuatrocientos", plural: "cuatrocientos"},
		{language_id: 2, digits: 500, singular: "quinientos", plural: "quinientos"},
		{language_id: 2, digits: 600, singular: "seiscientos", plural: "seiscientos"},
		{language_id: 2, digits: 700, singular: "setecientos", plural: "setecientos"},
		{language_id: 2, digits: 800, singular: "ochocientos", plural: "ochocientos"},
		{language_id: 2, digits: 900, singular: "novecientos", plural: "novecientos"}
	]));
};

exports.down = function (knex: Knex): Promise<any> {
	return Promise.resolve(knex("hundreds").whereIn("language_id", [1, 2]).whereIn("digits", [100, 200, 300, 400, 500, 600, 700, 800, 900]).del());
};
