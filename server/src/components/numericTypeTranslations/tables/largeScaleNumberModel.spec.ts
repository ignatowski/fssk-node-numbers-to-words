import BaseModel from "../../base/baseModel";
import LargeScaleNumberModel from "./largeScaleNumberModel";

test("is a subclass of Base", () => {
	const model = new LargeScaleNumberModel();
	expect(model instanceof BaseModel).toBeTruthy();
});

test("has the correct tableName", () => {
	const model = new LargeScaleNumberModel();
	expect(model.tableName).toEqual("large_scale_numbers");
});

test("defines the idAttribute", () => {
	const model = new LargeScaleNumberModel();
	expect(model.idAttribute).toEqual(null);
});
