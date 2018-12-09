import BaseModel from "../base/baseModel";
import OneModel from "../numericRules/oneModel";

export default class LanguageModel extends BaseModel {
	get tableName() { return "languages"; }
	get idAttribute() { return "id"; }
	ones() { return this.hasMany(OneModel, "language_id", "id"); }
	//ones => {return this.hasMany(OneModel, "language_id", "id");}
}
