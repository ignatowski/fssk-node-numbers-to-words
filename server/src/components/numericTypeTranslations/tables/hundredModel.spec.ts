import BaseModel from "../../base/baseModel";
import HundredModel from "./hundredModel";

test("is a subclass of Base", () => {
	const model = new HundredModel();
	expect(model instanceof BaseModel).toBeTruthy();
});

test("has the correct tableName", () => {
	const model = new HundredModel();
	expect(model.tableName).toEqual("hundreds");
});

test("defines the idAttribute", () => {
	const model = new HundredModel();
	expect(model.idAttribute).toEqual(null);
});
