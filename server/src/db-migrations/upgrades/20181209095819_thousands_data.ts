import * as Knex from "knex";

exports.up = function (knex: Knex): Promise<any> {
	return Promise.resolve(knex("thousands").insert([
		{language_id: 2, digits: 1000, singular: "mil", plural: "mil"}
	]));
};

exports.down = function (knex: Knex): Promise<any> {
	return Promise.resolve(knex("thousands").where({"language_id": 2, "digits": 1000}).del());
};
