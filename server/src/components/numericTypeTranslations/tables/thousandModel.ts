import BaseModel from "../../base/baseModel";
import NumericTypeTranslationModel from "../numericTypeTranslationModel";

export default class ThousandModel extends BaseModel {
	get tableName() { return "thousands"; }
	get idAttribute() { return null; }
	numericTypeTranslation() { return this.belongsTo(NumericTypeTranslationModel, "language_id", "language_id"); }
}
