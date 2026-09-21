import { describe, test, expect } from "vitest";
import request from "supertest";
import app from "../app";

describe("GET /api/angle", () => {
    test("responds with status 200", async () => {
        const response = await request(app)
            .get("/api/angle?lat=10")
        expect(response.status).toBe(200)
    })

    test("responds with correct error code when latitude is missing", async () => {
        const response = await request(app)
            .get("/api/angle")
        expect(response.status).toBe(400)
    })

    test("responds with correct error code when latitude an empty string", async () => {
        const response = await request(app)
            .get("/api/angle?lat=")
        expect(response.status).toBe(400)
    })

    test("responds with correct calculation when latitude is negative", async () => {
        const response = await request(app)
            .get("/api/angle?lat=-12")
        expect(response.body.angle).toBe("12.00")
    })
})