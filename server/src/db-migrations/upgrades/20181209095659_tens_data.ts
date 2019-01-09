import * as Knex from "knex";

exports.up = function (knex: Knex): Promise<any> {
	return Promise.resolve(knex("tens").insert([
		{language_id: 1, digits: 10, singular: "ten", plural: "ten"},
		{language_id: 1, digits: 11, singular: "eleven", plural: "eleven"},
		{language_id: 1, digits: 12, singular: "twelve", plural: "twelve"},
		{language_id: 1, digits: 13, singular: "thirteen", plural: "thirteen"},
		{language_id: 1, digits: 14, singular: "fourteen", plural: "fourteen"},
		{language_id: 1, digits: 15, singular: "fifteen", plural: "fifteen"},
		{language_id: 1, digits: 16, singular: "sixteen", plural: "sixteen"},
		{language_id: 1, digits: 17, singular: "seventeen", plural: "seventeen"},
		{language_id: 1, digits: 18, singular: "eighteen", plural: "eighteen"},
		{language_id: 1, digits: 19, singular: "nineteen", plural: "nineteen"},
		{language_id: 1, digits: 20, singular: "twenty", plural: "twenty"},
		{language_id: 1, digits: 30, singular: "thirty", plural: "thirty"},
		{language_id: 1, digits: 40, singular: "forty", plural: "forty"},
		{language_id: 1, digits: 50, singular: "fifty", plural: "fifty"},
		{language_id: 1, digits: 60, singular: "sixty", plural: "sixty"},
		{language_id: 1, digits: 70, singular: "seventy", plural: "seventy"},
		{language_id: 1, digits: 80, singular: "eighty", plural: "eighty"},
		{language_id: 1, digits: 90, singular: "ninety", plural: "ninety"},
		{language_id: 2, digits: 10, singular: "diez", plural: "diez"},
		{language_id: 2, digits: 11, singular: "once", plural: "once"},
		{language_id: 2, digits: 12, singular: "doce", plural: "doce"},
		{language_id: 2, digits: 13, singular: "trece", plural: "trece"},
		{language_id: 2, digits: 14, singular: "catorce", plural: "catorce"},
		{language_id: 2, digits: 15, singular: "quince", plural: "quince"},
		{language_id: 2, digits: 16, singular: "dieciséis", plural: "dieciséis"},
		{language_id: 2, digits: 17, singular: "diecisiete", plural: "diecisiete"},
		{language_id: 2, digits: 18, singular: "dieciocho", plural: "dieciocho"},
		{language_id: 2, digits: 19, singular: "diecinueve", plural: "diecinueve"},
		{language_id: 2, digits: 20, singular: "veinte", plural: "veinte"},
		{language_id: 2, digits: 21, singular: "veintiuno", plural: "veintiuno"},
		{language_id: 2, digits: 22, singular: "veintidós", plural: "veintidós"},
		{language_id: 2, digits: 23, singular: "veintitrés", plural: "veintitrés"},
		{language_id: 2, digits: 24, singular: "veinticuatro", plural: "veinticuatro"},
		{language_id: 2, digits: 25, singular: "veinticinco", plural: "veinticinco"},
		{language_id: 2, digits: 26, singular: "veintiséis", plural: "veintiséis"},
		{language_id: 2, digits: 27, singular: "veintisiete", plural: "veintisiete"},
		{language_id: 2, digits: 28, singular: "veintiocho", plural: "veintiocho"},
		{language_id: 2, digits: 29, singular: "veintinueve", plural: "veintinueve"},
		{language_id: 2, digits: 30, singular: "treinta", plural: "treinta"},
		{language_id: 2, digits: 40, singular: "cuarenta", plural: "cuarenta"},
		{language_id: 2, digits: 50, singular: "cincuenta", plural: "cincuenta"},
		{language_id: 2, digits: 60, singular: "sesenta", plural: "sesenta"},
		{language_id: 2, digits: 70, singular: "setenta", plural: "setenta"},
		{language_id: 2, digits: 80, singular: "ochenta", plural: "ochenta"},
		{language_id: 2, digits: 90, singular: "noventa", plural: "noventa"}
	]));
};

exports.down = function (knex: Knex): Promise<any> {
	return Promise.resolve(
		knex("tens")
		.whereIn("language_id", [1, 2])
		.whereIn("digits", [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 40, 50, 60, 70, 80, 90])
		.del()
	);
};
