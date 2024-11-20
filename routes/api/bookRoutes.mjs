import express from "express";
import bookCTRL from "../../controllers/bookControllers.mjs";

const router = express.Router();

// Create
router.route("/").post(bookCTRL.createBook);

export default router;
