import BaseModel from "../../base/baseModel";
import LongScaleNumberModel from "./longScaleNumberModel";

test("is a subclass of Base", () => {
	const model = new LongScaleNumberModel();
	expect(model instanceof BaseModel).toBeTruthy();
});

test("has the correct tableName", () => {
	const model = new LongScaleNumberModel();
	expect(model.tableName).toEqual("long_scale_numbers");
});

test("defines the idAttribute", () => {
	const model = new LongScaleNumberModel();
	expect(model.idAttribute).toEqual(null);
});
