import * as Knex from "knex";

exports.up = function (knex: Knex): Promise<any> {
	return Promise.resolve(knex("ones").insert([
		{language_id: 1, digits: 0, singular: "zero", plural: "zero"},
		{language_id: 1, digits: 1, singular: "one", plural: "one"},
		{language_id: 1, digits: 2, singular: "two", plural: "two"},
		{language_id: 1, digits: 3, singular: "three", plural: "three"},
		{language_id: 1, digits: 4, singular: "four", plural: "four"},
		{language_id: 1, digits: 5, singular: "five", plural: "five"},
		{language_id: 1, digits: 6, singular: "six", plural: "six"},
		{language_id: 1, digits: 7, singular: "seven", plural: "seven"},
		{language_id: 1, digits: 8, singular: "eight", plural: "eight"},
		{language_id: 1, digits: 9, singular: "nine", plural: "nine"},
		{language_id: 2, digits: 0, singular: "cero", plural: "cero"},
		{language_id: 2, digits: 1, singular: "uno", plural: "uno"},
		{language_id: 2, digits: 2, singular: "dos", plural: "dos"},
		{language_id: 2, digits: 3, singular: "tres", plural: "tres"},
		{language_id: 2, digits: 4, singular: "cuatro", plural: "cuatro"},
		{language_id: 2, digits: 5, singular: "cinco", plural: "cinco"},
		{language_id: 2, digits: 6, singular: "seis", plural: "seis"},
		{language_id: 2, digits: 7, singular: "siete", plural: "siete"},
		{language_id: 2, digits: 8, singular: "ocho", plural: "ocho"},
		{language_id: 2, digits: 9, singular: "nueve", plural: "nueve"}
	]));
};

exports.down = function (knex: Knex): Promise<any> {
	return Promise.resolve(knex("ones").whereIn("language_id", [1, 2]).whereBetween("digits", [0, 9]).del());
};
