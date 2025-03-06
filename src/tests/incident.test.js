const request = require("supertest");
const app = require("../../server");

describe("Incident API", () => {
  test("should create an incident", async () => {
    const res = await request(app).post("/api/incidents").send({
      title: "Roadblock",
      description: "There is a roadblock near the main highway.",
      location: "Highway 24",
      status: "pending",
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
  });

  test("should fetch all incidents", async () => {
    const res = await request(app).get("/api/incidents");
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
