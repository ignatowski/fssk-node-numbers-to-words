import * as Knex from "knex";

exports.up = function (knex: Knex): Promise<any> {
	return Promise.resolve(knex("languages").insert([
		{id: 1, name: "English"},
		{id: 2, name: "español"}
	]));
};

exports.down = function (knex: Knex): Promise<any> {
	return Promise.resolve(knex("languages").whereIn('id', [1, 2]).del());
};
