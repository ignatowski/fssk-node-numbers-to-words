import * as Knex from "knex";

exports.up = function (knex: Knex): Promise<any> {
	return Promise.resolve(knex("tens").insert([
		{language_id: 2, digits: 10, singular: "diez", plural: null},
		{language_id: 2, digits: 11, singular: "once", plural: null},
		{language_id: 2, digits: 12, singular: "doce", plural: null},
		{language_id: 2, digits: 13, singular: "trece", plural: null},
		{language_id: 2, digits: 14, singular: "catorce", plural: null},
		{language_id: 2, digits: 15, singular: "quince", plural: null},
		{language_id: 2, digits: 16, singular: "dieciséis", plural: null},
		{language_id: 2, digits: 17, singular: "diecisiete", plural: null},
		{language_id: 2, digits: 18, singular: "dieciocho", plural: null},
		{language_id: 2, digits: 19, singular: "diecinueve", plural: null},
		{language_id: 2, digits: 20, singular: "veinte", plural: null},
		{language_id: 2, digits: 21, singular: "veintiuno", plural: null},
		{language_id: 2, digits: 22, singular: "veintidós", plural: null},
		{language_id: 2, digits: 23, singular: "veintitrés", plural: null},
		{language_id: 2, digits: 24, singular: "veinticuatro", plural: null},
		{language_id: 2, digits: 25, singular: "veinticinco", plural: null},
		{language_id: 2, digits: 26, singular: "veintiséis", plural: null},
		{language_id: 2, digits: 27, singular: "veintisiete", plural: null},
		{language_id: 2, digits: 28, singular: "veintiocho", plural: null},
		{language_id: 2, digits: 29, singular: "veintinueve", plural: null},
		{language_id: 2, digits: 30, singular: "treinta", plural: null},
		{language_id: 2, digits: 40, singular: "cuarenta", plural: null},
		{language_id: 2, digits: 50, singular: "cincuenta", plural: null},
		{language_id: 2, digits: 60, singular: "sesenta", plural: null},
		{language_id: 2, digits: 70, singular: "setenta", plural: null},
		{language_id: 2, digits: 80, singular: "ochenta", plural: null},
		{language_id: 2, digits: 90, singular: "noventa", plural: null}
	]));
};

exports.down = function (knex: Knex): Promise<any> {
	return Promise.resolve(
		knex("tens")
		.where("language_id", 2)
		.whereIn("digits", [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 40, 50, 60, 70, 80, 90])
		.del()
	);
};
