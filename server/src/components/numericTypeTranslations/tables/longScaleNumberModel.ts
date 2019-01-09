import BaseModel from "../../base/baseModel";
import NumericTypeTranslationModel from "../numericTypeTranslationModel";

export default class LongScaleNumberModel extends BaseModel {
	get tableName() { return "long_scale_numbers"; }
	get idAttribute() { return null; }
	numericTypeTranslation() { return this.belongsTo(NumericTypeTranslationModel, "language_id", "language_id"); }
}
