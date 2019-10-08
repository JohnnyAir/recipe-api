const Recipe = require("../models/recipe");

const createRecipe = (req, res) => {
  const recipe = new Recipe({
    title: req.body.title,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    time: req.body.time,
    difficulty: req.body.difficulty
  });
  recipe
    .save()
    .then(() => {
      res.status(201).json({
        message: "Recipe Created"
      });
    })
    .catch(error => {
      res.status(400).json({
        error
      });
    });
};

const getSingleRecipe = (req, res) => {
  Recipe.findById(req.params.id)
    .then(recipe => {
      res.status(200).json(recipe);
    })
    .catch(error => {
      res.status(500).json({ error });
    });
};

const getRecipes = (req, res) => {
  Recipe.find()
    .then(recipes => res.status(200).json(recipes))
    .catch(error => res.status(500).json({ error }));
};

const modifyRecipe = (req, res) => {
  const recipe = new Recipe({
    _id: req.params.id,
    title: req.body.title,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    time: req.body.time,
    difficulty: req.body.difficulty
  });
  Recipe.updateOne({ _id: req.params.id }, recipe)
    .then(recipe => {
      res.status(200).json(recipe);
    })
    .catch(error => {
      res.status(400).json({ error });
    });
};

const deleteRecipe = (req, res) => {
  Recipe.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        message: "Deleted"
      });
    })
    .catch(error => {
      res.status(400).json({ error });
    });
};

module.exports = {
  createRecipe,
  getSingleRecipe,
  modifyRecipe,
  getRecipes,
  deleteRecipe
};
