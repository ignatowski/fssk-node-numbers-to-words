import * as Knex from "knex";

exports.up = function (knex: Knex): Promise<any> {
	return Promise.resolve(knex("ones").insert([
		{language_id: 2, digits: 0, singular: "cero", plural: null},
		{language_id: 2, digits: 1, singular: "uno", plural: null},
		{language_id: 2, digits: 2, singular: "dos", plural: null},
		{language_id: 2, digits: 3, singular: "tres", plural: null},
		{language_id: 2, digits: 4, singular: "cuatro", plural: null},
		{language_id: 2, digits: 5, singular: "cinco", plural: null},
		{language_id: 2, digits: 6, singular: "seis", plural: null},
		{language_id: 2, digits: 7, singular: "siete", plural: null},
		{language_id: 2, digits: 8, singular: "ocho", plural: null},
		{language_id: 2, digits: 9, singular: "nueve", plural: null}
	]));
};

exports.down = function (knex: Knex): Promise<any> {
	return Promise.resolve(knex("ones").where("language_id", 2).whereBetween("digits", [0, 9]).del());
};
