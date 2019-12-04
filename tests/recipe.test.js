const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server");

const api_url = "/api/recipes";

const { expect } = chai;
let recipeId;

chai.use(chaiHttp);

describe("Recipe", () => {
  describe("create recipe", () => {
    it("it should create recipe", done => {
      chai
        .request(app)
        .post(api_url)
        .send({
          title: "Rice Stew",
          ingredients: "pepper, seasoning, ",
          instructions: "fry pepper",
          time: 2,
          difficulty: 5
        })
        .end((err, response) => {
          if (err) {
            console.warn(err);
          }
          const res = JSON.parse(response.text);
          expect(response).to.have.status(201);
          expect(res).to.have.property("data");
          expect(res.data).to.have.property("title");
          expect(res.data).to.have.property("ingredients");
          expect(res.data).to.have.property("instructions");
          expect(res.data).to.have.property("time");
          expect(res.data).to.have.property("difficulty");
          recipeId = res.data ? res.data._id : "";
          done();
        });
    });
  });

  describe("get recipe", () => {
    it("it should get all recipe", done => {
      chai
        .request(app)
        .get(api_url)
        .end((err, response) => {
          if (err) {
            console.warn(err);
          }
          expect(response).to.have.status(200);
          done();
        });
    });

    it("it should get a recipe", done => {
      chai
        .request(app)
        .get(`${api_url}/${recipeId}`)
        .end((err, response) => {
          if (err) {
            console.warn(err);
          }
          const res = JSON.parse(response.text);
          expect(response).to.have.status(200);
          expect(res).to.have.property("title");
          expect(res).to.have.property("ingredients");
          expect(res).to.have.property("instructions");
          expect(res).to.have.property("time");
          expect(res).to.have.property("difficulty");
          done();
        });
    });
  });

  describe("modify recipe", () => {
    it("it should change recipe info", done => {
      chai
        .request(app)
        .post(`${api_url}/${recipeId}`)
        .send({
          title: "Rice Stew",
          ingredients: "pepper, seasoning, ",
          instructions: "fry pepper",
          time: 2,
          difficulty: 5
        })
        .end((err, response) => {
          if (err) {
            console.warn(err);
          }
          expect(response).to.have.status(200);
          done();
        });
    });

    it("it should get a recipe", done => {
      chai
        .request(app)
        .get(`${api_url}/${recipeId}`)
        .end((err, response) => {
          if (err) {
            console.warn(err);
          }
          const res = JSON.parse(response.text);
          expect(response).to.have.status(200);
          expect(res).to.have.property("title");
          expect(res).to.have.property("ingredients");
          expect(res).to.have.property("instructions");
          expect(res).to.have.property("time");
          expect(res).to.have.property("difficulty");
          done();
        });
    });
  });
});
