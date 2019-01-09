import BaseModel from "../base/baseModel";

export default class LanguageModel extends BaseModel {
	get tableName() { return "languages"; }
	get idAttribute() { return "id"; }
}
