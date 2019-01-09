import BaseModel from "../../base/baseModel";
import TenModel from "./tenModel";

test("is a subclass of Base", () => {
	const model = new TenModel();
	expect(model instanceof BaseModel).toBeTruthy();
});

test("has the correct tableName", () => {
	const model = new TenModel();
	expect(model.tableName).toEqual("tens");
});

test("defines the idAttribute", () => {
	const model = new TenModel();
	expect(model.idAttribute).toEqual(null);
});
