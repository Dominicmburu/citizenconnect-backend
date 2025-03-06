const request = require("supertest");
const app = require("../../server");

describe("Polling API", () => {
  test("should create a poll", async () => {
    const res = await request(app)
      .post("/api/polls")
      .send({
        question: "What is your favorite color?",
        options: ["Red", "Blue", "Green"],
      });
    expect(res.statusCode).toBe(201);
  });
});
