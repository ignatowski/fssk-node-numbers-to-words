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

router.get("/:id", (req: express.Request, res: express.Response, next: express.NextFunction) => {

	if (!Validator.isInt(req.params.id)) {
		throw new Error("Invalid ID");
	}

	numericTypeTranslationsController.getNumericTypeTranslation(req.params.id)
		.then((numericTypeTranslation) => res.json(numericTypeTranslation ? numericTypeTranslation.toJSON() : {}))
		.catch((err: Error) => next(err));

});

router.get("/language/:languageId", (req: express.Request, res: express.Response, next: express.NextFunction) => {

	if (!Validator.isInt(req.params.languageId)) {
		throw new Error("Invalid languageId");
	}

	numericTypeTranslationsController.getNumericTypeTranslationsByLanguage(req.params.languageId)
		.then((numericTypeTranslations) => res.json(numericTypeTranslations ? numericTypeTranslations.toJSON() : []))
		.catch((err: Error) => next(err));

});

export default router;
