import BaseModel from "../../base/baseModel";
import NumericTypeTranslationModel from "../numericTypeTranslationModel";

export default class OneModel extends BaseModel {
	get tableName() { return "ones"; }
	get idAttribute() { return null; }
	numericTypeTranslation() { return this.belongsTo(NumericTypeTranslationModel, "language_id", "language_id"); }
}
