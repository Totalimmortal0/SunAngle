import { describe, test, expect } from "vitest";
import request from "supertest";
import app from "../app";

describe("GET /api/angle", () => {
    test("responds with status 200", async () => {
        const response = await request(app)
            .get("/api/angle?lat=10")
        expect(response.status).toBe(200)
    })
})