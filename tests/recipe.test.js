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
          console.log(response.text);
          done();
        });
    });
    it("it should create recipe", () => {
      chai
        .request(app)
        .post(api_url)
        .set("Content-Type", "application/x-www-form-urlencoded")
        .field()
        .end((err, response) => {
          if (err) {
            console.warn(err);
          }
          console.log(response.text);
          expect(response).to.have.status(201);
          expect(response).to.have.property("data");
          expect(response.data).to.have.property("title");
          expect(response.data).to.have.property("ingredients");
          expect(response.data).to.have.property("instructions");
          expect(response.data).to.have.property("time");
          expect(response.data).to.have.property("difficulty");
          recipeId = response.data ? response.data.id : "";
          done();
        });
    });
  });
});
