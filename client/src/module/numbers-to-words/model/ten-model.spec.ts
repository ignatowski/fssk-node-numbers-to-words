import TenModel, {ITenModelProps} from "./ten-model";

describe("TenModel", () => {
	it("can be created", () => {
		const testProps: ITenModelProps = {
			language_id: 1,
			digits: 13,
			singular: "thirteen",
			plural: "thirteen"
		};
		const testModel = new TenModel(testProps);
		expect(testModel).not.toBeNull();
	});
});
