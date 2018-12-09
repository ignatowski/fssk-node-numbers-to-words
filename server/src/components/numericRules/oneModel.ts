import BaseModel from "../base/baseModel";
import LanguageModel from "../languages/languageModel";

export default class OneModel extends BaseModel {
	get tableName() { return "ones"; }
	get idAttribute() { return null; }
	language() { return this.belongsTo(LanguageModel, "language_id", "id"); }
}
