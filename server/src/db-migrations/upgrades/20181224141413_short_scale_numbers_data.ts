import * as Knex from "knex";

exports.up = function (knex: Knex): Promise<any> {
	return Promise.resolve(knex("short_scale_numbers").insert([
		{language_id: 1, exponent: 3, singular: "thousand", plural: "thousand"},
		{language_id: 1, exponent: 6, singular: "million", plural: "million"},
		{language_id: 1, exponent: 9, singular: "billion", plural: "billion"},
		{language_id: 1, exponent: 12, singular: "trillion", plural: "trillion"},
		{language_id: 1, exponent: 15, singular: "quadrillion", plural: "quadrillion"},
		{language_id: 1, exponent: 18, singular: "quintillion", plural: "quintillion"},
		{language_id: 1, exponent: 21, singular: "sextillion", plural: "sextillion"},
		{language_id: 1, exponent: 24, singular: "septillion", plural: "septillion"},
		{language_id: 1, exponent: 27, singular: "octillion", plural: "octillion"},
		{language_id: 1, exponent: 30, singular: "nonillion", plural: "nonillion"},
		{language_id: 1, exponent: 33, singular: "decillion", plural: "decillion"},
		{language_id: 1, exponent: 36, singular: "undecillion", plural: "undecillion"},
		{language_id: 1, exponent: 39, singular: "duodecillion", plural: "duodecillion"},
		{language_id: 1, exponent: 42, singular: "tredecillion", plural: "tredecillion"},
		{language_id: 1, exponent: 45, singular: "quattuordecillion", plural: "quattuordecillion"},
		{language_id: 1, exponent: 48, singular: "quindecillion", plural: "quindecillion"},
		{language_id: 1, exponent: 51, singular: "sexdecillion", plural: "sexdecillion"},
		{language_id: 1, exponent: 54, singular: "septemdecillion", plural: "septemdecillion"},
		{language_id: 1, exponent: 57, singular: "octodecillion", plural: "octodecillion"},
		{language_id: 1, exponent: 60, singular: "novemdecillion", plural: "novemdecillion"},
		{language_id: 1, exponent: 63, singular: "vigintillion", plural: "vigintillion"},
		{language_id: 1, exponent: 66, singular: "unvigintillion", plural: "unvigintillion"},
		{language_id: 1, exponent: 69, singular: "duovigintillion", plural: "duovigintillion"},
		{language_id: 1, exponent: 72, singular: "trevigintillion", plural: "trevigintillion"},
		{language_id: 1, exponent: 75, singular: "quattuorvigintillion", plural: "quattuorvigintillion"},
		{language_id: 1, exponent: 78, singular: "quinvigintillion", plural: "quinvigintillion"},
		{language_id: 1, exponent: 81, singular: "sexvigintillion", plural: "sexvigintillion"},
		{language_id: 1, exponent: 84, singular: "septvigintillion", plural: "septvigintillion"},
		{language_id: 1, exponent: 87, singular: "octovigintillion", plural: "octovigintillion"},
		{language_id: 1, exponent: 90, singular: "nonvigintillion", plural: "nonvigintillion"},
		{language_id: 1, exponent: 93, singular: "untrigintillion", plural: "untrigintillion"},
		{language_id: 1, exponent: 96, singular: "untrigintillion", plural: "untrigintillion"},
		{language_id: 1, exponent: 99, singular: "duotrigintillion", plural: "duotrigintillion"}
	]));
};

exports.down = function (knex: Knex): Promise<any> {
	return Promise.resolve(knex("short_scale_numbers").where({"language_id": 1}).whereIn("exponent", [6, 12, 18, 24, 30, 36, 42, 48, 54, 60, 66, 72, 78, 84, 90, 96, 102, 108, 114, 120]).del());
};
