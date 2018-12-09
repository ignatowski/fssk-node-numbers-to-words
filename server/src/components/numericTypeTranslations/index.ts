import * as Validator from "validator";
import handleDatabaseErrors from "../../util/handleDatabaseErrors";
import BaseModel from "../base/baseModel";
import {Collection, Model} from "bookshelf";
import NumericTypeTranslationModel from "./numericTypeTranslationModel";

export default class NumericTypeTranslationsController {

	public async getNumericTypeTranslations(): Promise<void | Collection<Model<NumericTypeTranslationModel>>> {
		const collection = await NumericTypeTranslationModel
			.fetchAll()
			.catch(handleDatabaseErrors);
		return collection;
	}

	public async getNumericTypeTranslationsByLanguage(languageId: string): Promise<Collection<Model<BaseModel>> | void> {

		if (!Validator.isInt(languageId)) {
			throw new Error("Invalid languageId");
		}

		const collection = await new NumericTypeTranslationModel()
			.orderBy("order")
			.where({language_id: languageId})
			.fetchAll()
			.catch(handleDatabaseErrors);

		return collection;

	}

	public async getNumericTypeTranslationWithTables(numericTypeId: string, languageId: string): Promise<BaseModel | void> {

		if (!Validator.isInt(numericTypeId)) {
			throw new Error("Invalid numericTypeId");
		}

		if (!Validator.isInt(languageId)) {
			throw new Error("Invalid languageId");
		}

		const numericTypeTranslation = await new NumericTypeTranslationModel()
			.where({numeric_type_id: numericTypeId, language_id: languageId})
			.fetch()
			.then((numericTypeTranslation) => numericTypeTranslation.load(numericTypeTranslation.attributes.tables))
			.catch(handleDatabaseErrors);

		return numericTypeTranslation;

	}

}
