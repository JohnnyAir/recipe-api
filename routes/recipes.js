const express = require("express");
const router = express.Router();
const {
  createRecipe,
  getSingleRecipe,
  modifyRecipe,
  getRecipes,
  deleteRecipe
} = require("../controllers/recipes");

router.get("/", getRecipes);

router.post("/", createRecipe);

router.get("/:id", getSingleRecipe);

router.put("/:id", modifyRecipe);

router.delete("/:id", deleteRecipe);

module.exports = router;
