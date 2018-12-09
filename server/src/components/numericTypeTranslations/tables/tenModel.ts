import BaseModel from "../../base/baseModel";
import NumericTypeTranslationModel from "../numericTypeTranslationModel";

export default class TenModel extends BaseModel {
	get tableName() { return "tens"; }
	get idAttribute() { return null; }
	numericTypeTranslation() { return this.belongsTo(NumericTypeTranslationModel, "language_id", "language_id"); }
}
