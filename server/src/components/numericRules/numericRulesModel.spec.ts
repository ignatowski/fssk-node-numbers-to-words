import BaseModel from "../base/baseModel";
import NumericRuleModel from "./numericRuleModel";

test("is a subclass of Base", () => {
	const model = new NumericRuleModel();
	expect(model instanceof BaseModel).toBeTruthy();
});

test("has the correct tableName", () => {
	const model = new NumericRuleModel();
	expect(model.tableName).toEqual("numeric_rules");
});

test("defines the idAttribute", () => {
	const model = new NumericRuleModel();
	expect(model.idAttribute).toEqual("id");
});
