import * as Validator from "validator";
import handleDatabaseErrors from "../../util/handleDatabaseErrors";
import BaseModel from "../base/baseModel";
import {Collection, Model} from "bookshelf";
import LanguageModel from "./languageModel";

export default class LanguagesController {

	public async getLanguages(): Promise<void | Collection<Model<LanguageModel>>> {
		const collection = await LanguageModel
			.fetchAll()
			.catch(handleDatabaseErrors);
		return collection;
	}

	public async getLanguage(id: string): Promise<BaseModel | void> {
		if (!Validator.isInt(id)) {
			throw new Error("Invalid ID");
		}
		const language = await new LanguageModel()
			.where("id", id)
			.fetch()
			.catch(handleDatabaseErrors);
		return language;
	}

	public async getLanguageWithNumericRulesTables(id: string, tables: Array<string>): Promise<any> {
		const language = await new LanguageModel()
			.where("id", id)
			.fetch({withRelated: tables})
			.catch(handleDatabaseErrors);
		return language;
	}

	public async getLanguageWithNumericRulesTablesTwo(id: string, tables: Array<string>): Promise<any> {
		const language = await new LanguageModel()
			.where("id", id)
			.fetch()
			.then((language) => language.load(tables))
				/*
				.then(function(language) {
					return JSON.stringify(language);
				})
				*/
			.catch(handleDatabaseErrors);
		return language;
	}

}
