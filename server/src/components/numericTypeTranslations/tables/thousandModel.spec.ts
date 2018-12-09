import BaseModel from "../../base/baseModel";
import ThousandModel from "./thousandModel";

test("is a subclass of Base", () => {
	const model = new ThousandModel();
	expect(model instanceof BaseModel).toBeTruthy();
});

test("has the correct tableName", () => {
	const model = new ThousandModel();
	expect(model.tableName).toEqual("thousands");
});

test("defines the idAttribute", () => {
	const model = new ThousandModel();
	expect(model.idAttribute).toEqual(null);
});
