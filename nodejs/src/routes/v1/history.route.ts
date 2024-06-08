import express from "express";
import historysController from "../../controllers/history.controller";
// import validateSchema from "../../middlewares/validateSchema.middleware";
// import historysValidation from "../../validations/historys.validation";
const router = express.Router();

//Dinh nghia cac routes cho resource historys

//Get All
//http://localhost:8080/api/v1/historys
router.get("", historysController.getAll);

//Get By ID
//http://localhost:8080/api/v1/historys/:id
router.get("/:id", historysController.gethistoryById);

//Create history
///http://localhost:8080/api/v1/historys
router.post("", historysController.createhistory);

//Update history By ID
///http://localhost:8080/api/v1/historys/:id
router.put("/:id", historysController.updatehistory);

//Delete history By ID
///http://localhost:8080/api/v1/historys/:id
router.delete("/:id", historysController.deletehistory);

export default router;
