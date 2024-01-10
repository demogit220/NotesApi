const request = require("supertest");
const app = require("../server/app");

describe("testing the app", () => {
  test("should rate-limit requests", async () => {
    // Simulate multiple requests within the rate limit window
    for (let i = 0; i < 5; i++) {
      await request(app).get("/api/notes");
    }

    // Next request should be rate-limited
    const response = await request(app).get("/api/notes");
    expect(response.status).toBe(429);
  });

  test("should handle 404 errors", async () => {
    const response = await request(app).get("/invalid-route");

    expect(response.status).toBe(404);
    expect(response.text).toBe("404 error");
  });

  test("should not login without signup", async () => {
    const response = await request(app).get("/api/auth/signup");
  });
});
