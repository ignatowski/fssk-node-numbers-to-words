import BaseModel from "../base/baseModel";

export default class NumericTypeTranslationModel extends BaseModel {
	get tableName() { return "numeric_type_translations"; }
	get idAttribute() { return "id"; }
}
