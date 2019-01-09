import BaseModel from "../../base/baseModel";
import ShortScaleNumberModel from "./shortScaleNumberModel";

test("is a subclass of Base", () => {
	const model = new ShortScaleNumberModel();
	expect(model instanceof BaseModel).toBeTruthy();
});

test("has the correct tableName", () => {
	const model = new ShortScaleNumberModel();
	expect(model.tableName).toEqual("short_scale_numbers");
});

test("defines the idAttribute", () => {
	const model = new ShortScaleNumberModel();
	expect(model.idAttribute).toEqual(null);
});
