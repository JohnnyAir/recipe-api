const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server");

// const base_url = "localhost:3000";
const api_url = "/api/recipes";

const { expect } = chai;
// let recipeId;

chai.use(chaiHttp);

describe("Recipe", () => {
  describe("create recipe", () => {
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
    it("it should create recipe", done => {
      chai
        .request(app)
        .post(api_url)
        .set("Content-Type", "application/x-www-form-urlencoded")
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
          recipeId = res.data ? res.data.id : "";
          done();
        });
    });
  });
});
