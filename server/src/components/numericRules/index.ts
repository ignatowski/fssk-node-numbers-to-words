import * as Validator from "validator";
import handleDatabaseErrors from "../../util/handleDatabaseErrors";
import BaseModel from "../base/baseModel";
import {Collection, Model} from "bookshelf";
import NumericRuleModel from "./numericRuleModel";
import RuleTableModel from "./ruleTableModel";

export default class NumericRulesController {

	public async getNumericRules(): Promise<void | Collection<Model<NumericRuleModel>>> {
		const collection = await NumericRuleModel
			.fetchAll()
			.catch(handleDatabaseErrors);
		return collection;
	}

	public async getNumericRule(id: string): Promise<BaseModel | void> {
		if (!Validator.isInt(id)) {
			throw new Error("Invalid ID");
		}
		const numericRule = await new NumericRuleModel()
			.where({id})
			.fetch()
			.catch(handleDatabaseErrors);
		return numericRule;
	}

	public async getRuleTable(table: string, languageId: string): Promise<Collection<Model<BaseModel>> | void> {
		const ruleTable = await new RuleTableModel(table)
			.where({language_id: languageId})
			.fetchAll()
			.catch(handleDatabaseErrors);
		return ruleTable;
	}

	public async getRuleTables(tables: Array<string>, languageId: string) {
		return Promise.all(tables.map(async (table): Promise<any> => {
			const ruleTables = await this.getRuleTable(table, languageId);
			return {[table]: ruleTables ? ruleTables.toJSON() : []};
		}));
	}

}
