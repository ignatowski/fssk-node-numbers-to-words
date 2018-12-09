import BaseModel from "../base/baseModel";

export default class NumericRuleModel extends BaseModel {
	get tableName() { return "numeric_rules"; }
	get idAttribute() { return "id"; }
}
