import BaseModel from "../base/baseModel";

export default class RuleTableModel extends BaseModel {
	set tableName(table) { this.tableName = table; }
	get tableName() { return "ones"; }
	get idAttribute() { return "id"; }
	constructor(table) {
		super();
		this.tableName = table;
	}
}
