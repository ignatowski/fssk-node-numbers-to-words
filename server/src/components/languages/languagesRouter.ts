import * as express from "express";
//import {adminAuthMiddleware, authMiddleware} from "../auth";
import LanguagesController from "./index";
import * as Validator from "validator";

const router = express.Router();
const languagesController = new LanguagesController();

router.get("/", (req: express.Request, res: express.Response, next: express.NextFunction) => {
	return languagesController.getLanguages()
		.then((languages) => res.json(languages ? languages.toJSON() : []))
		.catch((err: Error) => next(err));
});

router.get("/:id", (req: express.Request, res: express.Response, next: express.NextFunction) => {

	if (!Validator.isInt(req.params.id)) {
		throw new Error("Invalid ID");
	}

	languagesController.getLanguage(req.params.id)
		.then((language) => res.json(language ? language.toJSON() : {}))
		.catch((err: Error) => next(err));

});

router.get("/:id/numericRules/:numericRuleId", (req: express.Request, res: express.Response, next: express.NextFunction) => {

	if (!Validator.isInt(req.params.id)) {
		throw new Error("Invalid ID");
	}

	if (!Validator.isInt(req.params.numericRuleId)) {
		throw new Error("Invalid numericRuleId");
	}

	languagesController.getLanguageWithNumericRulesTables(req.params.id, ["ones"])
		.then((language) => res.json(language ? language.toJSON() : {}))
		.catch((err: Error) => next(err));

});

router.get("/:id/numericRulesTwo/:numericRuleId", (req: express.Request, res: express.Response, next: express.NextFunction) => {

	if (!Validator.isInt(req.params.id)) {
		throw new Error("Invalid ID");
	}

	if (!Validator.isInt(req.params.numericRuleId)) {
		throw new Error("Invalid numericRuleId");
	}

	languagesController.getLanguageWithNumericRulesTablesTwo(req.params.id, ["ones"])
		.then((language) => res.json(language ? language.toJSON() : {}))
		.catch((err: Error) => next(err));

});

export default router;
