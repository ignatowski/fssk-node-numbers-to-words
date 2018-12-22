import * as Knex from "knex";

exports.up = function (knex: Knex): Promise<any> {
	return Promise.resolve(knex("numeric_type_translations").insert([
		{
			numeric_type_id: 2,
			language_id: 2,
			order: 1,
			name: "números (escala larga)",
			description: 'Los números de la escala larga se agrupan en cifras de seis. Así que empiezan con unidad, decenas, centenas, unidad de millar, decenas de millar y centenas de millar. Desde ahí se repiten con cada grupo de seis creciendo a millón, billón, trillón, etc. <a href="https://es.wikipedia.org/wiki/Escalas_numéricas_larga_y_corta" target="_blank">Escalas numéricas larga y corta</a>',
			tables: JSON.stringify(["ones", "tens", "hundreds", "thousands", "large_scale_numbers"])
		}
	]));
};

exports.down = function (knex: Knex): Promise<any> {
	return Promise.resolve(knex("numeric_type_translations").where({"numeric_type_id": 2, "language_id": 2}).del());
};
