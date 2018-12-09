import * as express from "express";
import NumericRulesController from "./index";
import * as Validator from "validator";

const router = express.Router();
const numericRulesController = new NumericRulesController();

router.get("/", (req: express.Request, res: express.Response, next: express.NextFunction) => {
	return numericRulesController.getNumericRules()
		.then((numericRules) => res.json(numericRules ? numericRules.toJSON() : []))
		.catch((err: Error) => next(err));
});

router.get("/:id", (req: express.Request, res: express.Response, next: express.NextFunction) => {

	if (!Validator.isInt(req.params.id)) {
		throw new Error("Invalid ID");
	}

	numericRulesController.getNumericRule(req.params.id)
		.then((numericRule) => res.json(numericRule ? numericRule.toJSON() : {}))
		.catch((err: Error) => next(err));

});

router.get("/:id/language/:languageId", (req: express.Request, res: express.Response, next: express.NextFunction) => {

	if (!Validator.isInt(req.params.id)) {
		throw new Error("Invalid ID");
	}

	if (!Validator.isInt(req.params.languageId)) {
		throw new Error("Invalid ID");
	}

	numericRulesController.getNumericRule(req.params.id)
		.then((numericRule) => {
			return numericRulesController.getRuleTables(numericRule['tables'], req.params);
		})
		.then((results) => res.json(results))
		.catch((err: Error) => next(err));

});

export default router;
