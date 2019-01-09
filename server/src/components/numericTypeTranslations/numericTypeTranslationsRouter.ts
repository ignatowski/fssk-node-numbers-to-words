import * as express from "express";
import NumericTypeTranslationsController from "./index";
import * as Validator from "validator";

const router = express.Router();
const numericTypeTranslationsController = new NumericTypeTranslationsController();

router.get("/", (req: express.Request, res: express.Response, next: express.NextFunction) => {
	return numericTypeTranslationsController.getNumericTypeTranslations()
		.then((numericTypeTranslations) => res.json(numericTypeTranslations ? numericTypeTranslations.toJSON() : []))
		.catch((err: Error) => next(err));
});

router.get("/languages/:languageId", (req: express.Request, res: express.Response, next: express.NextFunction) => {

	if (!Validator.isInt(req.params.languageId)) {
		throw new Error("Invalid languageId");
	}

	numericTypeTranslationsController.getNumericTypeTranslationsByLanguage(req.params.languageId)
		.then((numericTypeTranslations) => res.json(numericTypeTranslations ? numericTypeTranslations.toJSON() : []))
		.catch((err: Error) => next(err));

});

router.get("/numericTypes/:numericTypeId/languages/:languageId/withTables", (req: express.Request, res: express.Response, next: express.NextFunction) => {

	if (!Validator.isInt(req.params.numericTypeId)) {
		throw new Error("Invalid numericTypeId");
	}

	if (!Validator.isInt(req.params.languageId)) {
		throw new Error("Invalid languageId");
	}

	numericTypeTranslationsController.getNumericTypeTranslationWithTables(req.params.numericTypeId, req.params.languageId)
		.then((language) => res.json(language ? language.toJSON() : {}))
		.catch((err: Error) => next(err));

});

export default router;
