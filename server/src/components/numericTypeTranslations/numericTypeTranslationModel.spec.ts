import BaseModel from "../base/baseModel";
import NumericTypeTranslationModel from "./numericTypeTranslationModel";

test("is a subclass of Base", () => {
	const model = new NumericTypeTranslationModel();
	expect(model instanceof BaseModel).toBeTruthy();
});

test("has the correct tableName", () => {
	const model = new NumericTypeTranslationModel();
	expect(model.tableName).toEqual("numeric_type_translations");
});

test("defines the idAttribute", () => {
	const model = new NumericTypeTranslationModel();
	expect(model.idAttribute).toEqual(null);
});
