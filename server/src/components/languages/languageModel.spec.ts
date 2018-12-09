import BaseModel from "../base/baseModel";
import LanguageModel from "./languageModel";

test("is a subclass of Base", () => {
	const model = new LanguageModel();
	expect(model instanceof BaseModel).toBeTruthy();
});

test("has the correct tableName", () => {
	const model = new LanguageModel();
	expect(model.tableName).toEqual("languages");
});

test("defines the idAttribute", () => {
	const model = new LanguageModel();
	expect(model.idAttribute).toEqual("id");
});
