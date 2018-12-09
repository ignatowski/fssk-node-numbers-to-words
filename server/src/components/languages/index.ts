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

}
