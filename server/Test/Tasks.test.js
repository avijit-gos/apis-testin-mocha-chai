/** @format */

const app = require("../../app");
const mocha = require("mocha");
const chai = require("chai");
const assert = chai.assert;
const should = chai.should();
const expect = chai.expect;
const chiHttp = require("chai-http");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

const newTask = {
  title: "TEST TITLE 1",
  description: "TEST DESCRIPTION 1",
};
var id;

/**
 * @/post
 */

describe("POST /post", () => {
  it("should return status 201", (done) => {
    chai
      .request(app)
      .post("/post")
      .send(newTask)
      .set("Content-Type", "application/json")
      .end((err, res) => {
        if (err) done(err);
        console.log(res.body.result._id);
        id = res.body.result._id;
        expect(res).to.have.status(201);

        done();
      });
  });

  it("should return Object", (done) => {
    chai
      .request(app)
      .post("/post")
      .send(newTask)
      .set("Content-Type", "application/json")
      .end((err, res) => {
        if (err) done(err);
        expect(res.body).to.have.an("Object");
        done();
      });
  });
});

/** */

/**
 * @/get_all_todos
 */
describe("GET /get_all_todos", () => {
  it("Should return status 200", (done) => {
    chai
      .request(app)
      .get("/get_all_todos")
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
        done();
      });
  });

  it("Should return an Array", (done) => {
    chai
      .request(app)
      .get("/get_all_todos")
      .end((err, res) => {
        if (err) done(err);
        expect(res.body).to.have.an("array");
        done();
      });
  });

  it("Response body should have a property called ID", (done) => {
    chai
      .request(app)
      .get("/get_all_todos")
      .end((err, res) => {
        if (err) done(err);
        expect(res.body[0]).to.have.property("_id");
        done();
      });
  });

  it("Response body should have a property called Title", (done) => {
    chai
      .request(app)
      .get("/get_all_todos")
      .end((err, res) => {
        if (err) done(err);
        expect(res.body[0]).to.have.property("title");
        done();
      });
  });

  it("Response body should have a property called Description", (done) => {
    chai
      .request(app)
      .get("/get_all_todos")
      .end((err, res) => {
        if (err) done(err);
        expect(res.body[0]).to.have.property("description");
        done();
      });
  });

  it("Response body should have length of 0", (done) => {
    chai
      .request(app)
      .get("/get_all_todos")
      .end((err, res) => {
        if (err) done(err);
        expect(res.body).not.to.have.length(0);
        done();
      });
  });
});

/**
 * @get_todo/:id
 */

describe("GET /get_todo/:id", () => {
  it("should return status code 200", (done) => {
    chai
      .request(app)
      .get(`/get_todo/${id}`)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
        done();
      });
  });

  it("should return an Object", (done) => {
    chai
      .request(app)
      .get(`/get_todo/${id}`)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body).to.have.an("Object");
        done();
      });
  });

  it("Response body should have _id property", (done) => {
    chai
      .request(app)
      .get(`/get_todo/${id}`)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body).to.have.property("_id");
        done();
      });
  });

  it("Response body should have _id property", (done) => {
    chai
      .request(app)
      .get(`/get_todo/${id}`)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body).to.have.property("title");
        done();
      });
  });

  it("Response body should have description property", (done) => {
    chai
      .request(app)
      .get(`/get_todo/${id}`)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body).to.have.property("description");
        done();
      });
  });

  it("Response body should have title property", (done) => {
    chai
      .request(app)
      .get(`/get_todo/${id}`)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body).to.have.property("title");
        done();
      });
  });
});

/**
 * @update/:id
 */
describe("PATCH /update/:id", () => {
  const updatedDes = { updatedDes: "This is new updated test description" };

  it("should return status code 200", (done) => {
    chai
      .request(app)
      .patch(`/update/${id}`)
      .send(updatedDes)
      .set("Content-Type", "application/json")
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
        done();
      });
  });

  it("Response body should have a property called MSG and having a particular value", (done) => {
    chai
      .request(app)
      .patch(`/update/${id}`)
      .send(updatedDes)
      .set("Content-Type", "application/json")
      .end((err, res) => {
        if (err) done(err);
        expect(res.body).to.have.property("msg", "Updated successfully");
        done();
      });
  });

  it("should not return status code 400", (done) => {
    chai
      .request(app)
      .patch(`/update/${id}`)
      .send(updatedDes)
      .set("Content-Type", "application/json")
      .end((err, res) => {
        if (err) done(err);
        expect(res).not.to.have.status(400);
        done();
      });
  });
});

/**
 * @/delete/:id
 */
describe("DELETE /delete/:id", () => {
  it("should return status code 200", (done) => {
    chai
      .request(app)
      .delete(`/delete/${id}`)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
        done();
      });
  });

  it("should return an Object", (done) => {
    chai
      .request(app)
      .delete(`/delete/${id}`)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body).to.have.an("Object");
        done();
      });
  });

  it("Response body should have a property msg and value Successfully deleted", (done) => {
    chai
      .request(app)
      .delete(`/delete/${id}`)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body).to.have.property("msg", "Successfully deleted");
        done();
      });
  });
});
