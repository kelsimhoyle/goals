let chai = require("chai");
let chaiHTTP = require("chai-http");
const { expect } = require("chai");

chai.use(chaiHTTP);

describe("User Api", () => {
  describe("#'/api/user", () => {
    it("gets all users", (done) => {
      chai
        .request("http://localhost:3001")
        .get("/api/user")
        .end((err, res) => {
          expect(res.body).to.be.an("array");
          expect(res.body[0]).to.be.an("object");
          done();
        });
    });

    it("gets one user", (done) => {
      chai
        .request("http://localhost:3001")
        .get("/api/user/1")
        .end((err, res) => {
          expect(res.body).to.be.an("object");
          expect(res.body).that.includes.all.keys(["id", "name"]);
          done();
        });
    });
  });
});
