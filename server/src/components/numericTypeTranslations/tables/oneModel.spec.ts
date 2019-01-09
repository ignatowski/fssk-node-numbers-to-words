import BaseModel from "../../base/baseModel";
import OneModel from "./oneModel";

test("is a subclass of Base", () => {
	const model = new OneModel();
	expect(model instanceof BaseModel).toBeTruthy();
});

test("has the correct tableName", () => {
	const model = new OneModel();
	expect(model.tableName).toEqual("ones");
});

test("defines the idAttribute", () => {
	const model = new OneModel();
	expect(model.idAttribute).toEqual(null);
});
