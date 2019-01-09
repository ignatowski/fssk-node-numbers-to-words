import BaseModel from "../../base/baseModel";
import NumericTypeTranslationModel from "../numericTypeTranslationModel";

export default class HundredModel extends BaseModel {
	get tableName() { return "hundreds"; }
	get idAttribute() { return null; }
	numericTypeTranslation() { return this.belongsTo(NumericTypeTranslationModel, "language_id", "language_id"); }
}
