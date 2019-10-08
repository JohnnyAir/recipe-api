const { Schema, model } = require("mongoose");

const recipeSchema = Schema({
  title: { type: String, required: true },
  ingredients: { type: String, required: true },
  instructions: { type: String, required: true },
  difficulty: { type: String, required: true },
  time: { type: Number, required: true }
});

module.exports = model("Recipe", recipeSchema);
