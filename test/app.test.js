const request = require("supertest");
const app = require("../server/app");

test("should rate-limit requests", async () => {
  // Simulate multiple requests within the rate limit window
  for (let i = 0; i < 5; i++) {
    await request(app).get("/api/notes");
  }

  // Next request should be rate-limited
  const response = await request(app).get("/api/notes");
  expect(response.status).toBe(429);
});
